"use client"

import { useEffect, useRef, useState } from "react"
import { Download, BookOpen, ChevronRight } from "lucide-react"

const GUIDE_URL = "https://www.lauramartinezbodas.com/wp-content/uploads/2025/05/Guiadebodas.pdf"

const phases = [
  {
    label: "Inicio",
    tagline: "Los cimientos de tu cuento",
    steps: [
      "Una fecha que los haga felices",
      "Presupuesto sin estrés",
      "Lista aproximada de invitados",
      "Tipo de ceremonia",
      "Lugar de la recepción",
      "Padrinos de bodas",
    ],
  },
  {
    label: "Nudo",
    tagline: "El corazón de la planificación",
    steps: [
      "Elección de los vestidos",
      "Fotógrafo y proveedores",
      "Música de la boda",
      "Documentación requerida",
      "Invitaciones",
      "Styling, joyas y argollas",
    ],
  },
  {
    label: "Desenlace",
    tagline: "La recta final hacia el sí",
    steps: [
      "Confirmación de invitados",
      "Noche de bodas",
      "Prueba de vestidos",
      "Una semana antes",
      "Un día antes",
      "El gran día ✨",
    ],
  },
]

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

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse at top, oklch(0.44 0.225 15 / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="w-8 h-px"
              style={{ background: "linear-gradient(90deg, transparent, oklch(0.44 0.225 15))" }}
            />
            <span
              className="text-[10px] tracking-[0.35em] uppercase font-semibold"
              style={{ color: "oklch(0.65 0.18 18)" }}
            >
              Recurso gratuito
            </span>
            <div
              className="w-8 h-px"
              style={{ background: "linear-gradient(90deg, oklch(0.44 0.225 15), transparent)" }}
            />
          </div>

          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight"
            style={{ color: "oklch(0.97 0.005 50)" }}
          >
            ¡Planifica tu boda{" "}
            <span style={{ color: "oklch(0.65 0.18 18)" }}>sin morir</span>
            <br className="hidden md:block" /> en el intento!
          </h2>

          <p
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.75 0.015 30)" }}
          >
            Una guía completa de Laura Martínez con el paso a paso que toda novia necesita,
            sin importar si tienes un año o tres meses.
          </p>
        </div>

        {/* 3 phases grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {phases.map((phase, i) => (
            <div
              key={phase.label}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "oklch(0.12 0.022 8)",
                border: "1px solid oklch(0.44 0.225 15 / 0.18)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(36px)",
                transition: `opacity 0.6s ease ${i * 0.12 + 0.2}s, transform 0.6s ease ${i * 0.12 + 0.2}s`,
              }}
            >
              {/* Phase top accent */}
              <div
                className="h-0.5 w-full"
                style={{ background: "linear-gradient(90deg, transparent, oklch(0.44 0.225 15 / 0.7), transparent)" }}
              />

              <div className="p-6 md:p-7">
                {/* Phase number */}
                <span
                  className="text-[68px] font-extrabold leading-none select-none absolute top-4 right-5 pointer-events-none"
                  style={{ color: "oklch(0.44 0.225 15 / 0.07)", fontFamily: "var(--font-cormorant)" }}
                >
                  {i + 1}
                </span>

                <div className="relative z-10">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[10px] tracking-[0.3em] uppercase font-semibold mb-3"
                    style={{
                      background: "oklch(0.44 0.225 15 / 0.15)",
                      color: "oklch(0.72 0.18 18)",
                      border: "1px solid oklch(0.44 0.225 15 / 0.25)",
                    }}
                  >
                    {phase.label}
                  </span>

                  <h3
                    className="font-display text-xl md:text-2xl font-bold mb-1"
                    style={{ color: "oklch(0.97 0.005 50)" }}
                  >
                    {phase.label}
                  </h3>

                  <p
                    className="text-xs mb-5 italic"
                    style={{ color: "oklch(0.65 0.18 18)" }}
                  >
                    {phase.tagline}
                  </p>

                  <ul className="space-y-2.5">
                    {phase.steps.map((step) => (
                      <li key={step} className="flex items-start gap-2.5">
                        <ChevronRight
                          className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                          style={{ color: "oklch(0.65 0.18 18)" }}
                        />
                        <span
                          className="text-sm leading-snug"
                          style={{ color: "oklch(0.82 0.015 30)" }}
                        >
                          {step}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s",
          }}
        >
          <a
            href={GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-widest uppercase transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, oklch(0.44 0.225 15), oklch(0.35 0.20 10))",
              color: "#fff",
              boxShadow: "0 0 28px oklch(0.44 0.225 15 / 0.35)",
              letterSpacing: "0.14em",
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

          <div className="flex items-center gap-2" style={{ color: "oklch(0.55 0.012 30)" }}>
            <BookOpen className="w-4 h-4" />
            <span className="text-xs tracking-wide">PDF · Gratuito · Sin registro</span>
          </div>
        </div>

      </div>
    </section>
  )
}
