import { AnimatePresence, motion } from "motion/react"
import { useEffect, useId, useRef, useState } from "react"
import { signal } from "../data/portfolio"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { cx } from "../lib/cx"
import { FieldTokens, MatchedEntity, RawRecord, UsableView } from "./glyphs"

const glyphs = {
  raw: RawRecord,
  fields: FieldTokens,
  matched: MatchedEntity,
  usable: UsableView,
}

const ease = [0.22, 1, 0.36, 1] as const
const route = "M96 124 C 168 72, 236 88, 300 150 C 368 216, 188 248, 112 318 C 58 368, 186 414, 304 396"

export function HeroInstrument() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)")
  const stacked = useMediaQuery("(max-width: 980px)")
  const autoplay = stacked && !reduced
  const [mobileIndex, setMobileIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [pointerId, setPointerId] = useState<string | null>(null)
  const [focusId, setFocusId] = useState<string | null>(null)
  const [inView, setInView] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [shift, setShift] = useState({ x: 0, y: 0 })
  const plateRef = useRef<HTMLDivElement>(null)
  const gradientId = useId().replace(/:/g, "")

  useEffect(() => {
    const node = plateRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])

  useEffect(() => {
    if (!autoplay || !playing || !inView || hidden) return
    const timer = window.setInterval(() => {
      setMobileIndex((index) => (index + 1) % signal.stages.length)
    }, 3500)
    return () => window.clearInterval(timer)
  }, [autoplay, playing, inView, hidden])

  const selectedId = stacked ? (focusId ?? signal.stages[mobileIndex]?.id ?? null) : (focusId ?? pointerId)
  const active = signal.stages.find((stage) => stage.id === selectedId)
  const detail = active?.detail ?? signal.restingDetail
  const motionOn = inView && !hidden && !reduced && !stacked

  function select(id: string) {
    const index = signal.stages.findIndex((stage) => stage.id === id)
    if (index >= 0) setMobileIndex(index)
    if (stacked) setPlaying(false)
  }

  return (
    <div className="instrument">
      <div
        ref={plateRef}
        className="plate"
        onPointerMove={(event) => {
          if (stacked || reduced) return
          const rect = event.currentTarget.getBoundingClientRect()
          setShift({
            x: ((event.clientX - rect.left) / rect.width - 0.5) * 16,
            y: ((event.clientY - rect.top) / rect.height - 0.5) * 16,
          })
        }}
        onPointerLeave={() => {
          setShift({ x: 0, y: 0 })
          if (!stacked) setPointerId(null)
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocusId(null)
        }}
        style={
          reduced || stacked ? undefined : { transform: `translate3d(${shift.x}px, ${shift.y}px, 0)` }
        }
      >
        <svg className="signal-field" viewBox="0 0 400 500" aria-hidden="true">
          <defs>
            <radialGradient id={`${gradientId}-glow`} cx="50%" cy="46%" r="46%">
              <stop offset="0%" stopColor="#3ddc97" stopOpacity="0.2" />
              <stop offset="72%" stopColor="#3ddc97" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${gradientId}-route`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3ddc97" stopOpacity="0.12" />
              <stop offset="48%" stopColor="#3ddc97" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#3ddc97" stopOpacity="0.16" />
            </linearGradient>
          </defs>
          <circle cx="206" cy="250" r="158" fill={`url(#${gradientId}-glow)`} />
          <circle cx="206" cy="246" r="176" fill="none" stroke="rgba(231,228,220,0.08)" />
          <circle cx="188" cy="268" r="112" fill="none" stroke="rgba(231,228,220,0.05)" />
          <path
            className="signal-route"
            d={route}
            fill="none"
            stroke={`url(#${gradientId}-route)`}
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          {motionOn ? (
            <circle r="3.2" fill="#eaffe9">
              <animateMotion dur="9s" repeatCount="indefinite" path={route} />
            </circle>
          ) : null}
        </svg>

        <div className="stage-grid" role="group" aria-label="From a raw record to a usable view">
          {signal.stages.map((stage, index) => {
            const Glyph = glyphs[stage.id]
            const isActive = selectedId === stage.id
            return (
              <motion.button
                key={stage.id}
                type="button"
                className={cx("stage", isActive && "is-active", Boolean(selectedId) && "is-dimmable")}
                aria-pressed={isActive}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.65,
                  delay: reduced ? 0 : 0.16 + index * 0.08,
                  ease,
                }}
                onMouseEnter={() => {
                  if (!stacked) setPointerId(stage.id)
                }}
                onFocus={() => {
                  setFocusId(stage.id)
                  if (stacked) setPlaying(false)
                }}
                onClick={() => select(stage.id)}
              >
                <span className="glyph">
                  <Glyph />
                </span>
                <span className="stage-index">{stage.index}</span>
                <span className="stage-label">{stage.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      <p className="signal-summary">{signal.summary}</p>
      <div className="stage-detail" aria-live={autoplay && playing ? "off" : "polite"}>
        <AnimatePresence mode="wait">
          <motion.p
            key={detail}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduced ? 0 : 0.35, ease }}
          >
            {detail}
          </motion.p>
        </AnimatePresence>
      </div>

      {autoplay ? (
        <button
          type="button"
          className="transport"
          aria-pressed={playing}
          onClick={() => setPlaying((value) => !value)}
        >
          <TransportIcon playing={playing} />
          {playing ? "Pause" : "Play"}
        </button>
      ) : null}
    </div>
  )
}

function TransportIcon({ playing }: { playing: boolean }) {
  if (playing) {
    return (
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <rect x="3" y="2" width="3.4" height="12" rx="1" fill="currentColor" />
        <rect x="9.6" y="2" width="3.4" height="12" rx="1" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M4 2.4v11.2L13.5 8 4 2.4z" fill="currentColor" />
    </svg>
  )
}
