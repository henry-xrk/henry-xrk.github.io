import profilePhoto from "../assets/about/rongkai-xu.jpg"
import impactAgent from "../assets/impact/impact-agent.jpg"
import impactDashboard from "../assets/impact/impact-dashboard.jpg"
import impactExtraction from "../assets/impact/impact-extraction.jpg"
import type { Chart, ChartId } from "./showdown"

export type ProjectVisual = "contract" | "admin" | "impact" | "showdown"

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
  repoUrl?: string
  summary: string
  result: string
  metrics?: Array<{ value: string; label: string }>
  cardPoints: string[]
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
  screens?: Array<{ title: string; note?: string; chart: Chart }>
}

export const profile = {
  name: "Rongkai Xu",
  mark: "RX",
  eyebrow: "Data · Analytics Engineering · Applied AI",
  headline: "Turning complex data into useful products.",
  introduction:
    "I work between business analysis and data products: framing the question, shaping the data, and building the views people use to decide. Recent work spans contract intelligence, operational monitoring, and competition analytics.",
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
    summary: "Turns contract documents into structured records for review, partner analysis, and renewal tracking.",
    result: "Delivered an end-to-end workflow: field extraction, partner matching, and renewal views.",
    metrics: [
      { value: "1,000+", label: "agreements" },
      { value: "Under 3 min", label: "extraction time, down from about 30 minutes" },
    ],
    cardPoints: [
      "Built the path from documents to structured contract and partner records.",
      "Moved document processing to asynchronous cloud jobs so review stays responsive.",
    ],
    problem: "Useful contract fields start inside documents, but review and renewal work needs structured, consistent records.",
    outcome: "Delivered a workflow for field extraction, partner matching, and review and renewal tracking.",
    contributions: [
      "Built the path from documents to structured contract and partner records.",
      "Connected those records to review, lifecycle, and partner views.",
      "Moved document processing into asynchronous cloud workflows so the interface stays responsive.",
    ],
    tags: ["TypeScript", "Next.js", "PostgreSQL", "AWS"],
    emphasis: "lead",
    visual: "contract",
    overview:
      "A contract intelligence workflow that turns agreements into structured records for review, partner analysis, and renewal tracking.",
    role: "Individual contributor on Samvid’s product team.",
    technical:
      "TypeScript and Next.js for the review views, and PostgreSQL for contract and partner records. Processing is queue-driven: a starter Lambda enqueues the batch, and an SQS FIFO queue sits between extraction, partner matching, clause embeddings, and the clause library. Each stage writes its status back to PostgreSQL. Step Functions was the earlier batch orchestrator, with SQS only on the partner and clause stages.",
  },
  {
    id: "scu-analytics-showdown",
    index: "02",
    title: "SCU Spring Analytics Showdown",
    type: "Team Analytics Competition · Santa Clara University",
    summary:
      "Analyzed a client payments dataset to explain payment delays, client engagement, and regional performance.",
    result: "Second Place, 2025. Presented to faculty and industry judges.",
    cardPoints: [
      "Led a four-person team and contributed SQL analysis in PostgreSQL.",
      "Consolidated the team’s Tableau findings into recommendations.",
    ],
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
          "Observed payment success rates ranged from 72.25% in Alta Guajira to 81.03% in Sierra Nevada, a gap of about 8.8 percentage points.",
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
    id: "impact-analysis-tool",
    index: "03",
    title: "Impact Analysis Tool",
    type: "Course Final Project · Santa Clara University",
    repoUrl: "https://github.com/henry-xrk/ISBA2411_NLP_Final_Project",
    summary:
      "Reads social-enterprise business plan decks and organizes each venture’s mission, problem, and potential impact for side-by-side review.",
    result: "Working prototype: upload decks, extract key fields, score impact on three dimensions, then search, ask, and export.",
    cardPoints: [
      "Set up the codebase and PostgreSQL document store, and built the LLM field-extraction pipeline.",
      "Connected impact scores to semantic search and Q&A, and integrated teammates’ contributions.",
    ],
    problem: "Reviewing many pitch decks by hand makes it hard to compare missions, problems, and likely impact consistently.",
    outcome:
      "A local prototype connecting document extraction, impact scoring, semantic search, and Q&A, with CSV and ZIP export.",
    contributions: [
      "Set up the initial project structure, the PostgreSQL documents table, and its database migrations.",
      "Integrated LLM extraction of mission, problem, and company description into the processing pipeline.",
      "Brought impact scores into semantic search results and Q&A context, and fixed citation indexing in retrieval.",
      "Added structured logging and error handling, and integrated teammates’ scoring, extraction, and interface work.",
    ],
    tags: ["Python", "Streamlit", "OpenAI", "PostgreSQL", "pgvector"],
    emphasis: "standard",
    visual: "impact",
    screens: [
      {
        title: "Dashboard",
        note: "Scores come from the tool’s own rubric prompts on sample decks. They were not independently validated.",
        chart: {
          src: impactDashboard,
          width: 1600,
          height: 833,
          alt: "Impact Analysis Tool dashboard with a search box and a table of three uploaded decks, each with overall, magnitude, effectiveness, and efficiency scores.",
        },
      },
      {
        title: "Extracted fields for one deck",
        chart: {
          src: impactExtraction,
          width: 1600,
          height: 974,
          alt: "Document view for one pitch deck showing its overall score and extracted company description, mission statement, and problem statement.",
        },
      },
      {
        title: "Analysis Agent",
        note: "Questions run across the indexed decks, with semantic search turned on.",
        chart: {
          src: impactAgent,
          width: 1600,
          height: 870,
          alt: "Analysis Agent screen with document and model selectors, a semantic search toggle, and quick prompt buttons for asking questions across decks.",
        },
      },
    ],
    overview:
      "A course final project prototyping a tool that reads social-enterprise pitch decks and organizes what each venture does, the problem it addresses, and how its impact could be assessed.",
    role: "One of four students on a course team. I set up the repository and core pipeline; teammates led the scoring rubrics, vector indexing, and parts of the interface.",
    technical:
      "Python and Streamlit. OpenAI models handle field extraction and rubric-based scoring, and text-embedding-3-large (1,024 dimensions) powers semantic search over PostgreSQL 16 with pgvector, run locally with Docker Compose.",
  },
  {
    id: "samvid-admin-portal",
    index: "04",
    title: "Samvid Admin Portal",
    type: "Internal Platform · Samvid",
    companyUrl: samvidUrl,
    summary: "An internal console for checking service health and responding when behavior looks abnormal.",
    result: "Built and shipped an internal operations dashboard for service health, CloudWatch logs, and alert management.",
    cardPoints: [
      "Built the service-health and alert views, with latency compared against recent behavior.",
      "Added alert history and controls to pause repeated notifications.",
    ],
    problem: "The team needed a shared place to review service health and respond when behavior looked abnormal.",
    outcome:
      "Shipped as an internal production system that brings service status, CloudWatch logs, investigation, and alert handling into one interface.",
    contributions: [
      "Built the service-health views and CloudWatch log access.",
      "Added alert history and controls to pause repeated notifications.",
      "Surfaced unusual latency against recent service behavior.",
    ],
    tags: ["TypeScript", "Next.js", "PostgreSQL", "AWS", "CloudWatch"],
    emphasis: "standard",
    visual: "admin",
    overview: "An internal operations console that brings service health, investigation, and alerts into one place.",
    role: "Individual contributor on Samvid’s product team.",
    technical:
      "A Next.js console backed by PostgreSQL. The overview groups services into tiers around the app and reads health, logs, and alerts for each one. Names and counts in the graphic are synthetic.",
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
    detail:
      "Led technical implementation for a four-person practicum team building a source-grounded research workflow over sustainability reports.",
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

export const additionalWork: Array<{ title: string; when: string; detail: string; url?: string; linkLabel?: string }> = [
  {
    title: "U.S. Candy Distribution Dashboard",
    when: "2025",
    detail: "Built a Tableau dashboard exploring sales, profitability, regional patterns, and seasonal effects.",
  },
]

export const about: {
  heading: string
  photo?: { src: string; width: number; height: number; alt: string }
  paragraphs: string[]
  skills: Array<{ title: string; text: string }>
} = {
  heading: "Business questions, answered with data and software.",
  photo: { src: profilePhoto, width: 558, height: 620, alt: "Portrait of Rongkai Xu" },
  paragraphs: [
    "At Samvid, I build contract intelligence workflows and internal tools that turn documents and service data into views teams can act on.",
    "I like work that starts with a business question and ends with something people use: a clean dataset, a clear analysis, or a small product around it.",
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
      text: "AWS Lambda, Step Functions, SQS, CloudWatch, Redis, and Docker.",
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
