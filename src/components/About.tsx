import { motion } from "motion/react"
import { about, additionalWork, education } from "../data/portfolio"
import { useMediaQuery } from "../hooks/useMediaQuery"

const ease = [0.22, 1, 0.36, 1] as const

export function About() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)")

  return (
    <section id="about" className="about">
      <motion.div
        className="wrap"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: reduced ? 0 : 0.6, ease }}
      >
        <div className="about-grid">
          <div>
            <p className="eyebrow">About</p>
            <h2>{about.heading}</h2>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="education-list">
              {education.map((item) => (
                <li key={item.school}>
                  <span>{item.credential}</span>
                  <span>
                    {item.school} · {item.when}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="skill-list">
            {about.skills.map((skill) => (
              <article key={skill.title}>
                <h3>{skill.title}</h3>
                <p>{skill.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="additional">
          <h3>Additional work</h3>
          <ul>
            {additionalWork.map((item) => (
              <li key={item.title}>
                <p>
                  <strong>{item.title}</strong>
                  <span>{item.when}</span>
                </p>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
