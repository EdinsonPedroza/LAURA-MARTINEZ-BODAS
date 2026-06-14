"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  {
    value: 14,
    suffix: "+",
    label: "Años de Experiencia",
    icon: "✦",
    color: "oklch(0.44 0.225 15)",
  },
  {
    value: 100,
    suffix: "+",
    label: "Parejas Felices",
    icon: "♡",
    color: "oklch(0.55 0.20 18)",
  },
  {
    value: 15,
    suffix: "+",
    label: "Destinos Internacionales",
    icon: "◈",
    color: "oklch(0.44 0.225 15)",
  },
  {
    value: 4.9,
    suffix: "",
    label: "Rating Google",
    icon: "★",
    color: "oklch(0.72 0.065 70)",
  },
]

function Counter({ value, suffix, run, color }: { value: number; suffix: string; run: boolean; color: string }) {
  const [count, setCount] = useState(0)
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    if (!run) return
    let frame = 0
    const total = 110
    const tick = () => {
      frame++
      const progress = frame / total
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.min(value * eased, value))
      if (frame < total) requestAnimationFrame(tick)
      else {
        setCount(value)
        setBurst(true)
        setTimeout(() => setBurst(false), 600)
      }
    }
    requestAnimationFrame(tick)
  }, [run, value])

  return (
    <span
      style={{
        display: "inline-block",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), text-shadow 0.4s",
        transform: burst ? "scale(1.12)" : "scale(1)",
        textShadow: burst ? `0 0 60px ${color}, 0 0 120px ${color}` : "none",
      }}
    >
      {Number.isInteger(value) ? Math.floor(count) : count.toFixed(1)}{suffix}
    </span>
  )
}

function StatCard({
  s,
  i,
  isVisible,
}: {
  s: { value: number; suffix: string; label: string; icon: string; color: string }
  i: number
  isVisible: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [scanPos, setScanPos] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hovered) return
    let raf: number
    let pos = -20
    const animate = () => {
      pos += 2.5
      if (pos > 120) pos = -20
      setScanPos(pos)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [hovered])

  return (
    <div
      ref={cardRef}
      className="relative group cursor-default"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.80)",
        transition: `opacity 1s ${i * 180}ms cubic-bezier(0.16,1,0.3,1), transform 1s ${i * 180}ms cubic-bezier(0.16,1,0.3,1)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer glow on hover */}
      <div
        className="absolute -inset-px pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${s.color} 0%, transparent 50%, ${s.color} 100%)`,
          opacity: hovered ? 0.6 : 0,
          transition: "opacity 0.4s ease",
          borderRadius: "2px",
        }}
      />

      {/* Card body */}
      <div
        className="relative overflow-hidden flex flex-col items-center justify-center py-14 px-6 md:px-10 text-center"
        style={{
          background: hovered
            ? "oklch(0.10 0.030 8)"
            : "oklch(0.065 0.022 5)",
          transition: "background 0.4s ease",
          isolation: "isolate",
        }}
      >
        {/* Mesh background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, ${s.color}18 0%, transparent 55%), radial-gradient(circle at 70% 30%, ${s.color}10 0%, transparent 50%)`,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.5s ease",
          }}
        />

        {/* Scan line (animated on hover) */}
        {hovered && (
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: `${scanPos}%`,
              height: "1px",
              background: `linear-gradient(90deg, transparent, ${s.color}CC, transparent)`,
              boxShadow: `0 0 8px 1px ${s.color}88`,
            }}
          />
        )}

        {/* Top border glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
            opacity: hovered ? 1 : 0.2,
            boxShadow: hovered ? `0 0 16px 2px ${s.color}` : "none",
            transition: "opacity 0.4s, box-shadow 0.4s",
          }}
        />

        {/* Icon */}
        <div
          className="mb-4 leading-none select-none"
          style={{
            fontSize: "1.5rem",
            color: hovered ? s.color : `${s.color}55`,
            transition: "color 0.3s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1), filter 0.4s",
            transform: hovered ? "scale(1.5) rotate(20deg)" : "scale(1) rotate(0deg)",
            filter: hovered ? `drop-shadow(0 0 10px ${s.color})` : "none",
          }}
        >
          {s.icon}
        </div>

        {/* Big number */}
        <div
          className="font-display font-black tabular-nums leading-none mb-4"
          style={{
            fontSize: "clamp(4rem, 8vw, 6.5rem)",
            letterSpacing: "-0.035em",
            color: hovered ? "oklch(0.98 0.007 50)" : "oklch(0.88 0.007 50)",
            textShadow: hovered
              ? `0 0 40px ${s.color}CC, 0 0 100px ${s.color}55`
              : "none",
            transition: "color 0.3s, text-shadow 0.4s",
          }}
        >
          <Counter value={s.value} suffix={s.suffix} run={isVisible} color={s.color} />
        </div>

        {/* Crimson line */}
        <div
          style={{
            width: isVisible ? (hovered ? "5rem" : "2.5rem") : "0",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
            boxShadow: hovered ? `0 0 12px 2px ${s.color}` : "none",
            marginBottom: "1rem",
            transition: `width 0.6s ${i * 100 + 500}ms cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s`,
          }}
        />

        {/* Label */}
        <p
          className="font-display text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-semibold leading-relaxed"
          style={{
            color: hovered ? "oklch(0.72 0.025 30)" : "oklch(0.38 0.020 30)",
            transition: "color 0.3s",
            marginBottom: "0.5rem",
          }}
        >
          {s.label}
        </p>

        {/* Corner accents */}
        <div
          className="absolute top-3 left-3 w-4 h-4 border-t border-l pointer-events-none"
          style={{
            borderColor: s.color,
            opacity: hovered ? 0.9 : 0.15,
            transform: hovered ? "scale(1.3)" : "scale(1)",
            transition: "opacity 0.3s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
        <div
          className="absolute bottom-3 right-3 w-4 h-4 border-b border-r pointer-events-none"
          style={{
            borderColor: s.color,
            opacity: hovered ? 0.9 : 0.15,
            transform: hovered ? "scale(1.3)" : "scale(1)",
            transition: "opacity 0.3s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
      </div>
    </div>
  )
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "oklch(0.055 0.018 5)" }}
    >
      {/* Animated background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.44 0.225 15 / 0.07) 1px, transparent 1px), linear-gradient(90deg, oklch(0.44 0.225 15 / 0.07) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Giant center orb */}
      <div
        className="absolute top-1/2 left-1/2 pointer-events-none"
        style={{
          width: "900px",
          height: "400px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse, oklch(0.44 0.225 15 / 0.14) 0%, transparent 65%)",
          animation: "breathe-center 6s ease-in-out infinite",
        }}
      />

      {/* Corner orbs */}
      <div
        className="absolute -top-20 -left-20 w-80 h-80 pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.44 0.225 15 / 0.10) 0%, transparent 70%)",
          animation: "breathe 8s 2s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-80 h-80 pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.44 0.225 15 / 0.08) 0%, transparent 70%)",
          animation: "breathe 7s 4s ease-in-out infinite",
        }}
      />

      {/* Floating particles */}
      {[
        { size: 3, top: "12%", left: "8%",  dur: 6,   del: 0 },
        { size: 2, top: "70%", left: "5%",  dur: 8,   del: 1.5 },
        { size: 4, top: "25%", left: "92%", dur: 7,   del: 0.8 },
        { size: 2, top: "80%", left: "88%", dur: 9,   del: 2.2 },
        { size: 3, top: "50%", left: "18%", dur: 5.5, del: 3.1 },
        { size: 2, top: "15%", left: "75%", dur: 7.5, del: 1.0 },
        { size: 3, top: "88%", left: "42%", dur: 6.5, del: 2.5 },
        { size: 2, top: "40%", left: "96%", dur: 8.5, del: 0.3 },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            background: "oklch(0.44 0.225 15)",
            boxShadow: "0 0 6px 2px oklch(0.44 0.225 15 / 0.6)",
            animation: `particle-drift ${p.dur}s ${p.del}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Top accent line (glowing) */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 5%, oklch(0.44 0.225 15 / 0.9) 30%, oklch(0.72 0.065 70 / 0.7) 50%, oklch(0.44 0.225 15 / 0.9) 70%, transparent 95%)",
          boxShadow: "0 0 20px 2px oklch(0.44 0.225 15 / 0.4)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.44 0.225 15 / 0.3), transparent)",
        }}
      />

      {/* Section eyebrow */}
      <div
        className="text-center mb-12 md:mb-16 relative z-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span
          className="inline-flex items-center gap-3 text-[10px] tracking-[0.6em] uppercase font-semibold"
          style={{ color: "oklch(0.44 0.225 15)" }}
        >
          <span className="w-6 h-px" style={{ background: "oklch(0.44 0.225 15 / 0.5)" }} />
          Nuestra Trayectoria
          <span className="w-6 h-px" style={{ background: "oklch(0.44 0.225 15 / 0.5)" }} />
        </span>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 relative z-10">
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{
            gap: "1px",
            background: "oklch(0.44 0.225 15 / 0.12)",
          }}
        >
          {stats.map((s, i) => (
            <StatCard key={s.label} s={s} i={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
