"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

/**
 * SectionTransition — kinetic slash divider between sections.
 *
 * Choreography: two skewed bars slash across the strip in opposite
 * directions, collide at the center (flash), a diamond punches in with
 * spin + overshoot, shockwave rings expand, debris shards fly out and a
 * gradient line grows and stays as the resting ornament.
 *
 * Transform/opacity only (GPU-cheap on mobile) and it replays every time
 * the strip re-enters the viewport. Pure CSS + IntersectionObserver.
 */

type Accent = "crimson" | "gold" | "dark"

const ACCENTS: Record<Accent, { bar: string; echo: string; glow: string; line: string }> = {
  crimson: {
    bar: "oklch(0.50 0.21 18)",
    echo: "oklch(0.80 0.09 78)",
    glow: "oklch(0.44 0.225 15 / 0.45)",
    line: "oklch(0.44 0.225 15 / 0.40)",
  },
  gold: {
    bar: "oklch(0.76 0.10 75)",
    echo: "oklch(0.50 0.21 18)",
    glow: "oklch(0.72 0.10 70 / 0.45)",
    line: "oklch(0.72 0.09 70 / 0.45)",
  },
  dark: {
    bar: "oklch(0.38 0.06 15)",
    echo: "oklch(0.50 0.21 18)",
    glow: "oklch(0.38 0.06 15 / 0.40)",
    line: "oklch(0.50 0.03 25 / 0.40)",
  },
}

/* Debris shards: horizontal distance, vertical drift, width, extra delay */
const SHARDS = [
  { x: -92, y: -14, w: 26, d: 0 },
  { x: -134, y: 8, w: 18, d: 40 },
  { x: -70, y: 18, w: 13, d: 70 },
  { x: 92, y: -12, w: 26, d: 20 },
  { x: 136, y: 10, w: 18, d: 55 },
  { x: 72, y: -20, w: 13, d: 85 },
]

const PUNCH = "cubic-bezier(0.16,1,0.3,1)"
const SLASH = "cubic-bezier(0.8,0,0.2,1)"

export function SectionTransition({ accent = "crimson" }: { accent?: Accent }) {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(0)
  const c = ACCENTS[accent] ?? ACCENTS.crimson

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        // Replays on every re-entry: each intersection bumps the key
        if (entry.isIntersecting) setRun((r) => r + 1)
      },
      { threshold: 0.9, rootMargin: "0px 0px -4% 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Centered wrapper so keyframe transforms don't fight the centering */
  const center: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative pointer-events-none select-none"
      style={{ height: "clamp(56px, 12vw, 84px)", width: "100%", zIndex: 5 }}
    >
      {run > 0 && (
        <div key={run} className="absolute inset-0" style={{ overflow: "visible" }}>
          {/* ── Slash bars (clipped to the strip) ── */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: "42%",
                height: 6,
                marginTop: -7,
                borderRadius: 9999,
                background: `linear-gradient(90deg, transparent, ${c.bar} 30%, white 55%, ${c.bar} 70%, transparent)`,
                boxShadow: `0 0 22px 6px ${c.glow}`,
                animation: `sx-slash 620ms ${SLASH} both`,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: "36%",
                height: 3,
                marginTop: 4,
                borderRadius: 9999,
                background: `linear-gradient(90deg, transparent, ${c.echo} 40%, white 60%, transparent)`,
                boxShadow: `0 0 14px 3px ${c.glow}`,
                animation: `sx-slash-rev 640ms ${SLASH} 90ms both`,
              }}
            />
          </div>

          {/* ── Impact flash ── */}
          <div style={{ ...center, width: "min(72vw, 420px)", height: 46 }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `radial-gradient(ellipse, white 0%, ${c.glow} 28%, transparent 68%)`,
                animation: `sx-flash 380ms ease-out 440ms both`,
              }}
            />
          </div>

          {/* ── Shockwave rings ── */}
          {[
            { size: 120, dur: 700, delay: 490, border: 1.5 },
            { size: 176, dur: 850, delay: 590, border: 1 },
          ].map((r) => (
            <div key={r.size} style={{ ...center, width: r.size, height: r.size }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 9999,
                  border: `${r.border}px solid ${c.bar}`,
                  animation: `sx-ring ${r.dur}ms ease-out ${r.delay}ms both`,
                }}
              />
            </div>
          ))}

          {/* ── Debris shards ── */}
          {SHARDS.map((s, i) => (
            <div key={i} style={{ ...center, width: 0, height: 0, overflow: "visible" }}>
              <div
                style={
                  {
                    position: "absolute",
                    width: s.w,
                    height: 2,
                    borderRadius: 2,
                    background:
                      s.x < 0
                        ? `linear-gradient(90deg, white, ${i % 2 === 0 ? c.bar : c.echo})`
                        : `linear-gradient(90deg, ${i % 2 === 0 ? c.bar : c.echo}, white)`,
                    boxShadow: `0 0 6px ${c.glow}`,
                    "--sx-x": `${s.x}px`,
                    "--sx-y": `${s.y}px`,
                    animation: `sx-shard 650ms ${PUNCH} ${450 + s.d}ms both`,
                  } as CSSProperties
                }
              />
            </div>
          ))}

          {/* ── Resting line (stays) ── */}
          <div
            className="absolute inset-x-0 top-1/2 h-px origin-center"
            style={{
              background: `linear-gradient(90deg, transparent 2%, ${c.line} 22%, ${c.bar} 50%, ${c.line} 78%, transparent 98%)`,
              animation: `sx-line 800ms cubic-bezier(0.22,1,0.36,1) 520ms both`,
            }}
          />

          {/* ── Diamond ornament (stays) ── */}
          <div style={{ ...center, width: 12, height: 12 }}>
            <div
              style={{
                width: 11,
                height: 11,
                background: `linear-gradient(135deg, white -20%, ${c.bar} 65%)`,
                boxShadow: `0 0 14px 3px ${c.glow}`,
                animation: `sx-diamond 700ms ${PUNCH} 450ms both`,
              }}
            />
          </div>

          {/* ── Side dots (stay) ── */}
          {[-28, 28].map((x, i) => (
            <div key={x} style={{ ...center, marginLeft: x, width: 4, height: 4 }}>
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 9999,
                  background: c.bar,
                  boxShadow: `0 0 6px ${c.glow}`,
                  animation: `sx-dot 400ms ${PUNCH} ${900 + i * 70}ms both`,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
