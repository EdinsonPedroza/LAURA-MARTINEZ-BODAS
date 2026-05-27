"use client"
import { useEffect, useRef, useState } from "react"

/**
 * "Assembly build" entrance: the section reveals itself in discrete steps,
 * snapping from bottom to top — like rows of bricks being laid.
 *
 * Uses clip-path + CSS steps() timing: zero extra DOM, pure GPU.
 * Each step snaps in the next horizontal band of content, creating the
 * visual of the section being built piece-by-piece.
 */
export function SectionCurtain({
  children,
  steps = 8,
  duration = 880,
  delay = 0,
  skew = 4,          // degrees of diagonal on the leading edge (0 = straight)
}: {
  children: React.ReactNode
  steps?: number
  duration?: number
  delay?: number
  skew?: number
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

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

  // The leading-edge skew is encoded directly into the polygon end-state.
  // clip-path animates all four polygon points simultaneously via steps().
  // Start: a zero-height slice at the very bottom (nothing visible)
  // End:   full rect with a slight diagonal top edge
  const skewPct = skew        // how many % the right side lags behind the left

  const hidden = `polygon(-2% 100%, 102% 100%, 102% 100%, -2% 100%)`
  const visible = `polygon(-2% -2%, 102% ${skewPct}%, 102% 102%, -2% 102%)`

  return (
    <div ref={wrapRef}>
      <div
        style={{
          clipPath: triggered ? visible : hidden,
          transition: triggered
            ? `clip-path ${duration}ms steps(${steps}, end)`
            : "none",
          willChange: triggered ? "clip-path" : "auto",
        }}
      >
        {children}
      </div>
    </div>
  )
}
