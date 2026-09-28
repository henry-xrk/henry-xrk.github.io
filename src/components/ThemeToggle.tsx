import { useEffect, useState } from "react"
import type { KeyboardEvent } from "react"
import { cx } from "../lib/cx"

const modes = ["system", "light", "dark"] as const
type ThemeMode = (typeof modes)[number]

const labels: Record<ThemeMode, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
}

function readMode(): ThemeMode {
  const stored = document.documentElement.dataset.themeMode
  if (stored === "light" || stored === "dark" || stored === "system") return stored
  return "system"
}

function resolve(mode: ThemeMode): "light" | "dark" {
  if (mode === "light" || mode === "dark") return mode
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function apply(mode: ThemeMode) {
  const resolved = resolve(mode)
  document.documentElement.dataset.theme = resolved
  document.documentElement.dataset.themeMode = mode
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", resolved === "dark" ? "#0e1114" : "#f4f0e6")
  try {
    localStorage.setItem("theme", mode)
  } catch {
    // Preference simply stays for this visit.
  }
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(readMode)

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      if (readMode() === "system") apply("system")
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  function select(next: ThemeMode) {
    setMode(next)
    apply(next)
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLButtonElement>(`.theme-option[data-mode="${next}"]`)?.focus()
    })
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = modes.indexOf(mode)
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault()
      select(modes[(index + 1) % modes.length] ?? "system")
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault()
      select(modes[(index - 1 + modes.length) % modes.length] ?? "system")
    }
  }

  return (
    <div className="theme-switch" role="radiogroup" aria-label="Color theme" onKeyDown={onKeyDown}>
      {modes.map((item) => {
        const selected = mode === item
        return (
          <button
            key={item}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            data-mode={item}
            className={cx("theme-option", selected && "is-selected")}
            onClick={() => select(item)}
          >
            {labels[item]}
          </button>
        )
      })}
    </div>
  )
}
