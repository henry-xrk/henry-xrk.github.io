import { useEffect, useRef, useState } from "react"
import type { ProjectVisual } from "../data/portfolio"
import { charts, zonePreview } from "../data/showdown"
import { cx } from "../lib/cx"
import { ChartFigure } from "./ChartFigure"

export function ProjectSketch({ visual }: { visual: ProjectVisual }) {
  if (visual === "contract") return <ContractDemo />
  if (visual === "admin") return <AdminSketch />
  if (visual === "showdown") return <ShowdownPreview />
  return <EsgSketch />
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const dayMs = 86_400_000
const simulatedToday = { year: 2027, month: 3, day: 1 }

function utc(date: { year: number; month: number; day: number }) {
  return Date.UTC(date.year, date.month - 1, date.day)
}

function formatDate(date: { year: number; month: number; day: number }) {
  return `${date.day} ${months[date.month - 1]} ${date.year}`
}

const renewals = [
  { id: "supply", partner: "Northwind Supply", contract: "Supply agreement", renews: { year: 2027, month: 4, day: 15 } },
  { id: "license", partner: "Larkspur Analytics", contract: "Data license", renews: { year: 2027, month: 5, day: 20 } },
  { id: "addendum", partner: "Northwind Supply", contract: "Services addendum", renews: { year: 2027, month: 11, day: 30 } },
].map((row) => ({ ...row, days: Math.round((utc(row.renews) - utc(simulatedToday)) / dayMs) }))

const steps = ["Extract fields", "Match partner", "Open renewal view"] as const

function ContractDemo() {
  const [step, setStep] = useState(0)
  const [dueOnly, setDueOnly] = useState(false)
  const filterRef = useRef<HTMLButtonElement>(null)
  const rows = dueOnly ? renewals.filter((row) => row.days >= 0 && row.days <= 90) : renewals
  const extracted = step >= 1

  useEffect(() => {
    if (step === 3) filterRef.current?.focus({ preventScroll: true })
  }, [step])

  function reset() {
    setStep(0)
    setDueOnly(false)
  }

  return (
    <figure className="sketch sketch-contract">
      <figcaption className="demo-flag">Illustrative demo · Synthetic data</figcaption>
      <ol className="demo-steps">
        {steps.map((label, index) => (
          <li key={label} className={cx(step > index && "is-done", step === index && "is-current")}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {label}
          </li>
        ))}
      </ol>

      <div className="contract-layout">
        <div className="paper">
          <span className="paper-kicker">Supply agreement</span>
          <p className="paper-text">
            Between the Customer and <mark className={cx(extracted && "is-on")}>Northwind Supply LLC</mark>.
          </p>
          <p className="paper-text">
            The term runs three years and ends on <mark className={cx(extracted && "is-on")}>15 April 2027</mark>.
          </p>
          <p className="paper-text">
            It <mark className={cx(extracted && "is-on")}>renews for one-year terms</mark> unless either party gives 60
            days’ notice.
          </p>
        </div>
        <div className="field-sheet" aria-live="polite">
          <p className="field-kicker">Structured fields</p>
          <FieldRow label="Counterparty" value={extracted ? "Northwind Supply LLC" : null} />
          <FieldRow label="End date" value={extracted ? "15 Apr 2027" : null} />
          <FieldRow label="Renewal" value={extracted ? "Annual, 60-day notice" : null} />
          {step >= 2 ? (
            <div className="match-block">
              <p className="field-kicker">Partner match</p>
              <p className="match-sources">
                <span>Northwind Supply LLC</span>
                <span>NorthWind Supply, Inc.</span>
              </p>
              <p className="match-result">
                One partner: <strong>Northwind Supply</strong> · 2 contracts
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {step === 3 ? (
        <div className="renewal-view">
          <div className="renewal-head">
            <p className="field-kicker">Renewals · simulated date {formatDate(simulatedToday)}</p>
            <div className="segmented" role="group" aria-label="Renewal filter">
              <button ref={filterRef} type="button" aria-pressed={!dueOnly} onClick={() => setDueOnly(false)}>
                All
              </button>
              <button type="button" aria-pressed={dueOnly} onClick={() => setDueOnly(true)}>
                Due within 90 days
              </button>
            </div>
          </div>
          <ul className="renewal-list" aria-live="polite">
            {rows.map((row) => (
              <li key={row.id}>
                <span>
                  <strong>{row.partner}</strong>
                  {row.contract}
                </span>
                <span className="renewal-date">
                  {formatDate(row.renews)}
                  <em>in {row.days} days</em>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="demo-controls">
        {step < 3 ? (
          <button type="button" className="button button-primary" onClick={() => setStep((value) => value + 1)}>
            {steps[step]}
          </button>
        ) : null}
        <button type="button" className="button" onClick={reset} disabled={step === 0}>
          Reset
        </button>
      </div>
    </figure>
  )
}

function FieldRow({ label, value }: { label: string; value: string | null }) {
  return (
    <p className={cx("field-row", value && "is-on")}>
      <span>{label}</span>
      <strong>{value ?? "Not extracted yet"}</strong>
    </p>
  )
}

const services = [
  { name: "Document index", status: "Elevated latency", alert: true },
  { name: "Review API", status: "Healthy", alert: false },
  { name: "Search worker", status: "Healthy", alert: false },
]

function AdminSketch() {
  return (
    <figure className="sketch sketch-admin">
      <figcaption className="demo-flag">Illustrative demo · Synthetic data</figcaption>
      <ul className="service-list">
        {services.map((service) => (
          <li key={service.name} className={cx(service.alert && "is-alert")}>
            <span>{service.name}</span>
            <strong>{service.status}</strong>
          </li>
        ))}
      </ul>
      <p className="alert-line">Alert · Document index response time is above its recent range</p>
    </figure>
  )
}

function EsgSketch() {
  return (
    <figure className="sketch sketch-esg">
      <figcaption className="demo-flag">Illustrative demo</figcaption>
      <p className="esg-question">How does each report describe emissions targets?</p>
      <div className="esg-paths">
        <div className="path-col">
          <p className="path-name">Baseline workflow</p>
          <ol className="path-steps">
            <li>Question</li>
            <li>Model response</li>
          </ol>
        </div>
        <div className="path-col is-rag">
          <p className="path-name">Retrieval-augmented workflow</p>
          <ol className="path-steps">
            <li>Question</li>
            <li className="is-extra">Retrieve report passages</li>
            <li>Response organized by source</li>
          </ol>
        </div>
      </div>
    </figure>
  )
}

function ShowdownPreview() {
  return (
    <ChartFigure title="Regional payment performance" chart={zonePreview} full={charts.zone} crop>
      <p>Payment success ranged from 72.3% in Alta Guajira to 81.0% in Sierra Nevada—an 8.8 percentage-point gap.</p>
    </ChartFigure>
  )
}
