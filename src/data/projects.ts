export type FigureKind = "screenshot" | "diagram" | "plot" | "code" | "artifact";

export type ProjectFigure = {
  caption: string;
  kind: FigureKind;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  index: string;
  title: string;
  description: string;
  role: string;
  year: string;
  stack: string[];
  highlight?: string;
  links: ProjectLink[];
  figures: ProjectFigure[];
};

export const projects: Project[] = [
  {
    index: "01",
    title: "PROJECT TITLE",
    description:
      "Short neutral placeholder description for the opening specimen plate, spanning a few lines to establish the editorial measure and the relationship between type and figure.",
    role: "ROLE",
    year: "YEAR",
    stack: ["STACK 01", "STACK 02", "STACK 03"],
    links: [
      { label: "Case", href: "#" },
      { label: "Code", href: "#" },
    ],
    figures: [{ caption: "FIG. 01 — SPECIMEN", kind: "diagram" }],
  },
  {
    index: "02",
    title: "PROJECT TITLE",
    description: "Compact neutral placeholder description.",
    role: "ROLE",
    year: "YEAR",
    stack: ["STACK 01", "STACK 02"],
    links: [{ label: "Case", href: "#" }],
    figures: [{ caption: "FIG. 02 — PLOT", kind: "plot" }],
  },
  {
    index: "03",
    title: "PROJECT TITLE",
    description:
      "Neutral placeholder description for a figure-led specimen plate, with enough length to occupy the right-hand column and balance the primary figure on the left.",
    role: "ROLE",
    year: "YEAR",
    stack: ["STACK 01", "STACK 02", "STACK 03", "STACK 04"],
    highlight: "PLACEHOLDER HIGHLIGHT LINE",
    links: [
      { label: "Case", href: "#" },
      { label: "Paper", href: "#" },
    ],
    figures: [{ caption: "FIG. 03 — ARTIFACT", kind: "artifact" }],
  },
];
