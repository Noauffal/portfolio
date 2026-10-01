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
const inlineLink = "text-accent transition-opacity hover:opacity-80";
const mutedLink =
  "text-zinc-600 transition-colors hover:text-accent dark:text-zinc-400";
const socialLinkClass =
  "text-zinc-500 transition-colors hover:text-accent dark:text-zinc-400";

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.76-1.95C21.4 8.69 22 10.9 22 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21h-4V9Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

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
  const roleLines = cv.title.split(" / ");

  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-12 sm:pt-20">
        <div className="grid gap-10 md:grid-cols-[320px_1fr]">
          <div className="animate-fade-up mx-auto flex h-full w-full max-w-xs flex-col items-center rounded-3xl border border-black/[.06] bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-white/[.03]">
            <div className="flex min-h-64 w-full flex-1 items-center justify-center rounded-2xl bg-accent/10 text-7xl font-bold text-accent">
              N
            </div>
            <h2 className="mt-6 text-2xl font-bold tracking-tight">
              {site.name}
            </h2>
            <div className="mt-6 flex items-center gap-5">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={socialLinkClass}
              >
                <GitHubIcon />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={socialLinkClass}
              >
                <LinkedInIcon />
              </a>
              <a
                href={`mailto:${cv.email}`}
                aria-label={dict.home.contactCta}
                className={socialLinkClass}
              >
                <MailIcon />
              </a>
            </div>
          </div>

          <div className="animate-fade-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">{roleLines[0]}</span>
              {roleLines[1] ? (
                <span className="mt-1 block text-zinc-400 dark:text-zinc-600">
                  {roleLines[1]}
                </span>
              ) : null}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              {cv.summary}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {cv.specialties.map((specialty) => (
                <li
                  key={specialty}
                  className="rounded-full border border-black/[.08] px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/15 dark:text-zinc-300"
                >
                  {specialty}
                </li>
              ))}
            </ul>
          </div>
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
