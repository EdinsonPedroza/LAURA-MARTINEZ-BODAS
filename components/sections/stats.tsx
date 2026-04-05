"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 14,  suffix: "+", label: "Años de\nexperiencia" },
  { value: 100, suffix: "+", label: "Parejas\nfelices" },
  { value: 15,  suffix: "+", label: "Destinos\ninteracionales" },
  { value: 4.9, suffix: "",  label: "Rating\nGoogle" },
]

function Counter({ value, suffix, run }: { value: number; suffix: string; run: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!run) return
    let frame = 0
    const total = 80
    const tick = () => {
      frame++
      const progress = frame / total
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.min(value * eased, value))
      if (frame < total) requestAnimationFrame(tick)
      else setCount(value)
    }
    requestAnimationFrame(tick)
  }, [run, value])

  return <>{Number.isInteger(value) ? Math.floor(count) : count.toFixed(1)}{suffix}</>
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "oklch(0.07 0.025 5)" }}
    >
      {/* Crimson glow blobs */}
      <div
        className="absolute top-0 left-1/3 w-[500px] h-[200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, oklch(0.44 0.225 15 / 0.18) 0%, transparent 70%)" }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.44 0.225 15 / 0.8), transparent)" }} />

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.44 0.225 15 / 0.4), transparent)" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="group cursor-default py-10 px-6 md:px-10 text-center relative"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.7s ${i * 100}ms cubic-bezier(0.16,1,0.3,1), transform 0.7s ${i * 100}ms cubic-bezier(0.16,1,0.3,1)`,
              }}
            >
              {/* Number */}
              <div
                className="font-display font-black tabular-nums leading-none mb-3 transition-colors duration-400 group-hover:text-crimson"
                style={{
                  fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
                  color: "oklch(0.97 0.007 50)",
                  letterSpacing: "-0.03em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "oklch(0.60 0.20 18)"
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "oklch(0.97 0.007 50)"
                }}
              >
                <Counter value={s.value} suffix={s.suffix} run={isVisible} />
              </div>

              {/* Thin crimson line */}
              <div
                className="mx-auto mb-3"
                style={{
                  width: isVisible ? "2rem" : "0",
                  height: "2px",
                  background: "oklch(0.44 0.225 15)",
                  transition: `width 0.6s ${i * 100 + 300}ms cubic-bezier(0.16,1,0.3,1)`,
                }}
              />

              {/* Label */}
              <p
                className="font-display text-[10px] md:text-xs tracking-[0.25em] uppercase font-light whitespace-pre-line leading-relaxed group-hover:text-white/70 transition-colors duration-300"
                style={{ color: "oklch(0.42 0.020 30)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
