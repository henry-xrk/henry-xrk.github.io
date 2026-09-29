import { useEffect, useRef, useState } from "react"
import type { MouseEvent, ReactNode } from "react"
import type { Chart } from "../data/showdown"

type Props = {
  title: string
  chart: Chart
  openLabel?: string
  children?: ReactNode
}

export function ChartFigure({ title, chart, openLabel = "View full chart", children }: Props) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const restoreFocus = useRef(false)

  useEffect(() => {
    if (open || !restoreFocus.current) return
    restoreFocus.current = false
    triggerRef.current?.focus({ preventScroll: true })
  }, [open])

  function close() {
    restoreFocus.current = true
    setOpen(false)
  }

  return (
    <figure className="chart-figure">
      <button
        ref={triggerRef}
        type="button"
        className="chart-open"
        onClick={() => setOpen(true)}
        aria-label={`${openLabel}: ${title}`}
      >
        <img src={chart.src} width={chart.width} height={chart.height} alt={chart.alt} loading="lazy" decoding="async" />
        <span className="chart-zoom" aria-hidden="true">
          {openLabel}
        </span>
      </button>
      <figcaption>
        <p className="chart-title">{title}</p>
        {children}
      </figcaption>
      {open ? <ChartLightbox title={title} chart={chart} onClose={close} /> : null}
    </figure>
  )
}

function ChartLightbox({ title, chart, onClose }: { title: string; chart: Chart; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (!dialog.open) dialog.showModal()
    closeRef.current?.focus()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    event.stopPropagation()
    if (event.target === event.currentTarget) onCloseRef.current()
  }

  return (
    <dialog
      ref={dialogRef}
      className="chart-lightbox"
      aria-label={title}
      onClick={onDialogClick}
      onCancel={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onCloseRef.current()
      }}
    >
      <div className="lightbox-top">
        <p className="chart-title">{title}</p>
        <button ref={closeRef} type="button" className="dialog-close" onClick={() => onCloseRef.current()}>
          Close
        </button>
      </div>
      <div className="lightbox-scroll">
        <img src={chart.src} width={chart.width} height={chart.height} alt={chart.alt} />
      </div>
    </dialog>
  )
}
