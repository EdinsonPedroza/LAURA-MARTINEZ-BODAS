"use client"

import { useEffect, useRef, useState } from "react"
import { Download, BookOpen } from "lucide-react"

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

  return (
    <section
      ref={sectionRef}
      id="guia"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "oklch(0.08 0.018 8)" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, oklch(0.44 0.225 15 / 0.06) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse at top, oklch(0.44 0.225 15 / 0.12) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative z-10 max-w-2xl mx-auto px-4 md:px-8 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(0.44 0.225 15))" }} />
          <span className="text-[10px] tracking-[0.35em] uppercase font-semibold" style={{ color: "oklch(0.65 0.18 18)" }}>
            Recurso gratuito
          </span>
          <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, oklch(0.44 0.225 15), transparent)" }} />
        </div>

        <h2
          className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight"
          style={{ color: "oklch(0.97 0.005 50)" }}
        >
          ¡Planifica tu boda{" "}
          <span style={{ color: "oklch(0.65 0.18 18)" }}>sin morir</span>
          <br className="hidden md:block" /> en el intento!
        </h2>

        <p
          className="text-base md:text-lg leading-relaxed mb-10"
          style={{ color: "oklch(0.78 0.015 30)" }}
        >
          Una guía gratuita con el paso a paso que toda novia necesita,
          desde el primer detalle hasta el gran día.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm uppercase transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, oklch(0.44 0.225 15), oklch(0.35 0.20 10))",
              color: "#fff",
              letterSpacing: "0.14em",
              boxShadow: "0 0 28px oklch(0.44 0.225 15 / 0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"
              e.currentTarget.style.boxShadow = "0 0 40px oklch(0.44 0.225 15 / 0.55)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)"
              e.currentTarget.style.boxShadow = "0 0 28px oklch(0.44 0.225 15 / 0.35)"
            }}
          >
            <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            Descargar guía gratis
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
