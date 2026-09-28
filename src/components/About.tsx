import { motion } from "motion/react"
import { about } from "../data/portfolio"
import { useMediaQuery } from "../hooks/useMediaQuery"

const ease = [0.22, 1, 0.36, 1] as const

export function About() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)")

  return (
    <section id="about" className="about">
      <motion.div
        className="wrap about-grid"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: reduced ? 0 : 0.6, ease }}
      >
        <div>
          <p className="eyebrow">About</p>
          <h2>Business judgment, analysis, and the product around the data.</h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className="role-list">
            {about.roles.map((role) => (
              <li key={role}>{role}</li>
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
      </motion.div>
    </section>
  )
}
