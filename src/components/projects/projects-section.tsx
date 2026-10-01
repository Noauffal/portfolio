import { projects } from "@/data/projects";
import { ProjectPlate } from "@/components/projects/project-plate";
import { ProjectsReveal } from "@/components/projects/projects-reveal";

export function ProjectsSection() {
  const count = projects.length;
  const rangeLabel = `Projects — Plates 01–${String(count).padStart(2, "0")}`;

  return (
    <section className="mx-auto w-full max-w-[1600px] px-6 py-6 sm:px-10 sm:py-8">
      <ProjectsReveal />
      <header
        data-reveal-root
        data-plate="default"
        className="relative flex items-center justify-between border-b border-transparent pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:pl-16"
      >
        <span
          aria-hidden="true"
          data-reveal="rule"
          className="absolute inset-x-0 -bottom-px h-px origin-left bg-line"
        />
        <h2 data-reveal="register">{rangeLabel}</h2>
        <span data-reveal="register">
          {String(count).padStart(2, "0")} Plates
        </span>
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
