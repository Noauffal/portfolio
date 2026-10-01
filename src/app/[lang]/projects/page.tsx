import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

  const dict = getDictionary(lang);

  return {
    title: `${dict.projects.heading} — ${dict.home.role}`,
    description: dict.meta.description,
  };
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[lang]/projects">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight animate-fade-up">
        {dict.projects.heading}
      </h1>
      {projects.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-black/[.12] p-10 text-center text-sm text-zinc-500 [animation-delay:100ms] animate-fade-up dark:border-white/15 dark:text-zinc-400">
          {dict.projects.empty}
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              labels={{ code: dict.projects.code, demo: dict.projects.demo }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
