import { experience } from "../data/portfolio"

export function Experience() {
  return (
    <section className="experience" aria-labelledby="experience-title">
      <div className="wrap">
        <p className="eyebrow">Experience</p>
        <h2 id="experience-title">Where the work happened.</h2>
        <ol className="timeline">
          {experience.map((item) => (
            <li key={item.org}>
              <p className="timeline-when">{item.when}</p>
              <div>
                <p className="timeline-role">
                  {item.role}
                  <span> · {item.org}</span>
                </p>
                <p className="timeline-detail">
                  {item.place}. {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
