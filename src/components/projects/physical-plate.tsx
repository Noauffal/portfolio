"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import * as THREE from "three";

/* Shared physical language for every Direction 03 plate. */
const DEPTH = 0.24;
const FILL = 0.88;
const FOV = 30;
const TAN_HALF_FOV = Math.tan((FOV * Math.PI) / 360);
const FRONT_Z = DEPTH / 2;
const MAX_ROTATE_Y = 12;
const MAX_ROTATE_X = 8;
const MAX_SIDE_SIN = Math.sin((MAX_ROTATE_Y * Math.PI) / 180);
const MIN_SIDE_FACTOR = 0.9;
const H_RADIUS = 0.65;
const V_RADIUS = 0.55;
const LERP = 0.08;
const DEAD_ZONE = 0.04;
const SETTLE = 0.002;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function deadZone(value: number) {
  const magnitude = Math.abs(value);
  if (magnitude < DEAD_ZONE) return 0;
  return (Math.sign(value) * (magnitude - DEAD_ZONE)) / (1 - DEAD_ZONE);
}

/* Single source of truth for camera distance and the fraction of the scene the
   visible front face occupies. Scale-invariant, so it can be computed before
   layout and reused for the overlay and pointer normalization. */
function computeCamera(width: number, height: number) {
  const aspect = width / height;
  const distanceForHeight = FRONT_Z + height / (2 * FILL * TAN_HALF_FOV);
  const distanceForWidth =
    FRONT_Z + width / (2 * FILL * TAN_HALF_FOV * aspect);
  const fillDistance = Math.max(distanceForHeight, distanceForWidth);
  /* Never nearer than the distance at which a side wall becomes visible at the
     max Y rotation (wide/flat plates would otherwise cull their own sides). */
  const sideVisibleDistance =
    FRONT_Z + width / 2 / (MAX_SIDE_SIN * MIN_SIDE_FACTOR);
  const cameraDistance = Math.max(fillDistance, sideVisibleDistance);
  const plateFraction =
    FILL * ((fillDistance - FRONT_Z) / (cameraDistance - FRONT_Z));
  return { cameraDistance, plateFraction };
}

export function PhysicalPlate({
  width,
  height,
  surfaceWidth,
  className,
  children,
}: {
  width: number;
  height: number;
  /* Desired visible FRONT-FACE width (any CSS length expression). The scene /
     canvas is derived larger to leave projection room for the side walls. */
  surfaceWidth: string;
  className?: string;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { cameraDistance, plateFraction } = computeCamera(width, height);
  const room = 1 / plateFraction;

  /* All projection variables are deterministic (independent of measured size),
     so SSR and the hydrated client render byte-identical values and there is no
     post-hydration jump. */
  const contentFraction = height / (2 * TAN_HALF_FOV * cameraDistance);
  const overlayInset = (1 - contentFraction) / 2;
  const surfaceInset = (1 - plateFraction) / 2;
  const sceneHeight = `calc(${surfaceWidth} * ${(room / (width / height)).toFixed(5)})`;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !coarse,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      container.dataset.webglFailed = "true";
      return;
    }

    const dprCap = coarse ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    /* Sharp-edged solid slab. BoxGeometry material-group order is verified:
       [0]=+x right, [1]=-x left, [2]=+y top, [3]=-y bottom, [4]=+z front,
       [5]=-z back. Only the +z face points at the camera at rest; the sides are
       back-facing and culled by FrontSide until the plate rotates. */
    const geometry = new THREE.BoxGeometry(width, height, DEPTH);

    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 30);
    camera.position.set(0, 0, cameraDistance);
    camera.lookAt(0, 0, 0);

    const frontMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xededeb),
      roughness: 0.85,
      metalness: 0,
      side: THREE.FrontSide,
    });
    const sideMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xa8acad),
      roughness: 0.8,
      metalness: 0,
      side: THREE.FrontSide,
    });
    const materials = [
      sideMaterial,
      sideMaterial,
      sideMaterial,
      sideMaterial,
      frontMaterial,
      frontMaterial,
    ];
    const mesh = new THREE.Mesh(geometry, materials);
    scene.add(mesh);

    const hemisphere = new THREE.HemisphereLight(0xffffff, 0x666666, 0.85);
    const key = new THREE.DirectionalLight(0xffffff, 1);
    key.position.set(2, 3, 4);
    const fill = new THREE.DirectionalLight(0xffffff, 0.4);
    fill.position.set(-3, -1, 2);
    scene.add(hemisphere, key, fill);

    let raf = 0;
    let running = false;
    let visible = true;
    let ready = false;

    const render = () => {
      renderer.render(scene, camera);
      if (!ready) {
        ready = true;
        container.dataset.webglReady = "true";
      }
    };

    let targetRx = 0;
    let targetRy = 0;
    let currentRx = 0;
    let currentRy = 0;

    const applyRotation = () => {
      mesh.rotation.y = (currentRy * Math.PI) / 180;
      mesh.rotation.x = (-currentRx * Math.PI) / 180;
      container.style.setProperty("--plate-ry", `${currentRy.toFixed(3)}deg`);
      container.style.setProperty("--plate-rx", `${currentRx.toFixed(3)}deg`);
    };

    const resize = () => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      if (containerWidth < 1 || containerHeight < 1) return;
      /* WebGL-only sizing; the DOM projection variables are deterministic and
         set during render, so Three never mutates the CSS layout. */
      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerWidth, containerHeight, false);
      render();
    };

    const tick = () => {
      currentRx += (targetRx - currentRx) * LERP;
      currentRy += (targetRy - currentRy) * LERP;
      applyRotation();
      render();
      if (
        Math.abs(targetRx - currentRx) < SETTLE &&
        Math.abs(targetRy - currentRy) < SETTLE
      ) {
        currentRx = targetRx;
        currentRy = targetRy;
        applyRotation();
        render();
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      /* Normalize against the visible front face (plateFraction of the scene),
         never the viewport. */
      const rect = container.getBoundingClientRect();
      const plateW = rect.width * plateFraction;
      const plateH = rect.height * plateFraction;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const nx = clamp((event.clientX - centerX) / (plateW * H_RADIUS), -1, 1);
      const ny = clamp((event.clientY - centerY) / (plateH * V_RADIUS), -1, 1);
      targetRy = -deadZone(nx) * MAX_ROTATE_Y;
      targetRx = deadZone(ny) * MAX_ROTATE_X;
      start();
    };

    const reset = () => {
      targetRx = 0;
      targetRy = 0;
      start();
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    const interactive = !reduceMotion && !coarse;
    if (interactive) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("blur", reset);
      document.documentElement.addEventListener("pointerleave", reset);
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    applyRotation();
    resize();
    render();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      geometry.dispose();
      frontMaterial.dispose();
      sideMaterial.dispose();
      renderer.dispose();
    };
  }, [width, height, cameraDistance, plateFraction]);

  const style = {
    width: `calc(${surfaceWidth} * ${room.toFixed(5)})`,
    aspectRatio: `${width} / ${height}`,
    "--plate-perspective": `calc(${sceneHeight} * ${(1 / (2 * TAN_HALF_FOV)).toFixed(5)})`,
    "--plate-front-z": `calc(${sceneHeight} * ${(
      (contentFraction * FRONT_Z) /
      height
    ).toFixed(6)})`,
    "--plate-inset": `${(overlayInset * 100).toFixed(3)}%`,
    "--plate-surface-inset": `${(surfaceInset * 100).toFixed(3)}%`,
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      data-plate-scene
      className={`shrink-0 ${className ?? ""}`}
      style={style}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      {children}
    </div>
  );
}
