export type CaseSection = {
  heading: string
  paragraphs: string[]
  points?: string[]
}

export type ProjectVisual = "contract" | "admin" | "esg"

export type Project = {
  id: string
  index: string
  title: string
  type: string
  summary: string
  highlights: string[]
  tags: string[]
  emphasis: "lead" | "second" | "support"
  visual: ProjectVisual
  sections: CaseSection[]
}

export const profile = {
  name: "Rongkai Xu",
  mark: "RX",
  eyebrow: "Data · Analytics · Applied AI",
  headline: "Turning complex data into useful products.",
  introduction:
    "I’m a Business Intelligence Analyst building data workflows, AI-powered applications, and tools that make complex information easier to use.",
  location: "San Francisco Bay Area",
}

export const contactLinks = {
  github: "https://github.com/henry-xrk",
  email: "rongkai918@gmail.com",
  linkedin: "https://www.linkedin.com/in/rongkai-henry-xu/",
  resume: "",
}

export const signal = {
  summary: "From an unstructured record to a view people can use.",
  restingDetail: "Extraction, matching, and a result someone can review.",
  stages: [
    {
      id: "raw" as const,
      index: "01",
      label: "Raw record",
      detail: "An unstructured document, before its contents are separated into fields.",
    },
    {
      id: "fields" as const,
      index: "02",
      label: "Fields",
      detail: "The pieces a workflow can store, search, and review.",
    },
    {
      id: "matched" as const,
      index: "03",
      label: "Matched entity",
      detail: "Duplicate party records brought toward a single match.",
    },
    {
      id: "usable" as const,
      index: "04",
      label: "Usable view",
      detail: "A clear result someone can review and use.",
    },
  ],
}

export const projects: Project[] = [
  {
    id: "contract-intelligence",
    index: "01",
    title: "Contract Intelligence",
    type: "Professional Work · Samvid",
    summary:
      "Turning unstructured contracts into structured information for search, review, and renewal workflows.",
    highlights: [
      "Extracts contract information into structured storage.",
      "Matches entities to reduce duplicate party records.",
      "Processes the work asynchronously, in an interface for business users.",
    ],
    tags: ["TypeScript", "SQL", "PostgreSQL", "AWS", "LLMs", "Embeddings"],
    emphasis: "lead",
    visual: "contract",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Contract Intelligence turns unstructured contracts into structured information for search, review, and renewal workflows.",
          "The work covers extraction into structured storage, entity matching so the same party is less likely to be stored twice, and an interface for the people reviewing the result. Processing runs asynchronously.",
        ],
      },
      {
        heading: "My Contribution",
        paragraphs: [
          "I contributed as a Business Intelligence Analyst at Samvid. My work involved TypeScript, SQL, PostgreSQL, and AWS, and the applied integration of LLMs and embeddings.",
          "This was not a solo build, and it is not an open-source project.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [],
        points: [
          "Extract contract information and keep it in structured storage.",
          "Match entities to reduce duplicate party records.",
          "Process the work asynchronously and present it for business users.",
        ],
      },
    ],
  },
  {
    id: "samvid-admin-portal",
    index: "02",
    title: "Samvid Admin Portal",
    type: "Internal Platform · Samvid",
    summary:
      "Bringing service health, logs, alerts, and operational analytics into one interface.",
    highlights: [
      "Brings service status and logs into one view.",
      "Surfaces alerts and performance monitoring.",
      "Turns scattered system information into an interface people can act on.",
    ],
    tags: ["Next.js", "TypeScript", "AWS CloudWatch", "PostgreSQL"],
    emphasis: "second",
    visual: "admin",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Samvid Admin Portal brings service health, logs, alerts, and operational analytics into one interface.",
          "Information that lived across systems is organized so it can be reviewed and acted on in one place.",
        ],
      },
      {
        heading: "My Contribution",
        paragraphs: [
          "I worked on this internal platform at Samvid with Next.js, TypeScript, AWS CloudWatch, and PostgreSQL.",
          "It is an internal tool, not an open-source project.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [],
        points: [
          "Bring service status and logs into one view.",
          "Surface alerts and performance monitoring.",
          "Organize operational information into an interface people can act on.",
        ],
      },
    ],
  },
  {
    id: "esg-research-assistant",
    index: "03",
    title: "ESG Research Assistant",
    type: "Graduate Practicum · Armanino",
    summary:
      "Exploring retrieval-augmented generation for questions about sustainability reporting.",
    highlights: [
      "A graduate team project, not a solo product build.",
      "Compares a direct model answer with a path that retrieves context first.",
      "Uses ESG reports and test questions to examine retrieval and answers.",
    ],
    tags: ["Python", "Retrieval-augmented generation"],
    emphasis: "support",
    visual: "esg",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "ESG Research Assistant was a graduate practicum with Armanino. The team explored retrieval-augmented generation for questions about sustainability reporting.",
          "The same kind of question is asked on two paths. A baseline path sends it to a model. A RAG path retrieves context before the model answers.",
        ],
      },
      {
        heading: "My Contribution",
        paragraphs: [
          "I contributed as part of the graduate team. Python was used for this project. It is not the main language of my work at Samvid.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "ESG reports and test questions were used to look at retrieval and answer quality. This page does not report scores or other evaluation metrics.",
        ],
        points: [
          "Baseline: Question → LLM → Answer.",
          "RAG: Question → Retrieve context → LLM → Answer.",
        ],
      },
    ],
  },
]

export const about = {
  paragraphs: [
    "I work as a Business Intelligence Analyst at Samvid Inc. The day-to-day work uses TypeScript, SQL, PostgreSQL, and AWS.",
    "I studied Business Analytics at Santa Clara University, after a bachelor’s background in Business Intelligence and Data Analytics at the University of Macau.",
    "Python is the language I use for analysis and for graduate projects. It is not the main language of my work at Samvid.",
  ],
  roles: [
    "Business Intelligence Analyst, Samvid Inc.",
    "Business Analytics, Santa Clara University",
    "Business Intelligence and Data Analytics, University of Macau",
  ],
  skills: [
    {
      title: "Data & Analytics",
      text: "SQL and PostgreSQL, used to structure information and answer business questions.",
    },
    {
      title: "Application Development",
      text: "TypeScript products and interfaces, including Next.js on the internal admin portal.",
    },
    {
      title: "Cloud & Applied AI",
      text: "AWS and CloudWatch, plus applied integration of LLMs and embeddings. Python for analysis and graduate work.",
    },
  ],
}

export const contact = {
  heading: "Let’s build something useful.",
}

export function visibleContactLinks(): Array<{ href: string; label: string }> {
  const links: Array<{ href: string; label: string }> = []
  if (contactLinks.github) links.push({ href: contactLinks.github, label: "GitHub" })
  if (contactLinks.linkedin) links.push({ href: contactLinks.linkedin, label: "LinkedIn" })
  if (contactLinks.email) links.push({ href: `mailto:${contactLinks.email}`, label: "Email" })
  if (contactLinks.resume) links.push({ href: contactLinks.resume, label: "Resume" })
  return links
}
