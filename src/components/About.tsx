import { motion } from "motion/react"
import { about, additionalWork, education } from "../data/portfolio"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { cx } from "../lib/cx"
import { ExternalLink } from "./CompanyLink"

const ease = [0.22, 1, 0.36, 1] as const

export function About() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)")

  return (
    <section id="about" className="about">
      <motion.div
        className="wrap"
        initial={reduced ? false : { y: 16 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 0.45, ease }}
      >
        <p className="eyebrow">About</p>
        <h2>{about.heading}</h2>
        <div className={cx("about-intro", about.photo && "has-photo")}>
          {about.photo ? (
            <img
              className="about-photo"
              src={about.photo.src}
              width={about.photo.width}
              height={about.photo.height}
              alt={about.photo.alt}
              loading="lazy"
              decoding="async"
            />
          ) : null}
          <div className="about-text">
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
        </div>
        <div className="skill-list">
          {about.skills.map((skill) => (
            <article key={skill.title}>
              <h3>{skill.title}</h3>
              <p>{skill.text}</p>
            </article>
          ))}
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
                {item.url ? <ExternalLink href={item.url} label={item.linkLabel ?? "Link"} /> : null}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
