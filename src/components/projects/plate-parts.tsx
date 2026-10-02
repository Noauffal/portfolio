import type { Project, ProjectFigure } from "@/data/projects";

export function PlateMeta({ project }: { project: Project }) {
  const rows: Array<[string, string]> = [
    ["Role", project.role],
    ["Year", project.year],
    ["Stack", project.stack.join(" · ")],
  ];

  if (project.context) {
    rows.push(["Context", project.context]);
  }

  return (
    <dl className="grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.18em]">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-muted">{label}</dt>
          <dd className="text-foreground/80">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PlateLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em]">
      {project.links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-muted transition-colors hover:text-foreground"
        >
          {link.label} ↗
        </a>
      ))}
    </div>
  );
}

function FigureStructure({ kind }: { kind: ProjectFigure["kind"] }) {
  if (kind === "plot") {
    return (
      <div className="absolute inset-x-5 bottom-6 flex h-4 items-end justify-between border-b border-line">
        {[0, 1, 2, 3, 4].map((tick) => (
          <span key={tick} className="h-2 w-px bg-line" />
        ))}
      </div>
    );
  }

  if (kind === "code") {
    return (
      <div className="absolute inset-x-5 top-7 space-y-2">
        {["w-1/3", "w-1/2", "w-2/5", "w-1/4"].map((width) => (
          <span key={width} className={`block h-px bg-line ${width}`} />
        ))}
      </div>
    );
  }

  if (kind === "diagram") {
    return (
      <div className="absolute inset-0">
        <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-line" />
        <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-line" />
      </div>
    );
  }

  return null;
}

export function PlateFigure({
  figure,
  className,
}: {
  figure: ProjectFigure;
  className?: string;
}) {
  return (
    <figure className={`flex h-full min-h-0 flex-col ${className ?? ""}`}>
      <div className="relative min-h-0 w-full flex-1 border border-line">
        <FigureStructure kind={figure.kind} />
        <span className="absolute left-4 top-3 font-mono text-[9px] uppercase tracking-[0.25em] text-muted/60">
          Placeholder
        </span>
        <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-foreground/25" />
        <span className="absolute -right-px -top-px h-2 w-2 border-r border-t border-foreground/25" />
        <span className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-foreground/25" />
        <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-foreground/25" />
      </div>
      <figcaption className="mt-3 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        {figure.caption}
      </figcaption>
    </figure>
  );
}
