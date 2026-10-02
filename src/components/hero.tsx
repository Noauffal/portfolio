import { HeroLatentField } from "@/components/hero-latent-field";
import { HeroScroll } from "@/components/hero-scroll";

const HERO = {
  name: "Noauffal Abdullatief",
  index: "01 / 2026",
  roleLines: ["DATA SCIENTIST", "& AI ENGINEER"],
  supporting: "I design intelligent systems from data to production.",
  location: "Lyon, France",
  scrollLabel: "SCROLL",
} as const;

const RULER_TICKS = [0, 25, 50, 75, 100];

export function Hero() {
  const [lineOne, lineTwo] = HERO.roleLines;

  return (
    <section
      id="hero"
      data-hero
      className="relative mx-auto grid min-h-svh w-full max-w-[1600px] grid-rows-[auto_1fr_auto] px-6 py-6 sm:px-10 sm:py-8"
    >
      <HeroLatentField />
      <HeroScroll />
      <header className="relative z-10 flex items-center justify-between border-b border-transparent pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:pl-16">
        <span
          aria-hidden="true"
          data-anim="rule-top"
          className="absolute inset-x-0 -bottom-px h-px origin-left bg-line"
        />
        <span data-scroll="meta" className="inline-block">
          <span data-anim="name">{HERO.name}</span>
        </span>
        <span data-scroll="meta" className="inline-block">
          <span data-anim="index">{HERO.index}</span>
        </span>
      </header>

      <div className="relative z-10 flex items-center">
        <div
          aria-hidden="true"
          data-scroll="ruler"
          className="pointer-events-none absolute left-0 top-0 bottom-0 hidden md:block"
        >
          <div data-anim="ruler" className="relative h-full w-16">
            <span className="absolute left-5 top-0 h-full w-px bg-line" />
            {RULER_TICKS.map((tick) => (
              <span
                key={tick}
                className={`absolute left-5 h-px bg-line ${
                  tick === 0 || tick === 100 ? "w-3" : "w-2"
                }`}
                style={{ top: `${tick}%` }}
              />
            ))}
            <span className="absolute left-9 top-0 font-mono text-[10px] tracking-[0.18em] text-muted">
              0.0
            </span>
            <span className="absolute bottom-0 left-9 font-mono text-[10px] tracking-[0.18em] text-muted">
              1.0
            </span>
          </div>
        </div>

        <div className="w-full pb-[7vh] md:pl-16">
          <h1
            data-scroll="display"
            data-exclude="hero-type"
            className="flex flex-col font-display text-[clamp(1.75rem,8.8vw,8.6rem)] uppercase leading-[0.88] tracking-[-0.02em]"
          >
            <span
              data-anim="line-1"
              className="block w-full overflow-hidden whitespace-nowrap pt-[0.12em] pb-[0.12em] -my-[0.12em]"
            >
              <span className="hero-line-inner block font-semibold">
                {lineOne}
              </span>
            </span>
            <span
              data-anim="line-2"
              className="block w-full overflow-hidden whitespace-nowrap pt-[0.12em] pb-[0.12em] -my-[0.12em]"
            >
              <span className="hero-line-inner block font-normal">
                {lineTwo}
              </span>
            </span>
          </h1>
          <div data-scroll="meta">
            <p
              data-anim="support"
              data-exclude="hero-type"
              className="mt-10 max-w-[36ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.5] text-foreground/70"
            >
              {HERO.supporting}
            </p>
          </div>
        </div>
      </div>

      <footer className="relative z-10 flex items-center justify-between border-t border-transparent pt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:pl-16">
        <span
          aria-hidden="true"
          data-anim="rule-bottom"
          className="absolute inset-x-0 -top-px h-px origin-left bg-line"
        />
        <span data-scroll="meta" className="inline-block">
          <span data-anim="foot">{HERO.location}</span>
        </span>
        <span data-scroll="meta" className="inline-block">
          <span data-anim="foot">{HERO.scrollLabel}</span>
        </span>
      </footer>
    </section>
  );
}
