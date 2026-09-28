import type { ProjectVisual } from "../data/portfolio"

export function ProjectSketch({ visual }: { visual: ProjectVisual }) {
  if (visual === "contract") return <ContractSketch />
  if (visual === "admin") return <AdminSketch />
  return <EsgSketch />
}

function ContractSketch() {
  return (
    <figure className="sketch sketch-contract">
      <figcaption className="demo-flag">Illustrative demo</figcaption>
      <div className="contract-layout">
        <div className="paper" aria-hidden="true">
          <span className="paper-kicker">Agreement</span>
          <span className="paper-line w-92" />
          <span className="paper-line w-70" />
          <span className="paper-line w-84" />
          <span className="paper-line w-46" />
          <span className="paper-scribble" />
          <span className="paper-line w-78" />
          <span className="paper-line w-58" />
        </div>
        <div className="field-sheet">
          <p className="field-kicker">Structured fields</p>
          <p className="field-row">
            <span>Counterparty</span>
            <strong>Example Partner</strong>
          </p>
          <p className="field-row">
            <span>End date</span>
            <strong>31 Mar 2028</strong>
          </p>
          <p className="field-row">
            <span>Renewal</span>
            <strong>Annual review</strong>
          </p>
        </div>
      </div>
    </figure>
  )
}

function AdminSketch() {
  return (
    <figure className="sketch sketch-admin">
      <figcaption className="demo-flag">Illustrative demo</figcaption>
      <div className="admin-layout">
        <ul className="admin-sources">
          <li>
            <span>Status</span>
            Document service is running
          </li>
          <li>
            <span>Logs</span>
            Nightly index finished
          </li>
          <li>
            <span>Alert</span>
            Queue waiting for review
          </li>
        </ul>
        <div className="admin-panel">
          <p className="admin-panel-kicker">One interface</p>
          <p>Status, logs, and alerts read together.</p>
          <ul>
            <li>Document service is running</li>
            <li>Nightly index finished</li>
            <li>Queue waiting for review</li>
          </ul>
        </div>
      </div>
    </figure>
  )
}

function EsgSketch() {
  return (
    <figure className="sketch sketch-esg">
      <figcaption className="demo-flag">Illustrative demo · no scores</figcaption>
      <p className="esg-question">How does the report describe emissions?</p>
      <div className="esg-paths">
        <div className="path-col">
          <p className="path-name">Baseline</p>
          <ol className="path-steps">
            <li>Question</li>
            <li>LLM</li>
            <li>Answer</li>
          </ol>
        </div>
        <div className="path-col is-rag">
          <p className="path-name">RAG</p>
          <ol className="path-steps">
            <li>Question</li>
            <li className="is-extra">Retrieve context</li>
            <li>LLM</li>
            <li>Answer</li>
          </ol>
        </div>
      </div>
    </figure>
  )
}
