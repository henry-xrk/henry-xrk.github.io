import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { projects } from "../data/portfolio"
import type { Project } from "../data/portfolio"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { cx } from "../lib/cx"
import { CaseStudyDialog } from "./CaseStudyDialog"
import { CompanyLink, ExternalLink } from "./CompanyLink"
import { ProjectMetrics } from "./ProjectMetrics"
import { ProjectSketch } from "./sketches"

const ease = [0.22, 1, 0.36, 1] as const

export function ProjectShowcase() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)")
  const [activeId, setActiveId] = useState<string | null>(null)
  const triggers = useRef(new Map<string, HTMLButtonElement>())
  const pendingFocus = useRef<string | null>(null)
  const active = projects.find((project) => project.id === activeId) ?? null

  useEffect(() => {
    if (activeId !== null || !pendingFocus.current) return
    const id = pendingFocus.current
    pendingFocus.current = null
    triggers.current.get(id)?.focus({ preventScroll: true })
  }, [activeId])

  function close() {
    setActiveId((current) => {
      pendingFocus.current = current
      return null
    })
  }

  return (
    <section id="work" className="work">
      <div className="wrap">
        <header className="section-intro">
          <p className="eyebrow">Work</p>
          <h2>Selected projects</h2>
        </header>
        <div className="case-list">
          {projects.map((project, index) => (
            <CaseArticle
              key={project.id}
              project={project}
              flipped={project.emphasis !== "lead" && index % 2 === 1}
              reduced={reduced}
              onOpen={() => setActiveId(project.id)}
              setTrigger={(node) => {
                if (node) triggers.current.set(project.id, node)
                else triggers.current.delete(project.id)
              }}
            />
          ))}
        </div>
      </div>
      {active ? <CaseStudyDialog project={active} onClose={close} /> : null}
    </section>
  )
}

function CaseArticle({
  project,
  flipped,
  reduced,
  onOpen,
  setTrigger,
}: {
  project: Project
  flipped: boolean
  reduced: boolean
  onOpen: () => void
  setTrigger: (node: HTMLButtonElement | null) => void
}) {
  return (
    <motion.article
      className={cx("case", `case-${project.emphasis}`, flipped && "is-flipped")}
      initial={reduced ? false : { y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : 0.45, ease }}
    >
      <div className="case-visual">
        <ProjectSketch visual={project.visual} />
      </div>
      <div className="case-copy">
        <p className="case-index">{project.index}</p>
        <p className="case-type">{project.type}</p>
        <h3>{project.title}</h3>
        <p className="case-summary">{project.summary}</p>
        <p className="case-result">{project.result}</p>
        {project.metrics ? <ProjectMetrics metrics={project.metrics} /> : null}
        <ul className="highlights">
          {project.cardPoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul className="tags" aria-label="Tools">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="case-actions">
          <button type="button" className="text-button" onClick={onOpen} ref={setTrigger}>
            View Case Study
            <svg className="arrow" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          {project.companyUrl ? <CompanyLink href={project.companyUrl} /> : null}
          {project.repoUrl ? <ExternalLink href={project.repoUrl} label="GitHub" /> : null}
        </div>
      </div>
    </motion.article>
  )
}
