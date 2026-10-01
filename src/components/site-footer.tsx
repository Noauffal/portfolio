import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/dictionaries";

type SiteFooterProps = {
  dict: Dictionary;
};

const linkClass =
  "text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400";

export function SiteFooter({ dict }: SiteFooterProps) {
  return (
    <footer className="border-t border-black/[.06] dark:border-white/10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-zinc-500 sm:flex-row dark:text-zinc-400">
        <p>
          © {new Date().getFullYear()} {site.name} · {dict.footer.rights}
        </p>
        <div className="flex items-center gap-5">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
