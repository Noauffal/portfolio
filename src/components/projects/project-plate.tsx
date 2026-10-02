import type { Project, ProjectLink } from "@/data/projects";
import { SpecimenFigure } from "@/components/projects/specimen-figure";

const REGISTER =
  "inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-muted";

const DESCRIPTION =
  "text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.55] text-foreground/70";

function titleClass(emphasis: Project["emphasis"]) {
  return emphasis === "major"
    ? "text-[clamp(1.75rem,4.5vw,4.5rem)]"
    : "text-[clamp(1.5rem,3vw,2.75rem)]";
}

function plateKind(project: Project) {
  if (project.variant === "split") return "split";
  if (project.emphasis === "minor") return "compact";
  return "default";
}

function PlateTitle({ project }: { project: Project }) {
  return (
    <h3
      className={`font-display uppercase leading-[0.95] tracking-[-0.02em] ${titleClass(
        project.emphasis,
      )}`}
    >
      <span className="block overflow-hidden">
        <span data-reveal="title" className="block">
          {project.title}
        </span>
      </span>
    </h3>
  );
}

function Meta({ project }: { project: Project }) {
  const rows: Array<[string, string]> = [
    ["Role", project.role],
    ["Year", project.year],
    ["Stack", project.stack.join(" · ")],
  ];

  if (project.context) {
    rows.push(["Context", project.context]);
  }

  return (
    <dl
      data-reveal="meta"
      className="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]"
    >
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-muted">{label}</dt>
          <dd className="text-foreground/80">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Links({
  links,
  className,
}: {
  links: ProjectLink[];
  className?: string;
}) {
  return (
    <div
      data-reveal="links"
      className={`flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] ${
        className ?? ""
      }`}
    >
      {links.map((link) => (
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

function FigureBody({ project }: { project: Project }) {
  const figure = project.figures[0];

  return (
    <>
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <span data-reveal="register" className={REGISTER}>
            Plate {project.index}
          </span>
          <div className="mt-4">
            <PlateTitle project={project} />
          </div>
          <p data-reveal="text" className={`mt-6 max-w-[52ch] ${DESCRIPTION}`}>
            {project.description}
          </p>
        </div>
        <div className="md:col-span-5 md:ml-auto md:w-full md:max-w-xs">
          <Meta project={project} />
          <Links links={project.links} className="mt-6 md:justify-end" />
        </div>
      </div>
      {figure ? (
        <div className="mt-10 sm:mt-14">
          <SpecimenFigure figure={figure} />
        </div>
      ) : null}
    </>
  );
}

function TextBody({ project }: { project: Project }) {
  const figure = project.figures[0];

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-7">
        <span data-reveal="register" className={REGISTER}>
          Plate {project.index}
        </span>
        <div className="mt-4">
          <PlateTitle project={project} />
        </div>
        <p data-reveal="text" className={`mt-6 max-w-[46ch] ${DESCRIPTION}`}>
          {project.description}
        </p>
        <div className="mt-8 max-w-xs">
          <Meta project={project} />
        </div>
        <Links links={project.links} className="mt-6" />
      </div>
      <div className="md:col-span-4 md:col-start-9">
        {figure ? <SpecimenFigure figure={figure} /> : null}
      </div>
    </div>
  );
}

function SplitBody({ project }: { project: Project }) {
  const [primary, secondary] = project.figures;

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="order-2 md:order-1 md:col-span-6">
        {primary ? <SpecimenFigure figure={primary} /> : null}
        {secondary ? (
          <div className="mt-6 md:w-2/3">
            <SpecimenFigure figure={secondary} reveal="figure-secondary" />
          </div>
        ) : null}
      </div>
      <div className="order-1 md:order-2 md:col-span-6">
        <span data-reveal="register" className={REGISTER}>
          Plate {project.index}
        </span>
        <div className="mt-4">
          <PlateTitle project={project} />
        </div>
        <p data-reveal="text" className={`mt-6 max-w-[48ch] ${DESCRIPTION}`}>
          {project.description}
        </p>
        {project.highlight ? (
          <p
            data-reveal="meta"
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            {project.highlight}
          </p>
        ) : null}
        <div className="mt-8 max-w-xs">
          <Meta project={project} />
        </div>
        <Links links={project.links} className="mt-6" />
      </div>
    </div>
  );
}

function PlateBody({ project }: { project: Project }) {
  if (project.variant === "split") return <SplitBody project={project} />;
  if (project.variant === "text-dominant") return <TextBody project={project} />;
  return <FigureBody project={project} />;
}

export function ProjectPlate({
  project,
  first,
}: {
  project: Project;
  first: boolean;
}) {
  const spacing =
    project.emphasis === "major"
      ? "pt-14 pb-20 sm:pt-20 sm:pb-28"
      : "pt-10 pb-14 sm:pt-14 sm:pb-20";

  return (
    <article
      data-reveal-root
      data-plate={plateKind(project)}
      className="relative w-full"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10">
        <div
          className={`relative grid grid-cols-1 md:grid-cols-[4rem_1fr] ${
            first ? "" : "border-t border-transparent"
          }`}
        >
          {first ? null : (
            <span
              aria-hidden="true"
              data-reveal="rule"
              className="absolute inset-x-0 -top-px h-px origin-left bg-line"
            />
          )}
          <div aria-hidden="true" className="relative hidden md:block">
            <span className="absolute left-5 top-0 h-full w-px bg-line" />
            <span className="absolute left-5 top-0 h-px w-3 bg-line" />
          </div>
          <div className={`min-w-0 ${spacing}`}>
            <PlateBody project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}
