import { fr, type Dictionary } from "./fr";
import { en } from "./en";

export type { Dictionary };

export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
