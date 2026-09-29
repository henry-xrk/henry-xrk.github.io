import type { Project } from "../data/portfolio"

export function ProjectMetrics({ metrics }: { metrics: NonNullable<Project["metrics"]> }) {
  return (
    <dl className="case-metrics">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
        </div>
      ))}
    </dl>
  )
}
