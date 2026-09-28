import { useEffect, useState } from "react"
import { profile } from "../data/portfolio"
import { cx } from "../lib/cx"
import { ThemeToggle } from "./ThemeToggle"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header id="top" className={cx("site-header", scrolled && "is-scrolled")}>
      <div className="header-bar">
        <a className="wordmark" href="#top">
          <span className="wordmark-full">{profile.name}</span>
          <span className="wordmark-mark">{profile.mark}</span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      <ThemeToggle />
    </header>
  )
}
