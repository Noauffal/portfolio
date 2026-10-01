import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";
import type { Dictionary, Locale } from "@/i18n/dictionaries";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

const navLinkClass =
  "group relative flex h-9 w-9 items-center justify-center text-zinc-600 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-zinc-300";

const navLabelClass =
  "pointer-events-none absolute top-full left-1/2 z-10 mt-1 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-black/[.06] bg-background px-2 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm transition duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 dark:border-white/10";

function HomeIcon() {
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
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.8V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.8" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  );
}

function FolderIcon() {
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
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function BriefcaseIcon() {
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
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const navItems = [
    { href: `/${locale}`, label: dict.nav.home, Icon: HomeIcon },
    { href: `/${locale}/projects`, label: dict.nav.projects, Icon: FolderIcon },
    {
      href: `/${locale}/experience`,
      label: dict.nav.experience,
      Icon: BriefcaseIcon,
    },
  ];

  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur">
      <div className="relative mx-auto flex w-full max-w-5xl items-center justify-center px-6 py-4">
        <nav
          aria-label={dict.nav.label}
          className="flex items-center gap-1 rounded-full border border-black/[.08] bg-black/[.03] p-1 dark:border-white/10 dark:bg-white/[.06]"
        >
          {navItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={navLinkClass}
            >
              <Icon />
              <span aria-hidden="true" className={navLabelClass}>
                {label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="absolute right-6">
          <LanguageSwitcher
            currentLocale={locale}
            label={dict.languageSwitcher.label}
            options={dict.languageSwitcher.options}
          />
        </div>
      </div>
    </header>
  );
}
