import { useEffect, useId, useRef } from "react"
import type { MouseEvent } from "react"
import type { Project } from "../data/portfolio"

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
    headingRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleClose = () => {
      if (!ignoreClose) onCloseRef.current()
    }
    dialog.addEventListener("close", handleClose)

    return () => {
      ignoreClose = true
      document.body.style.overflow = previousOverflow
      dialog.removeEventListener("close", handleClose)
    }
  }, [project.id])

  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    if (!inside) event.currentTarget.close()
  }

  return (
    <dialog ref={dialogRef} className="case-dialog" aria-labelledby={titleId} onClick={onDialogClick}>
      <div className="dialog-top">
        <div>
          <p className="case-type">{project.type}</p>
          <h2 id={titleId} ref={headingRef} tabIndex={-1}>
            {project.title}
          </h2>
        </div>
        <button type="button" className="dialog-close" onClick={() => dialogRef.current?.close()}>
          Close
        </button>
      </div>
      {project.sections.map((section) => {
        const hasPoints = (section.points?.length ?? 0) > 0
        if (section.paragraphs.length === 0 && !hasPoints) return null
        return (
          <section key={section.heading} className="dialog-section">
            <h3>{section.heading}</h3>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {hasPoints ? (
              <ul className="highlights">
                {section.points?.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
          </section>
        )
      })}
    </dialog>
  )
}
