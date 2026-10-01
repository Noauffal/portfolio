"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/dictionaries";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  label: string;
  options: Record<Locale, string>;
};

export function LanguageSwitcher({
  currentLocale,
  label,
  options,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex items-center gap-2 text-sm" aria-label={label}>
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        const href = `/${locale}${rest ? `/${rest}` : ""}`;

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? "true" : undefined}
            className={
              isActive
                ? "font-semibold text-foreground"
                : "text-zinc-500 transition-colors hover:text-foreground dark:text-zinc-400"
            }
          >
            {options[locale]}
          </Link>
        );
      })}
    </div>
  );
}
