export type ProjectLinkKind = "case" | "code" | "paper" | "demo";

export type FigureKind = "screenshot" | "diagram" | "plot" | "code" | "artifact";

export type FigureSpan = "full" | "half" | "margin" | "banner";

export type ProjectVariant = "figure-dominant" | "text-dominant" | "split";

export type ProjectEmphasis = "major" | "minor";

export type ProjectFigure = {
  id: string;
  caption: string;
  kind: FigureKind;
  span: FigureSpan;
};

export type ProjectLink = {
  label: string;
  href: string;
  kind: ProjectLinkKind;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  description: string;
  role: string;
  year: string;
  stack: string[];
  context?: string;
  highlight?: string;
  links: ProjectLink[];
  variant: ProjectVariant;
  mediaSide?: "left" | "right";
  emphasis: ProjectEmphasis;
  figures: ProjectFigure[];
};

export const projects: Project[] = [
  {
    slug: "project-01",
    index: "01",
    title: "PROJECT TITLE",
    description:
      "Short neutral placeholder description for the opening specimen plate, spanning a few lines to establish the editorial measure and the relationship between type and figure.",
    role: "ROLE",
    year: "YEAR",
    stack: ["STACK 01", "STACK 02", "STACK 03"],
    links: [
      { label: "Case", href: "#", kind: "case" },
      { label: "Code", href: "#", kind: "code" },
    ],
    variant: "figure-dominant",
    mediaSide: "right",
    emphasis: "major",
    figures: [
      { id: "fig-01", caption: "FIG. 01 — SPECIMEN", kind: "diagram", span: "banner" },
    ],
  },
  {
    slug: "project-02",
    index: "02",
    title: "PROJECT TITLE",
    description: "Compact neutral placeholder description.",
    role: "ROLE",
    year: "YEAR",
    stack: ["STACK 01", "STACK 02"],
    links: [{ label: "Case", href: "#", kind: "case" }],
    variant: "text-dominant",
    emphasis: "minor",
    figures: [
      { id: "fig-02", caption: "FIG. 02 — PLOT", kind: "plot", span: "margin" },
    ],
  },
  {
    slug: "project-03",
    index: "03",
    title: "PROJECT TITLE",
    description:
      "Neutral placeholder description for a figure-led specimen plate, with enough length to occupy the right-hand column and balance the primary figure on the left.",
    role: "ROLE",
    year: "YEAR",
    stack: ["STACK 01", "STACK 02", "STACK 03", "STACK 04"],
    highlight: "PLACEHOLDER HIGHLIGHT LINE",
    links: [
      { label: "Case", href: "#", kind: "case" },
      { label: "Paper", href: "#", kind: "paper" },
    ],
    variant: "split",
    mediaSide: "left",
    emphasis: "major",
    figures: [
      { id: "fig-03", caption: "FIG. 03 — ARTIFACT", kind: "artifact", span: "half" },
      { id: "fig-04", caption: "FIG. 03B — DETAIL", kind: "diagram", span: "margin" },
    ],
  },
];
