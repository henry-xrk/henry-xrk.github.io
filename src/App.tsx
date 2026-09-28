import { About } from "./components/About"
import { Contact } from "./components/Contact"
import { Experience } from "./components/Experience"
import { Hero } from "./components/Hero"
import { ProjectShowcase } from "./components/ProjectShowcase"
import { SiteHeader } from "./components/SiteHeader"

export function App() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <ProjectShowcase />
        <Experience />
        <About />
        <Contact />
      </main>
    </>
  )
}
