import { motion } from "motion/react"
import { profile } from "../data/portfolio"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { HeroInstrument } from "./HeroInstrument"

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)")

  function rise(delay: number) {
    if (reduced) {
      return {
        initial: false as const,
        animate: { opacity: 1 },
        transition: { duration: 0 },
      }
    }
    return {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay, ease },
    }
  }

  return (
    <section className="hero" aria-labelledby="profile-name">
      <div className="hero-grid wrap">
        <div className="hero-copy">
          <motion.p className="eyebrow" {...rise(0.04)}>
            {profile.eyebrow}
          </motion.p>
          <motion.h1 id="profile-name" {...rise(0.1)}>
            {profile.name}
          </motion.h1>
          <motion.p className="headline" {...rise(0.18)}>
            {profile.headline}
          </motion.p>
          <motion.p className="intro" {...rise(0.26)}>
            {profile.introduction}
          </motion.p>
          <motion.div className="actions" {...rise(0.34)}>
            <a className="button button-primary" href="#work">
              View My Work
              <Arrow />
            </a>
            <a className="button" href="#about">
              About Me
            </a>
          </motion.div>
          <motion.p className="location" {...rise(0.42)}>
            {profile.location}
          </motion.p>
        </div>
        <HeroInstrument />
      </div>
    </section>
  )
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
