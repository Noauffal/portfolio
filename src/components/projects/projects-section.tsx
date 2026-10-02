import { projects } from "@/data/projects";
import { ProjectPlate } from "@/components/projects/project-plate";
import { ProjectsReveal } from "@/components/projects/projects-reveal";

export function ProjectsSection() {
  const count = projects.length;
  const rangeLabel = `Projects — Plates 01–${String(count).padStart(2, "0")}`;

  return (
    <section data-paper className="w-full py-6 sm:py-8">
      <ProjectsReveal />
      <header className="mx-auto w-full max-w-[1600px] px-6 sm:px-10">
        <div className="relative flex items-center justify-between border-b border-transparent pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:pl-16">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-px h-px bg-line"
          />
          <h2>{rangeLabel}</h2>
          <span>{String(count).padStart(2, "0")} Plates</span>
        </div>
      </header>
      <div>
        {projects.map((project, index) => (
          <ProjectPlate
            key={project.slug}
            project={project}
            first={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
