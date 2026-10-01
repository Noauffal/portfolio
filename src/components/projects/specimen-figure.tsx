import type { FigureKind, FigureSpan, ProjectFigure } from "@/data/projects";

const ASPECT: Record<FigureSpan, string> = {
  banner: "aspect-[21/9]",
  full: "aspect-[16/9]",
  half: "aspect-[4/3]",
  margin: "aspect-[4/3]",
};

function Structure({ kind }: { kind: FigureKind }) {
  const shared = "absolute";

  if (kind === "plot") {
    return (
      <div
        data-reveal="apparatus"
        className={`${shared} inset-x-5 bottom-6 flex h-4 items-end justify-between border-b border-line`}
      >
        {[0, 1, 2, 3, 4].map((tick) => (
          <span key={tick} className="h-2 w-px bg-line" />
        ))}
      </div>
    );
  }

  if (kind === "code") {
    return (
      <div data-reveal="apparatus" className={`${shared} inset-x-5 top-7 space-y-2`}>
        {["w-1/3", "w-1/2", "w-2/5", "w-1/4"].map((width) => (
          <span key={width} className={`block h-px bg-line ${width}`} />
        ))}
      </div>
    );
  }

  if (kind === "diagram") {
    return (
      <div data-reveal="apparatus" className={`${shared} inset-0`}>
        <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-line" />
        <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-line" />
      </div>
    );
  }

  return null;
}

export function SpecimenFigure({
  figure,
  className,
  reveal = "figure",
}: {
  figure: ProjectFigure;
  className?: string;
  reveal?: "figure" | "figure-secondary";
}) {
  return (
    <figure data-reveal={reveal} className={className}>
      <div
        className={`relative w-full border border-line ${ASPECT[figure.span]}`}
      >
        <Structure kind={figure.kind} />
        <span
          data-reveal="apparatus"
          className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted/60"
        >
          Placeholder
        </span>
        <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-foreground/25" />
        <span className="absolute -right-px -top-px h-2 w-2 border-r border-t border-foreground/25" />
        <span className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-foreground/25" />
        <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-foreground/25" />
      </div>
      <figcaption
        data-reveal="caption"
        className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
      >
        {figure.caption}
      </figcaption>
    </figure>
  );
}
