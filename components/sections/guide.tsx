"use client"

import { useEffect, useRef, useState } from "react"
import { Download, BookOpen, Sparkles } from "lucide-react"

const GUIDE_URL = "https://www.lauramartinezbodas.com/wp-content/uploads/2025/05/Guiadebodas.pdf"

export function Guide() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const stagger = (i: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ${i * 110}ms ease, transform 0.7s ${i * 110}ms cubic-bezier(0.16,1,0.3,1)`,
  })

  return (
    <section
      ref={sectionRef}
      id="guia"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "oklch(0.08 0.018 8)" }}
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, oklch(0.44 0.225 15 / 0.06) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "700px",
          height: "320px",
          background: "radial-gradient(ellipse at top, oklch(0.44 0.225 15 / 0.14) 0%, transparent 70%)",
        }}
      />

      {/* Animated rotating ring — purely decorative */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{
          border: "1px solid oklch(0.44 0.225 15 / 0.10)",
          animation: "spin-slow 20s linear infinite",
        }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
        style={{
          border: "1px solid oklch(0.44 0.225 15 / 0.08)",
          animation: "spin-slow 28s linear infinite reverse",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6" style={stagger(0)}>
          <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(0.44 0.225 15))" }} />
          <span className="text-[10px] tracking-[0.38em] uppercase font-semibold flex items-center gap-2" style={{ color: "oklch(0.65 0.18 18)" }}>
            <Sparkles className="w-3 h-3" />
            Recurso gratuito
          </span>
          <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, oklch(0.44 0.225 15), transparent)" }} />
        </div>

        {/* Heading */}
        <div style={stagger(1)}>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight text-center"
            style={{ color: "oklch(0.97 0.005 50)" }}
          >
            ¡Haz realidad{" "}
            <span style={{ color: "oklch(0.65 0.18 18)" }}>el día que</span>
            <br className="hidden md:block" /> siempre soñaste!
          </h2>
        </div>

        <div style={stagger(2)}>
          <p
            className="text-base md:text-lg leading-relaxed mb-12 text-center mx-auto max-w-xl"
            style={{ color: "oklch(0.78 0.015 30)" }}
          >
            Una guía gratuita con el paso a paso que toda boda necesita.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={stagger(5)}>
          <a
            href={GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm uppercase overflow-hidden"
            style={{
              background: "linear-gradient(135deg, oklch(0.44 0.225 15), oklch(0.35 0.20 10))",
              color: "#fff",
              letterSpacing: "0.14em",
              boxShadow: "0 0 28px oklch(0.44 0.225 15 / 0.35)",
              transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"
              e.currentTarget.style.boxShadow = "0 0 44px oklch(0.44 0.225 15 / 0.6)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)"
              e.currentTarget.style.boxShadow = "0 0 28px oklch(0.44 0.225 15 / 0.35)"
            }}
          >
            {/* Shimmer sweep */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
                animation: "shimmer-slide 2.4s linear infinite",
              }}
            />
            <Download className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="relative z-10">Descargar guía gratis</span>
          </a>

          <div className="flex items-center gap-2" style={{ color: "oklch(0.50 0.012 30)" }}>
            <BookOpen className="w-4 h-4" />
            <span className="text-xs tracking-wide">PDF · Gratuito · Sin registro</span>
          </div>
        </div>
      </div>
    </section>
  )
}
