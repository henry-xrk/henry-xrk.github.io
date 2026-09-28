import { useEffect, useId, useRef } from "react"
import type { MouseEvent } from "react"
import type { Project } from "../data/portfolio"
import { charts } from "../data/showdown"
import { ChartFigure } from "./ChartFigure"
import { CompanyLink } from "./CompanyLink"
import { ProjectSketch } from "./sketches"

type Props = {
  project: Project
  onClose: () => void
}

export function CaseStudyDialog({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const titleId = useId()
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    let ignoreClose = false
    if (!dialog.open) dialog.showModal()
    dialog.scrollTop = 0
    headingRef.current?.focus({ preventScroll: true })
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleClose = () => {
      if (!ignoreClose) onCloseRef.current()
    }
    dialog.addEventListener("close", handleClose)

    return () => {
      ignoreClose = true
      dialog.removeEventListener("close", handleClose)
      if (dialog.open) dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [project.id])

  function requestClose() {
    onCloseRef.current()
  }

  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return
    const rect = event.currentTarget.getBoundingClientRect()
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    if (!inside) requestClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="case-dialog"
      aria-labelledby={titleId}
      onClick={onDialogClick}
      onCancel={(event) => {
        event.preventDefault()
        requestClose()
      }}
    >
      <div className="dialog-top">
        <div>
          <p className="case-type">{project.type}</p>
          <h2 id={titleId} ref={headingRef} tabIndex={-1}>
            {project.title}
          </h2>
          {project.companyUrl ? <CompanyLink href={project.companyUrl} /> : null}
        </div>
        <button type="button" className="dialog-close" onClick={requestClose}>
          Close
        </button>
      </div>

      <p className="dialog-overview">{project.overview}</p>

      <dl className="dialog-facts">
        <div>
          <dt>My role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Problem</dt>
          <dd>{project.problem}</dd>
        </div>
      </dl>

      <section className="dialog-section">
        <h3>My contribution</h3>
        <ul className="highlights">
          {project.contributions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="dialog-section">
        <h3>Outcome</h3>
        <p>{project.outcome}</p>
      </section>

      {project.findings ? (
        <section className="dialog-section">
          <h3>Team findings and recommendations</h3>
          <ol className="finding-list">
            {project.findings.map((item) => (
              <li key={item.id}>
                <ChartFigure title={item.title} chart={charts[item.chart]}>
                  {item.note ? <p className="chart-note">{item.note}</p> : null}
                </ChartFigure>
                <dl className="finding-text">
                  <div>
                    <dt>Finding</dt>
                    <dd>{item.finding}</dd>
                  </div>
                  <div>
                    <dt>Recommendation</dt>
                    <dd>{item.recommendation}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </section>
      ) : (
        <section className="dialog-section dialog-visual">
          <ProjectSketch visual={project.visual} />
        </section>
      )}

      <details className="dialog-details">
        <summary>Technical details</summary>
        <p>{project.technical}</p>
      </details>
    </dialog>
  )
}
