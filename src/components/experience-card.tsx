import type { ExperienceEntry } from "@/data/resume";

type ExperienceCardProps = {
  entry: ExperienceEntry;
  showHighlights?: boolean;
};

export function ExperienceCard({
  entry,
  showHighlights = false,
}: ExperienceCardProps) {
  return (
    <article className="rounded-2xl border border-black/[.06] bg-white p-6 transition-transform hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[.02]">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {entry.company}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {entry.period} · {entry.location}
        </p>
      </div>
      <p className="mt-1 text-sm font-medium text-accent">{entry.role}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
        {entry.description}
      </p>
      {showHighlights && entry.highlights.length > 0 ? (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {entry.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
