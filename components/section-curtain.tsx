"use client"
import { useEffect, useRef, useState } from "react"

/**
 * Wraps a section with a cinematic "sweep bar" reveal.
 * A solid bar explodes from off-screen left, slashes across the section,
 * and exits right — giving each section a dramatic theatrical entrance.
 * Does NOT hide content; sweep fires on top as a visual punctuation.
 */
export function SectionCurtain({
  children,
  color = "oklch(0.07 0.018 5)",
  accentColor = "oklch(0.44 0.225 15)",
  barWidth = "62%",
  duration = 720,
  delay = 0,
}: {
  children: React.ReactNode
  color?: string
  accentColor?: string
  barWidth?: string
  duration?: number
  delay?: number
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
        const t = setTimeout(() => setTriggered(true), delay)
        return () => clearTimeout(t)
      },
      { threshold: 0.06 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={wrapRef} style={{ position: "relative", overflow: "hidden" }}>
      {children}

      {triggered && !done && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 48,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* Thin crimson leading-edge accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "4px",
              background: `linear-gradient(to bottom,
                transparent 0%,
                ${accentColor} 20%,
                ${accentColor} 80%,
                transparent 100%)`,
              animation: `section-sweep-bar ${duration * 0.9}ms cubic-bezier(0.77,0,0.18,1) forwards`,
              boxShadow: `0 0 20px 6px ${accentColor}`,
            }}
            onAnimationEnd={() => setDone(true)}
          />
          {/* Main body of the curtain bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: barWidth,
              background: `linear-gradient(to right,
                ${color} 0%,
                ${color} 94%,
                transparent 100%)`,
              animation: `section-sweep-bar ${duration}ms cubic-bezier(0.77,0,0.18,1) forwards`,
            }}
          />
        </div>
      )}
    </div>
  )
}
