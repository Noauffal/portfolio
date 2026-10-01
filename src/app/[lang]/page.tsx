import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

  const dict = getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20">
      <div className="animate-fade-up">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {dict.home.role}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {site.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          {dict.home.description}
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3 [animation-delay:100ms] animate-fade-up">
        <Link
          href={`/${lang}/projects`}
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          {dict.home.viewProjects}
        </Link>
        <Link
          href={`/${lang}/about`}
          className="rounded-full border border-black/[.12] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/[.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground dark:border-white/20 dark:hover:bg-white/10"
        >
          {dict.home.about}
        </Link>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-5 text-sm font-medium [animation-delay:200ms] animate-fade-up">
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
        >
          GitHub
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
