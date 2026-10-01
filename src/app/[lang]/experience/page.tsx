import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ExperienceCard } from "@/components/experience-card";
import { Reveal } from "@/components/reveal";
import { resume } from "@/data/resume";
import { site } from "@/data/site";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="mt-12 border-t border-black/[.06] pt-8 dark:border-white/10"
    >
      <h2 id={id} className="text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/experience">): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

  const dict = getDictionary(lang);

  return {
    title: `${dict.nav.experience} — ${site.name}`,
    description: resume[lang].summary,
  };
}

export default async function ExperiencePage({
  params,
}: PageProps<"/[lang]/experience">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const cv = resume[lang];

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20">
      <header className="animate-fade-up">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {dict.nav.experience}
        </h1>
        <p className="mt-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {site.name} · {cv.title} · {cv.location}
        </p>
      </header>

      <Reveal>
        <Section id="experience" title={cv.headings.experience}>
          <div className="grid gap-4">
            {cv.experience.map((entry) => (
              <ExperienceCard
                key={`${entry.company}-${entry.role}`}
                entry={entry}
                showHighlights
              />
            ))}
          </div>
        </Section>
      </Reveal>

    </section>
  );
}
