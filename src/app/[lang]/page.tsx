import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExperienceCard } from "@/components/experience-card";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";
import { resume } from "@/data/resume";
import { site } from "@/data/site";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

const accentButton =
  "inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const secondaryButton =
  "inline-flex items-center justify-center rounded-full border border-black/[.12] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/[.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-white/20 dark:hover:bg-white/10";
const inlineLink = "text-accent transition-opacity hover:opacity-80";
const mutedLink =
  "text-zinc-600 transition-colors hover:text-accent dark:text-zinc-400";

function SectionHeader({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <Link href={href} className={`text-sm font-medium ${inlineLink}`}>
        {linkLabel}
      </Link>
    </div>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

  return {
    title: `${site.name} — ${resume[lang].title}`,
    description: resume[lang].summary,
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const cv = resume[lang];

  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-16 sm:pt-28">
        <div className="animate-fade-up">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            {cv.title}
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {site.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            {cv.summary}
          </p>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2 [animation-delay:100ms] animate-fade-up">
          {cv.specialties.map((specialty) => (
            <li
              key={specialty}
              className="rounded-full border border-black/[.08] px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/15 dark:text-zinc-300"
            >
              {specialty}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3 [animation-delay:200ms] animate-fade-up">
          <Link href={`/${lang}/projects`} className={accentButton}>
            {dict.home.viewProjects}
          </Link>
          <Link href={`/${lang}/experience`} className={secondaryButton}>
            {dict.home.viewExperience}
          </Link>
        </div>
      </section>

      <Reveal>
        <section className="mx-auto w-full max-w-5xl px-6 py-12">
          <SectionHeader
            title={dict.home.recentProjects}
            href={`/${lang}/projects`}
            linkLabel={dict.home.viewAll}
          />
          {projects.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-black/[.12] p-8 text-center dark:border-white/15">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {dict.home.projectsSoon}
              </p>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-block text-sm font-medium ${inlineLink}`}
              >
                {dict.home.projectsSoonCta}
              </a>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  labels={{ code: dict.projects.code, demo: dict.projects.demo }}
                />
              ))}
            </div>
          )}
        </section>
      </Reveal>

      <Reveal delay={60}>
        <section className="mx-auto w-full max-w-5xl px-6 py-12">
          <SectionHeader
            title={dict.home.experiencePreview}
            href={`/${lang}/experience`}
            linkLabel={dict.home.viewAll}
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {cv.experience.slice(0, 2).map((entry) => (
              <ExperienceCard
                key={`${entry.company}-${entry.role}`}
                entry={entry}
              />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={60}>
        <section className="mx-auto w-full max-w-5xl px-6 py-16">
          <div className="rounded-2xl border border-black/[.06] bg-black/[.02] p-8 sm:p-10 dark:border-white/10 dark:bg-white/[.03]">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {dict.home.contactHeading}
            </h2>
            <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-300">
              {dict.home.contactText}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <a href={`mailto:${cv.email}`} className={accentButton}>
                {dict.home.contactCta}
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className={mutedLink}
              >
                GitHub
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={mutedLink}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
