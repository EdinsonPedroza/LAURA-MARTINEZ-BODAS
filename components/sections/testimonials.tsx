"use client"

import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    name: "Claudia Quintero Ochoa",
    text: "Las bodas que produce Laura Martínez son un espectáculo. Es una profesional que hace realidad los sueños de una pareja enamorada."
  },
  {
    name: "Angélica María Escobar Valencia",
    text: "Con Laura todo queda hermoso, divino, de sueño. Súper recomendada."
  },
  {
    name: "Andrea Sánchez",
    text: "Súper recomendada. No hay mejor que ella."
  },
  {
    name: "Laura Viviana Hernández Cadena",
    text: "Las bodas y todos los eventos que organizas son un sueño."
  },
  {
    name: "Teresa Montaño",
    text: "Todo es muy elegante y fino."
  },
  {
    name: "Eufemia Montaño",
    text: "Todo es de lujo. Recomendado 100%."
  }
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const [hero, ...rest] = testimonials

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "oklch(0.965 0.010 48)" }}
    >
      {/* SVG fractal noise — same warm paper grain as neighbouring sections */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 10%, oklch(0.44 0.225 15 / 0.20) 50%, transparent 90%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 10%, oklch(0.44 0.225 15 / 0.10) 50%, transparent 90%)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity var(--reveal-lg) cubic-bezier(0.16,1,0.3,1), transform var(--reveal-lg) cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "oklch(0.44 0.225 15)" }} />
            <span className="font-display text-[10px] tracking-[0.5em] uppercase font-semibold" style={{ color: "oklch(0.44 0.225 15)" }}>
              Testimonios
            </span>
            <div className="w-8 h-px" style={{ background: "oklch(0.44 0.225 15)" }} />
          </div>
          <h2 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-normal mb-4 text-balance leading-[1.0] tracking-tight" style={{ color: "oklch(0.09 0.025 8)" }}>
            Lo que dicen{" "}
            <em className="font-fraunces font-normal not-italic" style={{ color: "oklch(0.44 0.225 15)" }}>
              nuestras parejas
            </em>
          </h2>
          <p className="leading-relaxed" style={{ color: "oklch(0.32 0.020 15)" }}>
            Más de 100 bodas soñadas. Cada historia, única.
          </p>
        </div>

        {/* Hero quote */}
        <div
          className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(36px)",
            transition: "opacity var(--reveal-lg) cubic-bezier(0.16,1,0.3,1), transform var(--reveal-lg) cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: "calc(150ms * var(--stagger-scale))",
          }}
        >
          <p
            className="font-fraunces italic font-normal leading-snug mb-6"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)", color: "oklch(0.09 0.025 8)" }}
          >
            &ldquo;{hero.text}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-4">
            <div style={{ width: "2rem", height: "1px", background: "oklch(0.44 0.225 15)" }} />
            <span className="font-display text-[10px] tracking-[0.35em] uppercase font-semibold" style={{ color: "oklch(0.44 0.225 15)" }}>
              {hero.name}
            </span>
            <div style={{ width: "2rem", height: "1px", background: "oklch(0.44 0.225 15)" }} />
          </div>
        </div>

        {/* Remaining quotes — asymmetric editorial grid */}
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-10 max-w-5xl mx-auto">
          {rest.map((t, i) => (
            <div
              key={t.name}
              className="relative pl-5"
              style={{
                borderLeft: "2px solid oklch(0.44 0.225 15 / 0.35)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity var(--reveal-md) cubic-bezier(0.16,1,0.3,1), transform var(--reveal-md) cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `calc(${300 + i * 100}ms * var(--stagger-scale))`,
              }}
            >
              <p className="font-fraunces italic text-base leading-relaxed mb-3" style={{ color: "oklch(0.10 0.025 8)" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="font-display text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: "oklch(0.32 0.020 15)" }}>
                {t.name}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom signature line */}
        <div
          className="flex items-center justify-center gap-6 mt-16 md:mt-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity var(--reveal-lg) ease, transform var(--reveal-lg) cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: "calc(900ms * var(--stagger-scale))",
          }}
        >
          <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(to right, transparent, oklch(0.44 0.225 15 / 0.5))" }} />
          <span className="font-display text-[9px] tracking-[0.5em] uppercase font-medium" style={{ color: "oklch(0.44 0.225 15 / 0.7)" }}>
            Laura Martínez Bodas
          </span>
          <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(to left, transparent, oklch(0.44 0.225 15 / 0.5))" }} />
        </div>
      </div>
    </section>
  )
}
