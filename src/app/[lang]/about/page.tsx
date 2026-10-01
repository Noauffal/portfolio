import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

  const dict = getDictionary(lang);

  return {
    title: `${dict.about.heading} — ${site.name}`,
    description: dict.meta.description,
  };
}

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/about">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight animate-fade-up">
        {dict.about.heading}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 [animation-delay:100ms] animate-fade-up dark:text-zinc-300">
        {dict.about.description}
      </p>
    </section>
  );
}
