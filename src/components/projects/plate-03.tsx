import { projects } from "@/data/projects";
import { PhysicalPlate } from "@/components/projects/physical-plate";
import { PlateFigure, PlateLinks } from "@/components/projects/plate-parts";

const project = projects[2];

export function Plate03() {
  return (
    <PhysicalPlate
      width={1}
      height={0.625}
      surfaceWidth="clamp(800px, 84vw, 1350px)"
    >
      <article
        data-plate-content
        aria-label={`Plate ${project.index} — ${project.title}`}
        className="flex flex-col p-[6%]"
      >
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-line pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          <span>Plate {project.index}</span>
          <span>Specimen</span>
        </div>

        {/* MAIN — flexible two-column area */}
        <div className="mt-7 grid min-h-0 flex-1 grid-cols-[42fr_58fr] gap-[8%]">
          <div className="flex flex-col">
            <h2 className="shrink-0 font-display text-[clamp(1.3rem,2.6vw,2.8rem)] uppercase leading-[0.95] tracking-[-0.02em]">
              {project.title}
            </h2>
            <p className="mt-5 max-w-[46ch] shrink-0 text-[0.95rem] leading-[1.55] text-foreground/70">
              {project.description}
            </p>
            {project.highlight ? (
              <p className="mt-6 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {project.highlight}
              </p>
            ) : null}
          </div>

          <div className="flex min-h-0 flex-col">
            {project.figures[0] ? (
              <PlateFigure
                figure={project.figures[0]}
                className="min-h-0 flex-1"
              />
            ) : null}
          </div>
        </div>

        {/* FOOTER — dedicated apparatus zone */}
        <div className="mt-8 flex shrink-0 flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line pt-5 font-mono text-[10px] uppercase tracking-[0.18em]">
          <div className="flex flex-wrap gap-x-8 gap-y-1">
            <span className="flex gap-2">
              <span className="text-muted">Role</span>
              <span className="text-foreground/80">{project.role}</span>
            </span>
            <span className="flex gap-2">
              <span className="text-muted">Year</span>
              <span className="text-foreground/80">{project.year}</span>
            </span>
            <span className="flex gap-2">
              <span className="text-muted">Stack</span>
              <span className="text-foreground/80">
                {project.stack.join(" · ")}
              </span>
            </span>
          </div>
          <PlateLinks project={project} />
        </div>
      </article>
    </PhysicalPlate>
  );
}
