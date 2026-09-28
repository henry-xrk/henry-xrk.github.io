import { useEffect, useRef, useState } from "react"
import type { RefObject } from "react"
import { useMediaQuery } from "./useMediaQuery"

export function useWorkflowPlayback(stepCount: number): {
  ref: RefObject<HTMLElement | null>
  step: number
  reduced: boolean
  replay: () => void
} {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)")
  const last = Math.max(0, stepCount - 1)
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [step, setStep] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? last : 0,
  )
  const [runId, setRunId] = useState(0)
  const stepRef = useRef(reduced ? last : 0)
  const doneRef = useRef(reduced)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !inView || doneRef.current) return
    const timer = window.setInterval(() => {
      if (stepRef.current >= last) {
        doneRef.current = true
        window.clearInterval(timer)
        return
      }
      stepRef.current += 1
      setStep(stepRef.current)
    }, 1100)
    return () => window.clearInterval(timer)
  }, [inView, last, reduced, runId])

  function replay() {
    if (reduced) return
    doneRef.current = false
    stepRef.current = 0
    setStep(0)
    setRunId((value) => value + 1)
  }

  return { ref, step: reduced ? last : step, reduced, replay }
}
