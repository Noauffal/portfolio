import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";
import { resume } from "@/data/resume";
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
    title: `${dict.projects.heading} — ${resume[lang].title}`,
    description: resume[lang].summary,
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
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl animate-fade-up">
        {dict.projects.heading}
      </h1>
      {projects.length === 0 ? (
        <Reveal>
          <p className="mt-10 rounded-2xl border border-dashed border-black/[.12] p-10 text-center text-sm text-zinc-500 dark:border-white/15 dark:text-zinc-400">
            {dict.projects.empty}
          </p>
        </Reveal>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
