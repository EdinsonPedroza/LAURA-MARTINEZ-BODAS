"use client"
import { useEffect, useRef, useState } from "react"

/**
 * Clip-path based section entrance.
 * Zero extra DOM elements — the content itself is the animation surface.
 * Three modes:
 *   "slash"         — diagonal leading edge sweeps left→right
 *   "slash-reverse" — diagonal leading edge sweeps right→left
 *   "radial"        — iris bursts open from the given `origin` point
 */

type Phase = "before" | "primed" | "open"
export type CurtainType = "slash" | "slash-reverse" | "radial"

function clipPath(type: CurtainType, origin: string, phase: Phase): string | undefined {
  if (type === "slash") {
    return phase === "open"
      ? "polygon(0 0, 114% -12%, 114% 112%, 0 100%)"
      : "polygon(0 0, 0 0, 0 100%, 0 100%)"
  }
  if (type === "slash-reverse") {
    return phase === "open"
      ? "polygon(-14% -12%, 100% 0, 100% 100%, -14% 112%)"
      : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
  }
  if (type === "radial") {
    return phase === "open"
      ? `circle(160% at ${origin})`
      : `circle(0% at ${origin})`
  }
}

function easing(type: CurtainType): string {
  if (type === "radial") return "clip-path 1s cubic-bezier(0.16,1,0.3,1)"
  return "clip-path 0.72s cubic-bezier(0.77,0,0.18,1)"
}

export function SectionCurtain({
  children,
  type = "slash",
  origin = "50% 50%",
  delay = 0,
}: {
  children: React.ReactNode
  type?: CurtainType
  origin?: string
  delay?: number
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>("before")

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        setTimeout(() => {
          setPhase("primed")
          // Two rAF ticks — let browser paint the clipped state before transitioning
          requestAnimationFrame(() =>
            requestAnimationFrame(() => setPhase("open"))
          )
        }, delay)
      },
      { threshold: 0.06 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  const cp = clipPath(type, origin, phase)
  const transition = phase === "open" ? easing(type) : "none"

  return (
    <div ref={outerRef} style={{ position: "relative" }}>
      <div
        style={{
          clipPath: cp,
          transition,
          willChange: phase !== "before" ? "clip-path" : "auto",
        }}
      >
        {children}
      </div>
    </div>
  )
}
