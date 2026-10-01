import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  labels: {
    code: string;
    demo: string;
  };
};

export function ProjectCard({ project, labels }: ProjectCardProps) {
  const github = project.links?.github;
  const demo = project.links?.demo;

  return (
    <article className="rounded-xl border border-black/[.06] bg-white p-5 transition-transform hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[.02]">
      <h2 className="text-base font-semibold tracking-tight">
        {project.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {project.summary}
      </p>
      {project.tech.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <li
              key={item}
              className="rounded-full bg-black/[.04] px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-white/10 dark:text-zinc-300"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      {github || demo ? (
        <div className="mt-4 flex items-center gap-4 text-sm font-medium">
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {labels.code}
            </a>
          ) : null}
          {demo ? (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {labels.demo}
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
