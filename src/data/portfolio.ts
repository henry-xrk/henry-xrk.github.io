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
    "I’m Rongkai, a Business Intelligence Analyst building data workflows, AI-powered applications, and tools that help people work with complex information. My work spans contract intelligence, operational analytics, and retrieval-based research.",
  location: "San Francisco Bay Area",
}

export const contactLinks = {
  github: "https://github.com/henry-xrk",
  email: "rongkaixu918@gmail.com",
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
    type: "Professional work · Samvid",
    summary:
      "Turning unstructured contracts into connected data for review, partner analysis, and renewal tracking.",
    highlights: [
      "Built structured extraction and hybrid entity matching for contract and partner records.",
      "Moved processing into asynchronous AWS workflows and added reprocessing capabilities.",
      "Developed lifecycle views, filters, and partner dashboards around the resulting data.",
    ],
    tags: ["TypeScript", "Next.js", "PostgreSQL", "AWS Lambda", "Step Functions", "Redis", "LLMs", "Embeddings"],
    emphasis: "lead",
    visual: "contract",
    sections: [
      {
        heading: "Problem",
        paragraphs: [
          "Contract data needs to support search, review, and renewal decisions, but the useful fields begin inside documents. Variations in partner names and incomplete dates make consistent reporting harder.",
          "Processing also needs to continue without blocking the web interface.",
        ],
      },
      {
        heading: "My Contribution",
        paragraphs: [
          "I built and iterated on the extraction workflow, partner matching, persistence layer, and the interfaces used to review the results.",
          "My work connected backend processing with Contract Intelligence, Partner 360, and renewal views.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "Extraction moved from an in-process flow into asynchronous Lambda execution, and later into Step Functions batch orchestration. The path is document ingestion, asynchronous orchestration, extraction and matching, PostgreSQL, then review and analytics.",
          "For partner identity, I implemented hybrid embedding and trigram matching with a fallback path, and used distributed locking to reduce duplicate creation during concurrent processing. Organization-scoped data access kept queries tied to the appropriate workspace.",
        ],
        points: [
          "Developed lifecycle filters, pagination, renewal tracking, and handling for incomplete document dates.",
          "Added reprocessing and clause-library rebuilding so downstream information can refresh without repeating the entire document workflow.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The work connected document extraction with structured contract and partner records, giving business users a consistent interface for review, lifecycle tracking, and follow-up.",
        ],
      },
    ],
  },
  {
    id: "samvid-admin-portal",
    index: "02",
    title: "Samvid Admin Portal",
    type: "Internal platform",
    summary:
      "An internal operations console bringing service health, logs, performance signals, and alerts into one place.",
    highlights: [
      "Built service-health views, a topology overview, and CloudWatch log access.",
      "Developed email and SMS alerting with history, routing, snooze, and deduplication.",
      "Implemented adaptive Lambda performance baselines and operational analytics.",
    ],
    tags: ["Next.js", "TypeScript", "AWS CloudWatch", "PostgreSQL", "Redis", "Docker"],
    emphasis: "second",
    visual: "admin",
    sections: [
      {
        heading: "Problem",
        paragraphs: [
          "Operating an AI application involves multiple services, logs, and performance signals. The team needed a shared view of system health and a practical way to investigate slow or failing components.",
        ],
      },
      {
        heading: "My Contribution",
        paragraphs: [
          "I developed the dashboard from an early tools interface into an internal monitoring and operations console.",
          "My work included health pages, the service topology, log access, alerting, performance baselines, and analytics.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "I brought CloudWatch logs and Lambda metrics into service-specific views and connected them to a topology overview. Redis caching reduced repeated health and log lookups.",
          "I added email and SMS notifications, then developed alert history, snooze, routing, and deduplication so alerts are easier to use day to day. Lambda baselines use historical CloudWatch data instead of relying only on fixed duration thresholds.",
        ],
        points: [
          "Worked on access controls, rate limiting, input handling, and anonymized chat-history views for operational investigation.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The portal brought monitoring and investigation into a shared internal interface, helping the team review health, inspect logs, and respond to abnormal service behavior.",
        ],
      },
    ],
  },
  {
    id: "esg-research-assistant",
    index: "03",
    title: "ESG Research Assistant",
    type: "Graduate practicum · Armanino",
    summary:
      "A graduate team project exploring source-grounded answers across corporate sustainability reports.",
    highlights: [
      "Developed ingestion, retrieval, and synthesis workflows for multi-report research.",
      "Compared retrieval-augmented generation with a non-RAG baseline.",
      "Evaluated answers using sponsor-provided questions and traceable source references.",
    ],
    tags: ["Python", "OpenAI", "Pinecone", "RAG"],
    emphasis: "support",
    visual: "esg",
    sections: [
      {
        heading: "Problem",
        paragraphs: [
          "Sustainability research requires finding and comparing information across lengthy reports. An answer is more useful when a reviewer can trace it to the supporting passage and understand differences between reports.",
        ],
      },
      {
        heading: "My Contribution",
        paragraphs: [
          "As part of a four-person graduate practicum team, I led technical implementation of the AI-assisted research workflow.",
          "I worked on ingestion, retrieval, synthesis, and evaluation using Python, OpenAI, and Pinecone.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We used automotive ESG reports and sponsor-provided questions to compare a retrieval-augmented workflow with a non-RAG baseline.",
          "The retrieval workflow supplied relevant report context to the model and supported answers with source references. Evaluation examined the answers and cross-report inconsistencies.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The team delivered a repeatable research workflow and evaluation findings for the sponsor, connecting multi-document retrieval with answers that could be reviewed against their sources.",
        ],
      },
    ],
  },
]

export const experience = [
  {
    org: "Samvid Inc.",
    role: "Business Intelligence Analyst",
    when: "July 2025–Present",
    place: "Pleasanton, California",
    detail: "Contract intelligence workflows and internal operational tools.",
  },
  {
    org: "Armanino LLP",
    role: "Applied AI Engineer, graduate practicum",
    when: "February–June 2025",
    place: "Practicum",
    detail: "Technical implementation of a research workflow for sustainability reports.",
  },
  {
    org: "MGM Macau",
    role: "Digital and Technology Solutions Intern",
    when: "July–August 2024",
    place: "Macau",
    detail: "Supported operational systems and Power BI reporting, and handled service incidents and requests.",
  },
]

export const education = [
  {
    school: "Santa Clara University",
    credential: "M.S. in Business Analytics",
    when: "September 2024–December 2025",
  },
  {
    school: "University of Macau",
    credential: "B.S. in Business Intelligence and Data Analytics",
    when: "August 2020–June 2024",
  },
]

export const additionalWork = [
  {
    title: "Impact Analysis Tool",
    when: "2025",
    detail:
      "Built a multi-document application comparing sustainability reports with ISSB and SASB standards through semantic retrieval, cross-document synthesis, contradiction analysis, and exportable reports.",
    tags: ["Python", "PostgreSQL", "pgvector", "LLMs", "Streamlit", "Docker"],
  },
  {
    title: "SCU Spring Analytics Showdown",
    when: "Second place, 2025",
    detail:
      "Led a four-person team analyzing PostgreSQL data and presenting Tableau findings on payment delays, client disengagement, and regional performance.",
  },
  {
    title: "Bay Area Data Science Competition",
    when: "Judge, 2026",
    detail:
      "Evaluated finalist projects on problem definition, data use, analysis, interpretation, and proposed solutions, and contributed technical questions and award selection.",
  },
  {
    title: "U.S. Candy Distribution Dashboard",
    when: "2025",
    detail: "Built a Tableau dashboard exploring sales, profitability, regional patterns, and seasonal effects.",
  },
]

export const about = {
  heading: "Business questions, answered with data and software.",
  paragraphs: [
    "I connect business questions with the data and software needed to answer them. At Samvid, I build contract intelligence workflows and internal tools using TypeScript, SQL, PostgreSQL, and AWS. My work includes document processing, entity matching, lifecycle analytics, and service monitoring.",
    "I earned an M.S. in Business Analytics from Santa Clara University and a B.S. in Business Intelligence and Data Analytics from the University of Macau. My graduate work used Python and retrieval-augmented generation to explore questions across sustainability reports.",
  ],
  skills: [
    {
      title: "Data and analytics",
      text: "SQL, PostgreSQL, Python, Tableau, and Power BI for modeling, validation, lifecycle metrics, and visualization.",
    },
    {
      title: "Applications and workflows",
      text: "TypeScript, JavaScript, Next.js, REST APIs, and business interfaces around the data.",
    },
    {
      title: "Cloud and operations",
      text: "AWS Lambda, Step Functions, CloudWatch, Redis, and Docker.",
    },
    {
      title: "Applied AI",
      text: "LLM APIs, embeddings, entity resolution, semantic search, retrieval-augmented generation, and evaluation.",
    },
  ],
}

export const contact = {
  heading: "Let’s build something useful.",
  lede: "I’m interested in opportunities where data, analytics, and applied AI meet real business needs.",
}

export function visibleContactLinks(): Array<{ href: string; label: string }> {
  const links: Array<{ href: string; label: string }> = []
  if (contactLinks.github) links.push({ href: contactLinks.github, label: "GitHub" })
  if (contactLinks.linkedin) links.push({ href: contactLinks.linkedin, label: "LinkedIn" })
  if (contactLinks.email) links.push({ href: `mailto:${contactLinks.email}`, label: "Email" })
  if (contactLinks.resume) links.push({ href: contactLinks.resume, label: "Resume" })
  return links
}
