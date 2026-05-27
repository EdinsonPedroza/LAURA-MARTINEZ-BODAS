"use client"
import { useEffect, useRef, useState } from "react"

/**
 * Two modes:
 *   "assembly" — section snaps in from bottom upward, like blocks being stacked
 *   "sweep"    — a colored bar sweeps left→right with crimson leading-edge glow
 */
export function SectionCurtain({
  children,
  mode = "sweep",
  // sweep props
  color = "oklch(0.07 0.018 5)",
  accentColor = "oklch(0.44 0.225 15)",
  barWidth = "62%",
  duration = 720,
  delay = 0,
  // assembly props
  steps = 8,
  skew = 4,
}: {
  children: React.ReactNode
  mode?: "sweep" | "assembly"
  color?: string
  accentColor?: string
  barWidth?: string
  duration?: number
  delay?: number
  steps?: number
  skew?: number
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        setTimeout(() => setTriggered(true), delay)
      },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  // ── ASSEMBLY MODE ──────────────────────────────────────────────────────────
  if (mode === "assembly") {
    const hidden  = `polygon(-2% 100%, 102% 100%, 102% 100%, -2% 100%)`
    const visible = `polygon(-2% -2%, 102% ${skew}%, 102% 102%, -2% 102%)`
    return (
      <div ref={wrapRef}>
        <div
          style={{
            clipPath: triggered ? visible : hidden,
            transition: triggered ? `clip-path ${duration}ms steps(${steps}, end)` : "none",
            willChange: triggered ? "clip-path" : "auto",
          }}
        >
          {children}
        </div>
      </div>
    )
  }

  // ── SWEEP MODE (default) ───────────────────────────────────────────────────
  return (
    <div ref={wrapRef} style={{ position: "relative", overflow: "hidden" }}>
      {children}
      {triggered && !done && (
        <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 48, pointerEvents: "none", overflow: "hidden" }}>
          {/* Crimson leading-edge glow */}
          <div
            style={{
              position: "absolute", top: 0, bottom: 0, left: 0, width: "4px",
              background: `linear-gradient(to bottom, transparent 0%, ${accentColor} 20%, ${accentColor} 80%, transparent 100%)`,
              animation: `section-sweep-bar ${duration * 0.9}ms cubic-bezier(0.77,0,0.18,1) forwards`,
              boxShadow: `0 0 20px 6px ${accentColor}`,
            }}
            onAnimationEnd={() => setDone(true)}
          />
          {/* Main bar */}
          <div
            style={{
              position: "absolute", top: 0, bottom: 0, left: 0, width: barWidth,
              background: `linear-gradient(to right, ${color} 0%, ${color} 94%, transparent 100%)`,
              animation: `section-sweep-bar ${duration}ms cubic-bezier(0.77,0,0.18,1) forwards`,
            }}
          />
        </div>
      )}
    </div>
  )
}
