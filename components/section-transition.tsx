"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

/**
 * SectionTransition — animated divider between sections.
 *
 * Same signature effect used across the other landings: a line that expands
 * from the center, a light beam sweeping across, a central flare, an expanding
 * ring and a few diagonal sparks. Pure CSS + IntersectionObserver (no
 * framer-motion) to stay consistent with the rest of this project.
 *
 * Runs once when it scrolls into view.
 */

type Accent = "crimson" | "gold" | "dark"

const ACCENTS: Record<Accent, { line: string; center: string; glow: string; spark: string }> = {
  crimson: {
    line: "oklch(0.44 0.225 15 / 0.38)",
    center: "oklch(0.80 0.14 22 / 0.95)",
    glow: "oklch(0.44 0.225 15 / 0.30)",
    spark: "oklch(0.82 0.15 25)",
  },
  gold: {
    line: "oklch(0.72 0.09 70 / 0.42)",
    center: "oklch(0.90 0.09 82 / 0.95)",
    glow: "oklch(0.72 0.10 70 / 0.30)",
    spark: "oklch(0.88 0.10 80)",
  },
  dark: {
    line: "oklch(0.60 0.02 30 / 0.30)",
    center: "oklch(0.85 0.03 40 / 0.85)",
    glow: "oklch(0.50 0.02 30 / 0.22)",
    spark: "oklch(0.85 0.04 40)",
  },
}

/* 4 sparks along the diagonals */
const BURST_DIRS = [45, 135, 225, 315]

export function SectionTransition({ accent = "crimson" }: { accent?: Accent }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const c = ACCENTS[accent] ?? ACCENTS.crimson

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        setInView(true)
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const anim = (name: string, dur: number, ease: string, delay = 0): CSSProperties =>
    inView ? { animation: `${name} ${dur}ms ${ease} ${delay}ms both` } : {}

  const smooth = "cubic-bezier(0.22,1,0.36,1)"

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative pointer-events-none select-none my-1"
      style={{ height: 28, width: "100%", overflow: "visible", zIndex: 5 }}
    >
      {/* Base line — expands from the center */}
      <div
        className="absolute inset-x-0 top-1/2 h-px origin-center"
        style={{
          opacity: 0,
          transform: "scaleX(0)",
          background: `linear-gradient(90deg, transparent 2%, ${c.line} 18%, ${c.center} 50%, ${c.line} 82%, transparent 98%)`,
          ...anim("st-line", 450, smooth),
        }}
      />

      {/* Fast beam left → right */}
      <div className="absolute inset-x-0 top-1/2" style={{ overflow: "hidden", height: 10, marginTop: -5 }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "28%",
            height: 5,
            marginTop: 2.5,
            opacity: 0,
            background: `linear-gradient(90deg, transparent, ${c.center}, white 50%, ${c.center}, transparent)`,
            boxShadow: `0 0 18px 5px ${c.glow}, 0 0 36px 10px ${c.glow}`,
            ...anim("st-beam", 380, "cubic-bezier(0.12,1,0.28,1)", 120),
          }}
        />
      </div>

      {/* Center flare */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: 8,
          height: 8,
          marginTop: -4,
          marginLeft: -4,
          opacity: 0,
          transform: "scale(0)",
          background: `radial-gradient(circle, white 20%, ${c.center} 55%, transparent 100%)`,
          boxShadow: `0 0 14px 5px ${c.glow}, 0 0 28px 10px ${c.glow}`,
          ...anim("st-flare", 320, smooth, 140),
        }}
      />

      {/* Expanding ring */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: 6,
          height: 6,
          marginTop: -3,
          marginLeft: -3,
          opacity: 0,
          transform: "scale(0)",
          border: `1.5px solid ${c.center}`,
          ...anim("st-ring", 450, "ease-out", 150),
        }}
      />

      {/* 4 diagonal sparks */}
      {BURST_DIRS.map((deg, i) => {
        const dist = 58 + i * 10
        return (
          <div
            key={deg}
            className="absolute top-1/2 left-1/2 origin-left"
            style={
              {
                width: 18 + i * 5,
                height: 1.5,
                marginTop: -0.75,
                marginLeft: -1,
                borderRadius: 4,
                opacity: 0,
                background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? "white" : c.spark})`,
                boxShadow: `0 0 4px ${c.spark}`,
                "--deg": `${deg}deg`,
                "--dist": `${dist}px`,
                transform: `rotate(${deg}deg) translateX(0) scaleX(0)`,
                ...anim("st-spark", 360, "ease-out", 160 + i * 25),
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
}
