import type { ProjectVisual } from "../data/portfolio"
import { useWorkflowPlayback } from "../hooks/useWorkflowPlayback"
import { cx } from "../lib/cx"

export function ProjectSketch({ visual }: { visual: ProjectVisual }) {
  if (visual === "contract") return <ContractSketch />
  if (visual === "admin") return <AdminSketch />
  return <EsgSketch />
}

function Replay({ onReplay, reduced }: { onReplay: () => void; reduced: boolean }) {
  if (reduced) return null
  return (
    <button type="button" className="replay" onClick={onReplay}>
      Replay
    </button>
  )
}

function ContractSketch() {
  const { ref, step, reduced, replay } = useWorkflowPlayback(4)
  return (
    <figure ref={ref} className={cx("sketch", "sketch-contract", `is-step-${step}`)} data-reduced={reduced || undefined}>
      <figcaption className="demo-flag">Illustrative demo</figcaption>
      <div className="contract-layout">
        <div className="paper" aria-hidden="true">
          <span className="paper-kicker">Agreement</span>
          <span className="paper-line w-92" />
          <span className="paper-line w-70" />
          <span className={cx("paper-clause", step >= 0 && "is-hot")}>Renewal follows the term end date.</span>
          <span className="paper-line w-78" />
          <span className="paper-line w-58" />
        </div>
        <div className="field-sheet">
          <p className="field-kicker">Structured fields</p>
          <p className={cx("field-row", step >= 1 && "is-on")}>
            <span>Counterparty</span>
            <strong>Example Partner</strong>
          </p>
          <p className={cx("field-row", step >= 1 && "is-on")}>
            <span>End date</span>
            <strong>31 Mar 2028</strong>
          </p>
          <p className={cx("field-row", step >= 1 && "is-on")}>
            <span>Renewal</span>
            <strong>Annual review</strong>
          </p>
          <p className={cx("match-note", step >= 2 && "is-on")}>Example Partner LLC matched to one record</p>
          <p className={cx("review-note", step >= 3 && "is-on")}>Ready for review</p>
        </div>
      </div>
      <Replay onReplay={replay} reduced={reduced} />
    </figure>
  )
}

function AdminSketch() {
  const { ref, step, reduced, replay } = useWorkflowPlayback(3)
  const degraded = step >= 1
  return (
    <figure ref={ref} className={cx("sketch", "sketch-admin", degraded && "is-degraded")} data-reduced={reduced || undefined}>
      <figcaption className="demo-flag">Illustrative demo</figcaption>
      <div className="admin-stage">
        <p className={cx("service-status", degraded && "is-alert")}>
          <span>{degraded ? "Degraded" : "Healthy"}</span>
          Document service
        </p>
        <p className={cx("alert-line", step >= 1 && "is-on")}>Alert · Response time is above the recent baseline</p>
        <p className={cx("log-line", step >= 2 && "is-on")}>Log · 14:06 Timeout while waiting on the index worker</p>
      </div>
      <Replay onReplay={replay} reduced={reduced} />
    </figure>
  )
}

function EsgSketch() {
  const { ref, step, reduced, replay } = useWorkflowPlayback(2)
  return (
    <figure ref={ref} className="sketch sketch-esg" data-reduced={reduced || undefined}>
      <figcaption className="demo-flag">Illustrative demo</figcaption>
      <p className="esg-question">How does the report describe emissions?</p>
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
            <li className={cx("is-extra", (reduced || step >= 1) && "is-lit")}>Retrieve context</li>
            <li>Model response</li>
          </ol>
        </div>
      </div>
      <Replay onReplay={replay} reduced={reduced} />
    </figure>
  )
}
