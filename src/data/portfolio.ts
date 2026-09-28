import type { ChartId } from "./showdown"

export type ProjectVisual = "contract" | "admin" | "esg" | "showdown"

export type Finding = {
  id: string
  title: string
  chart: ChartId
  finding: string
  recommendation: string
  note?: string
}

export type Project = {
  id: string
  index: string
  title: string
  type: string
  companyUrl?: string
  problem: string
  outcome: string
  contributions: string[]
  tags: string[]
  emphasis: "lead" | "standard"
  visual: ProjectVisual
  overview: string
  role: string
  technical: string
  findings?: Finding[]
}

export const profile = {
  name: "Rongkai Xu",
  mark: "RX",
  eyebrow: "Data · Analytics Engineering · Applied AI",
  headline: "Connecting business questions, data workflows, and products people can use.",
  introduction:
    "I work where analysis and the software around it meet: SQL and PostgreSQL data work, TypeScript products, and applied AI. Recent projects cover contract intelligence, operational analytics, and retrieval-based research.",
  location: "San Francisco Bay Area",
}

export const contactLinks = {
  github: "https://github.com/henry-xrk",
  email: "rongkaixu918@gmail.com",
  linkedin: "https://www.linkedin.com/in/rongkai-henry-xu/",
  resume: "/Rongkai_Xu_Resume.pdf",
}

export const samvidUrl = "https://www.samvid.ai/"

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
    companyUrl: samvidUrl,
    problem: "Useful contract fields start inside documents, but review and renewal work needs structured, consistent records.",
    outcome: "Delivered a workflow for field extraction, partner matching, and review and renewal tracking.",
    contributions: [
      "Built the path from documents to structured contract and partner records.",
      "Connected those records to review, lifecycle, and partner views.",
      "Moved document processing into asynchronous cloud workflows so the interface stays responsive.",
    ],
    tags: ["TypeScript", "Next.js", "SQL", "PostgreSQL", "AWS"],
    emphasis: "lead",
    visual: "contract",
    overview:
      "A contract intelligence workflow that turns agreements into structured records for review, partner analysis, and renewal tracking.",
    role: "Individual contributor on Samvid’s product team.",
    technical:
      "TypeScript and Next.js for the review views, SQL and PostgreSQL for contract and partner records, and asynchronous document processing on AWS.",
  },
  {
    id: "scu-analytics-showdown",
    index: "02",
    title: "SCU Spring Analytics Showdown",
    type: "Team Analytics Competition · Santa Clara University",
    problem: "The team needed a clear view of payment delays, client engagement, and regional payment performance.",
    outcome: "Second Place, 2025. The team presented its findings and recommendations to faculty and industry judges.",
    contributions: [
      "Led a four-person team analyzing payment delays, client engagement, and regional performance.",
      "Contributed SQL analysis and reviewed Tableau findings across workstreams.",
      "Consolidated the team’s findings into recommendations presented to faculty and industry judges.",
    ],
    tags: ["SQL", "PostgreSQL", "Tableau"],
    emphasis: "standard",
    visual: "showdown",
    overview:
      "A team analytics competition at Santa Clara University, working from a client payments dataset in PostgreSQL and presenting the analysis in Tableau.",
    role: "Team lead on a four-person Santa Clara University competition team.",
    technical: "SQL and PostgreSQL for the analysis, and Tableau for the presented views.",
    findings: [
      {
        id: "regional",
        title: "Regional payment performance",
        chart: "zone",
        finding:
          "Payment success rates ranged from 72.3% in Alta Guajira to 81.0% in Sierra Nevada—an 8.8 percentage-point gap.",
        recommendation:
          "Prioritize operational support in the lower-performing region and investigate practices associated with stronger performance.",
        note: "The map marks Alta Guajira at an approximate regional location.",
      },
      {
        id: "engagement",
        title: "Client engagement",
        chart: "activation",
        finding:
          "39% of clients were classified as inactive in the analyzed dataset, indicating a segment worth investigating for potential disengagement.",
        recommendation: "Review activation history and payment records to prioritize follow-up.",
      },
      {
        id: "delays",
        title: "Payment delays",
        chart: "villages",
        finding: "Delayed-client counts were concentrated in a small number of villages.",
        recommendation:
          "Prioritize follow-up in high-volume locations and use delay-rate KPIs to compare performance relative to each location’s client base.",
        note: "The chart ranks villages by delayed-client counts, not by delay rate.",
      },
    ],
  },
  {
    id: "samvid-admin-portal",
    index: "03",
    title: "Samvid Admin Portal",
    type: "Internal Platform · Samvid",
    companyUrl: samvidUrl,
    problem: "The team needed a shared place to review service health and respond when behavior looked abnormal.",
    outcome: "Delivered an internal console for service status, investigation, and alert handling.",
    contributions: [
      "Built the service-health and alert views.",
      "Added alert history and a way to hold repeat notices.",
      "Surfaced unusual latency against recent service behavior.",
    ],
    tags: ["TypeScript", "Next.js", "PostgreSQL", "AWS", "CloudWatch"],
    emphasis: "standard",
    visual: "admin",
    overview: "An internal operations console that brings service health, investigation, and alerts into one place.",
    role: "Individual contributor on Samvid’s product team.",
    technical: "A Next.js console backed by PostgreSQL, reading AWS service metrics and logs.",
  },
  {
    id: "esg-research-assistant",
    index: "04",
    title: "ESG Research Assistant",
    type: "Graduate Practicum · Armanino",
    problem:
      "Comparing sustainability reports depends on finding the relevant passages and keeping each answer tied to its source.",
    outcome: "The practicum team delivered a retrieval-based research workflow and evaluation findings for the sponsor.",
    contributions: [
      "Led technical implementation on a four-person graduate practicum team.",
      "Built ingestion, semantic retrieval, and cross-report synthesis in Python.",
      "Compared a retrieval-augmented workflow with a non-RAG baseline using sponsor-provided questions.",
    ],
    tags: ["Python", "OpenAI", "Pinecone", "RAG", "Streamlit"],
    emphasis: "standard",
    visual: "esg",
    overview:
      "A graduate practicum for Armanino exploring source-grounded answers across automotive sustainability reports.",
    role: "Technical lead on a four-person graduate practicum team.",
    technical:
      "Python and Streamlit, with OpenAI embeddings and models and Pinecone retrieval over the reports; answers are organized by source document.",
  },
]

export const recognition = [
  { title: "Second Place", event: "SCU Spring Analytics Showdown", year: "2025" },
  {
    title: "Judge",
    event: "Bay Area Data Science Competition",
    year: "2026",
    url: "https://www.linkedin.com/posts/we-just-wrapped-up-our-first-ever-av-data-ugcPost-7448433684770095104-aV1O/",
    linkLabel: "Event post",
  },
]

export const experience = [
  {
    org: "Samvid Inc.",
    role: "Business Intelligence Analyst",
    when: "July 2025–Present",
    place: "Pleasanton, California",
    detail: "Contract intelligence workflows and internal operational tools.",
    url: samvidUrl,
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
    when: "School project · 2025",
    url: "https://github.com/henry-xrk/ISBA2411_NLP_Final_Project",
    linkLabel: "GitHub",
    detail:
      "Built a multi-document application comparing sustainability reports with ISSB and SASB standards through semantic retrieval, cross-document synthesis, contradiction analysis, and exportable reports.",
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
    "At Samvid, I build contract intelligence workflows and internal tools using TypeScript, Next.js, SQL, PostgreSQL, and AWS. The work spans document processing, partner matching, lifecycle analytics, and service monitoring.",
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
