"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Wallet, Sparkles, Clock, Heart, Shield, Users } from "lucide-react"

const benefits = [
  {
    icon: Wallet,
    title: "Optimiza tu presupuesto",
    description: "Acceso a proveedores aliados con precios exclusivos que maximizan cada peso invertido.",
  },
  {
    icon: Sparkles,
    title: "Detalles impecables",
    description: "Cada elemento es cuidadosamente seleccionado para crear una experiencia visualmente elegante.",
  },
  {
    icon: Clock,
    title: "Tu tiempo es valioso",
    description: "Nos encargamos de todo para que solo te preocupes por disfrutar cada momento.",
  },
  {
    icon: Heart,
    title: "Conexión emocional",
    description: "Entendemos tus sueños y los transformamos en una celebración que refleja tu historia de amor.",
  },
  {
    icon: Shield,
    title: "Tranquilidad total",
    description: "Respaldados por certificaciones internacionales que garantizan profesionalismo y calidad.",
  },
  {
    icon: Users,
    title: "Equipo dedicado",
    description: "Un equipo completo trabajando para que tu día sea absolutamente perfecto.",
  },
]

type Tilt = { x: number; y: number }

export function Benefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [tilts, setTilts] = useState<Record<number, Tilt>>({})
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 18
    setTilts(prev => ({ ...prev, [index]: { x, y } }))
  }

  const handleMouseLeave = (index: number) => {
    setTilts(prev => ({ ...prev, [index]: { x: 0, y: 0 } }))
    setHovered(null)
  }

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery-lighting.jpg"
          alt="Decoración de bodas"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/82" />
        {/* Light effects */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/8 rounded-full blur-[140px] animate-float animation-delay-600" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[180px]" />
      </div>

      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent z-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.96)",
            transition: "opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span className="font-display text-[11px] tracking-[0.45em] uppercase mb-4 block font-medium"
            style={{ color: "oklch(0.60 0.20 18)" }}>
            Por Qué Elegirnos
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 text-balance leading-[1.0] tracking-tight">
            La diferencia de trabajar con{" "}
            <span className="font-serif font-black" style={{ color: "oklch(0.60 0.20 18)" }}>profesionales</span>
          </h2>
          <p className="text-white/75 text-base md:text-lg font-light">
            Más de 100 parejas felices nos respaldan
          </p>
        </div>

        {/* 3D tilt benefit cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, index) => {
            const tilt = tilts[index] || { x: 0, y: 0 }
            const delay = index * 100
            return (
              <div
                key={benefit.title}
                className="card-3d-wrap"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.94)",
                  transition: `opacity 0.9s ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 0.9s ${delay}ms cubic-bezier(0.16,1,0.3,1)`,
                }}
              >
                <div
                  className="card-3d relative p-8 rounded-2xl bg-white border border-gray-100 shadow-xl overflow-hidden cursor-default"
                  style={{
                    transform: hovered === index
                      ? `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-10px) scale(1.02)`
                      : "perspective(1200px) rotateX(0) rotateY(0) translateY(0) scale(1)",
                    boxShadow: hovered === index
                      ? "0 40px 80px rgba(0,0,0,0.2), 0 0 60px oklch(0.45 0.15 25 / 0.15)"
                      : "0 10px 30px rgba(0,0,0,0.1)",
                    transition: hovered === index
                      ? "transform 0.1s ease, box-shadow 0.3s ease"
                      : "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease",
                  }}
                  onMouseMove={(e) => { setHovered(index); handleMouseMove(e, index) }}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  {/* Glow overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), oklch(0.45 0.15 25 / 0.08) 0%, transparent 60%)",
                      opacity: hovered === index ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  />

                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-8 bottom-8 rounded-r-full"
                    style={{
                      width: hovered === index ? "4px" : "2px",
                      background: "linear-gradient(to bottom, transparent, oklch(0.45 0.15 25), transparent)",
                      boxShadow: hovered === index ? "0 0 12px oklch(0.45 0.15 25 / 0.5)" : "none",
                      transition: "width 0.3s ease, box-shadow 0.3s ease",
                    }}
                  />

                  {/* Content */}
                  <div className="flex items-start gap-5 relative z-10">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
                      style={{
                        background: hovered === index
                          ? "oklch(0.45 0.15 25)"
                          : "oklch(0.45 0.15 25 / 0.9)",
                        transform: hovered === index ? "scale(1.15) rotate(6deg)" : "scale(1) rotate(0deg)",
                        boxShadow: hovered === index ? "0 10px 30px oklch(0.45 0.15 25 / 0.4)" : "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, background 0.3s ease",
                      }}
                    >
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3
                        className="font-display text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 tracking-tight"
                        style={{ color: hovered === index ? "oklch(0.45 0.15 25)" : "oklch(0.12 0.025 5)" }}
                      >
                        {benefit.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm font-medium">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div
          className="mt-16 flex flex-wrap justify-center gap-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1s 0.5s cubic-bezier(0.16,1,0.3,1), transform 1s 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {[
            { number: "14+", label: "Años creando bodas" },
            { number: "100+", label: "Parejas felices" },
            { number: "15+", label: "Destinos internacionales" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center group cursor-default"
            >
              <div
                className="font-display text-6xl text-white font-black mb-1 transition-all duration-500 group-hover:text-accent"
                style={{ textShadow: "0 0 0 transparent", transition: "color 0.4s ease, text-shadow 0.4s ease" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.textShadow = "0 0 40px oklch(0.45 0.15 25 / 0.5), 0 0 80px oklch(0.45 0.15 25 / 0.2)"
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.textShadow = "0 0 0 transparent"
                }}
              >
                {stat.number}
              </div>
              <div className="text-white/70 text-sm tracking-wider group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div
          className="mt-16 flex justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1s 0.7s ease",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-accent" />
            <div className="w-2 h-2 bg-accent rounded-full animate-float shadow-lg shadow-accent/50" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-accent" />
          </div>
        </div>
      </div>
    </section>
  )
}
