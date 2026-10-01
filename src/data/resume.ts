import type { Locale } from "@/i18n/dictionaries";

export type ExperienceEntry = {
  role: string;
  company: string;
  description: string;
  period: string;
  location: string;
  highlights: string[];
};

export type Resume = {
  title: string;
  summary: string;
  specialties: string[];
  headings: {
    experience: string;
  };
  experience: ExperienceEntry[];
  location: string;
  email: string;
};

export const resume: Record<Locale, Resume> = {
  fr: {
    title: "Data Scientist / AI Engineer",
    summary:
      "Data Scientist diplômé d'un Master en Data Science, spécialisé dans la conception de solutions Data et IA générative. Expérience en LLM, systèmes agentiques, automatisation Python, OCR, Data Engineering et industrialisation sur Google Cloud Platform (GCP), du prototypage au déploiement de solutions métiers.",
    specialties: [
      "IA générative",
      "Systèmes agentiques",
      "Data Engineering",
      "GCP",
    ],
    headings: {
      experience: "Expérience professionnelle",
    },
    experience: [
      {
        role: "Data Scientist",
        company: "Caisse d'Épargne Rhône Alpes",
        description:
          "Conception de solutions Data et IA générative : assistant SQL multi-agents, pipelines d'extraction OCR et industrialisation sur GCP.",
        period: "Mars 2024 – Aujourd'hui",
        location: "Lyon",
        highlights: [
          "Conception en Python d'un assistant SQL à architecture multi-agents intégrant un LLM d'entreprise et orchestrant plusieurs composants IA spécialisés.",
          "Pipeline d'extraction automatisée de données financières à partir d'un SIREN (API Pappers + OCR).",
          "Industrialisation de traitements sur Google Cloud Platform (GCP) avec Cloud Run Jobs, et modélisation ML de la débancarisation sur Dataiku.",
        ],
      },
      {
        role: "Data Analyst / Data Scientist",
        company: "Caisse d'Épargne Rhône Alpes",
        description:
          "Modélisation Machine Learning et migration de rapports BI, avec automatisation du reporting financier.",
        period: "Août 2023 – Mars 2024",
        location: "Lyon",
        highlights: [
          "Développement d'un modèle de Machine Learning sous Python/PySpark pour anticiper les profils en contentieux.",
          "Migration et transformation de rapports BI4 vers des workflows Alteryx et automatisation de rapports financiers.",
        ],
      },
      {
        role: "Data Scientist (stage)",
        company: "Caisse d'Épargne Rhône Alpes",
        description:
          "Projets Data Science en IA générative, Machine Learning et NLP, du prototypage à la mise en production.",
        period: "Février 2023 – Juillet 2023",
        location: "Lyon",
        highlights: [
          "Projets Data Science en IA générative, Machine Learning et NLP : analyse d'offres d'emploi bancaires, analyse de verbatims clients, optimisation des déplacements collaborateurs.",
          "Modélisation Python, suivi MLflow, visualisation et mise en production avec Streamlit ; ingénierie de données SQL / Oracle.",
        ],
      },
    ],
    location: "Lyon, France",
    email: "noauffal@gmail.com",
  },
  en: {
    title: "Data Scientist / AI Engineer",
    summary:
      "Data Scientist with a Master's degree in Data Science, specialized in designing Data and generative AI solutions. Experience in LLMs, agentic systems, Python automation, OCR, Data Engineering, and industrialization on Google Cloud Platform (GCP), from prototyping to the deployment of business solutions.",
    specialties: [
      "Generative AI",
      "Agentic systems",
      "Data Engineering",
      "GCP",
    ],
    headings: {
      experience: "Professional experience",
    },
    experience: [
      {
        role: "Data Scientist",
        company: "Caisse d'Épargne Rhône Alpes",
        description:
          "Building Data and generative AI solutions: a multi-agent SQL assistant, OCR extraction pipelines, and GCP industrialization.",
        period: "March 2024 – Present",
        location: "Lyon",
        highlights: [
          "Designed in Python a multi-agent SQL assistant integrating an enterprise LLM and orchestrating several specialized AI components.",
          "Automated pipeline to extract financial data from a SIREN (Pappers API + OCR).",
          "Industrialized processing on Google Cloud Platform (GCP) with Cloud Run Jobs, and built a Machine Learning attrition model on Dataiku.",
        ],
      },
      {
        role: "Data Analyst / Data Scientist",
        company: "Caisse d'Épargne Rhône Alpes",
        description:
          "Machine Learning modeling and BI report migration, with automated financial reporting.",
        period: "August 2023 – March 2024",
        location: "Lyon",
        highlights: [
          "Developed a Machine Learning model in Python/PySpark to anticipate profiles likely to enter litigation.",
          "Migrated and transformed BI4 reports into Alteryx workflows and automated financial reporting.",
        ],
      },
      {
        role: "Data Scientist (Intern)",
        company: "Caisse d'Épargne Rhône Alpes",
        description:
          "Data Science projects in generative AI, Machine Learning, and NLP, from prototyping to deployment.",
        period: "February 2023 – July 2023",
        location: "Lyon",
        highlights: [
          "Data Science projects in generative AI, Machine Learning, and NLP: banking job-post analysis, customer verbatim analysis, and employee commute optimization.",
          "Python modeling, MLflow tracking, visualization, and deployment with Streamlit; data engineering with SQL / Oracle.",
        ],
      },
    ],
    location: "Lyon, France",
    email: "noauffal@gmail.com",
  },
};
