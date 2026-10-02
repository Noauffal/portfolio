import { projects } from "@/data/projects";
import { PhysicalPlate } from "@/components/projects/physical-plate";
import { PlateFigure, PlateLinks, PlateMeta } from "@/components/projects/plate-parts";

const project = projects[0];

export function Plate01() {
  return (
    <PhysicalPlate
      width={1}
      height={1.4}
      surfaceWidth="min(clamp(264px, 42.7svh, 604px), 77vw)"
    >
      <article
        data-plate-content
        aria-label={`Plate ${project.index} — ${project.title}`}
        className="flex flex-col p-[9%]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          <span>Plate {project.index}</span>
          <span>Specimen</span>
        </div>

        <h2 className="mt-6 shrink-0 font-display text-[clamp(1.35rem,2.3vw,2.4rem)] uppercase leading-[0.95] tracking-[-0.02em]">
          {project.title}
        </h2>

        <p className="mt-4 max-w-[40ch] shrink-0 text-[0.95rem] leading-[1.5] text-foreground/70">
          {project.description}
        </p>

        <div className="mt-6 min-h-0 flex-1">
          {project.figures[0] ? <PlateFigure figure={project.figures[0]} /> : null}
        </div>

        <div className="mt-6 shrink-0">
          <div className="border-t border-line pt-4">
            <PlateMeta project={project} />
          </div>
          <div className="mt-4">
            <PlateLinks project={project} />
          </div>
        </div>
      </article>
    </PhysicalPlate>
  );
}
