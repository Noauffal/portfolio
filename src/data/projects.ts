export type Project = {
  slug: string;
  title: string;
  summary: string;
  description?: string;
  tech: string[];
  category?: string;
  links?: {
    github?: string;
    demo?: string;
  };
  image?: string;
  featured?: boolean;
  startDate?: string;
  endDate?: string;
};

export const projects: Project[] = [];
