import { recognition } from "../data/portfolio"
import { ExternalLink } from "./CompanyLink"

export function Recognition() {
  return (
    <section className="recognition" aria-labelledby="recognition-title">
      <div className="wrap">
        <p className="eyebrow" id="recognition-title">
          Recognition
        </p>
        <ul className="recognition-list">
          {recognition.map((item) => (
            <li key={item.event}>
              <strong>{item.title}</strong>
              <span>{item.event}</span>
              <span className="recognition-year">{item.year}</span>
              {item.url ? <ExternalLink href={item.url} label={item.linkLabel ?? "Link"} /> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
