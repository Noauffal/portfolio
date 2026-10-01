import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";
import { site } from "@/data/site";
import type { Dictionary, Locale } from "@/i18n/dictionaries";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

const linkClass =
  "text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400";

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  return (
    <header className="border-b border-black/[.06] dark:border-white/10">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href={`/${locale}`}
          className="text-base font-semibold tracking-tight"
        >
          {site.name}
        </Link>
        <nav
          aria-label={dict.nav.home}
          className="flex items-center gap-5 text-sm"
        >
          <Link href={`/${locale}`} className={linkClass}>
            {dict.nav.home}
          </Link>
          <Link href={`/${locale}/projects`} className={linkClass}>
            {dict.nav.projects}
          </Link>
          <Link href={`/${locale}/about`} className={linkClass}>
            {dict.nav.about}
          </Link>
        </nav>
        <LanguageSwitcher
          currentLocale={locale}
          label={dict.languageSwitcher.label}
          options={dict.languageSwitcher.options}
        />
      </div>
    </header>
  );
}
