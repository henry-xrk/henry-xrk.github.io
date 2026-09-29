import { useEffect, useRef, useState } from "react"
import type { ProjectVisual } from "../data/portfolio"
import { zoneRates } from "../data/showdown"
import { cx } from "../lib/cx"

const pipeline: Array<{ via?: string; label: string; detail: string }> = [
  { label: "Starter Lambda", detail: "Starts the batch when a document is added to a collection." },
  { via: "SQS", label: "Extract", detail: "Reads parties, dates, and clauses from the document." },
  { via: "SQS", label: "Match partners", detail: "Resolves party names to partner records, one batch at a time." },
  { via: "SQS", label: "Embed clauses", detail: "Builds clause vectors for search and matching." },
  { via: "SQS", label: "Clause library", detail: "Writes clause rows and links them back to their source." },
  { label: "PostgreSQL", detail: "Stores each stage’s status. The app reads that, not a running workflow." },
]

export function ContractPipeline() {
  return (
    <figure className="pipeline">
      <ol className="pipeline-steps">
        {pipeline.map((step) => (
          <li key={step.label}>
            {step.via ? <span className="pipeline-via">{step.via}</span> : <span className="pipeline-via is-empty" />}
            <div>
              <p className="pipeline-label">{step.label}</p>
              <p className="pipeline-detail">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <figcaption>
        SQS FIFO queues hand work from one stage to the next. Review and renewal states are separate, and no queue sits
        between them. An earlier version ran the batch in Step Functions, with SQS only on the partner and clause
        stages.
      </figcaption>
    </figure>
  )
}

export function ProjectSketch({ visual }: { visual: ProjectVisual }) {
  if (visual === "contract") return <ContractDemo />
  if (visual === "admin") return <AdminSketch />
  if (visual === "showdown") return <ShowdownBars />
  return <ImpactSketch />
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

const overviewTiers = [
  { label: "AI services", nodes: ["Document processing", "Model API"] },
  { label: "App", nodes: ["Review app"], hub: true },
  { label: "Data", nodes: ["Search index", "Logs"] },
]

function AdminSketch() {
  return (
    <figure className="sketch sketch-admin">
      <figcaption className="demo-flag">Illustrative interface</figcaption>
      <div className="admin-head">
        <p className="admin-title">Infrastructure overview</p>
        <p className="admin-env">Synthetic data</p>
      </div>
      <dl className="admin-stats">
        <div>
          <dt>Services</dt>
          <dd>5</dd>
        </div>
        <div>
          <dt>Up</dt>
          <dd>4</dd>
        </div>
        <div className="is-alert">
          <dt>Degraded</dt>
          <dd>1</dd>
        </div>
      </dl>
      <div className="admin-map">
        {overviewTiers.map((tier) => (
          <div key={tier.label} className={cx(tier.hub && "is-hub")}>
            <p>{tier.label}</p>
            {tier.nodes.map((node) => (
              <span key={node} className={cx(node === "Document processing" && "is-alert")}>
                {node}
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="alert-line">Active alert · Document processing is above its recent range</p>
    </figure>
  )
}

const impactSteps = [
  { label: "Upload deck", items: ["Business plan PDF"] },
  { label: "Extract fields", items: ["Mission", "Problem", "Company description"] },
  { label: "Score impact", items: ["Magnitude", "Effectiveness", "Efficiency"], note: "0–10 with rationale" },
  { label: "Search, ask, export", items: ["Semantic search", "Q&A", "CSV / ZIP"] },
]

function ImpactSketch() {
  return (
    <figure className="sketch sketch-impact">
      <figcaption className="demo-flag">Illustrative workflow</figcaption>
      <ol className="impact-steps">
        {impactSteps.map((step, index) => (
          <li key={step.label}>
            <span className="impact-index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="impact-label">{step.label}</p>
              <p className="impact-items">
                {step.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </p>
              {step.note ? <p className="impact-note">{step.note}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  )
}

const gap = zoneRates[0].rate - zoneRates[zoneRates.length - 1].rate

function ShowdownBars() {
  return (
    <figure className="sketch zone-chart">
      <p className="zone-title">Payment success rate by zone</p>
      <ol className="zone-bars">
        {zoneRates.map((row) => (
          <li key={row.zone} className={cx(row.compared && "is-compared")}>
            <span className="zone-name">{row.zone}</span>
            <span className="zone-value">{row.rate.toFixed(2)}%</span>
            <span className="zone-track" aria-hidden="true">
              <span className="zone-fill" style={{ width: `${row.rate}%` }} />
            </span>
          </li>
        ))}
      </ol>
      <div className="zone-scale" aria-hidden="true">
        {[0, 25, 50, 75, 100].map((tick) => (
          <span key={tick}>{tick}%</span>
        ))}
      </div>
      <p className="zone-gap">
        Observed gap between Sierra Nevada and Alta Guajira: about {gap.toFixed(1)} percentage points.
      </p>
      <figcaption className="zone-caption">Redrawn from the team’s Tableau presentation.</figcaption>
    </figure>
  )
}
