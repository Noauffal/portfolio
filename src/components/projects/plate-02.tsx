import { projects } from "@/data/projects";
import { PhysicalPlate } from "@/components/projects/physical-plate";
import { PlateFigure, PlateLinks, PlateMeta } from "@/components/projects/plate-parts";

const project = projects[1];

export function Plate02() {
  return (
    <PhysicalPlate
      width={1}
      height={1.5}
      surfaceWidth="min(clamp(255px, 41.1svh, 616px), 77vw)"
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

        <h3 className="mt-6 shrink-0 font-display text-[clamp(1.3rem,2vw,2.1rem)] uppercase leading-[0.95] tracking-[-0.02em]">
          {project.title}
        </h3>

        <p className="mt-4 max-w-[36ch] shrink-0 text-[0.9rem] leading-[1.5] text-foreground/70">
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
