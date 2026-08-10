"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const services = [
  {
    image: "/images/3.jpg",
    objectPosition: "center 70%",
    title: "Planificación Full Time",
    description: "Tú sueñas el momento, nosotros nos encargamos de hacerlo realidad. Gestión completa de tu boda de principio a fin.",
    detail: "Definimos juntos el concepto y la estética, elegimos a cada proveedor, cuidamos el presupuesto y armamos el cronograma. El día de la boda estamos ahí, coordinando todo para que tu única tarea sea disfrutar.",
    whatsappMessage: "Hola Laura, me interesa el servicio de Wedding Planner Full Time. Me gustaría recibir más información.",
  },
  {
    image: "/images/7.jpg",
    title: "Coordinación Love Day",
    description: "Ya organizaste todo, pero necesitas que el día sea perfecto. Nuestro equipo asegura que nada falle.",
    detail: "Nos integramos a lo que ya construiste: revisamos cada contrato, armamos el timeline hora por hora y supervisamos a todos los proveedores. Si algo se sale del plan, lo resolvemos antes de que llegue a ti.",
    whatsappMessage: "Hola Laura, me interesa el servicio de Coordinación Love Day. Me gustaría recibir más información.",
  },
  {
    image: "/images/atardecer.jpg",
    title: "Bodas Destino",
    description: "Vives fuera pero quieres casarte en Colombia. Organizamos todo de forma remota, sin complicaciones.",
    detail: "Buscamos el lugar, negociamos con proveedores locales y coordinamos cada detalle desde acá, manteniéndote al día con videollamadas y avances según tu horario. Aterrizas y todo está listo.",
    whatsappMessage: "Hola Laura, me interesa el servicio de Bodas Destino. Vivo fuera de Colombia y me gustaría organizar mi boda allá.",
  },
  {
    image: "/images/asesoria-virtual.webp",
    title: "Asesoría Virtual",
    description: "Sesión personalizada para resolver todas tus dudas y darte el plan de acción que necesitas.",
    detail: "Dos horas para ordenar las ideas: revisamos tu presupuesto, priorizamos lo que de verdad importa y salimos con un plan escrito, paso a paso, para que sigas avanzando con confianza.",
    whatsappMessage: "Hola Laura, me interesa la Asesoría Virtual de 2 horas. Me gustaría agendar una sesión.",
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleClick = (msg: string) => {
    const url = `https://wa.me/573186049903?text=${encodeURIComponent(msg)}`
    if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
      window.location.href = url
    } else {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative overflow-hidden"
      style={{ background: "oklch(0.983 0.014 52)" }}
    >
      {/* SVG fractal noise — warm paper grain */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23n)' opacity='0.038'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "320px 320px",
        }}
      />

      {/* Warm off-center light bloom */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 75% 80% at 40% 42%, oklch(0.994 0.006 56 / 0.85) 0%, transparent 100%)",
        }}
      />

      {/* Directional edge darkening — bottom heavier */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 50%, oklch(0.96 0.014 50 / 0.4) 100%)",
        }}
      />

      {/* Crimson warmth — top-right corner blush */}
      <div className="absolute -top-10 -right-10 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.44 0.225 15 / 0.06) 0%, transparent 65%)" }}
      />

      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 10%, oklch(0.44 0.225 15 / 0.20) 50%, transparent 90%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 10%, oklch(0.44 0.225 15 / 0.10) 50%, transparent 90%)" }}
      />

      <div className="container mx-auto px-4 pt-12 md:pt-16 pb-20 md:pb-28 relative z-10">

        {/* Header */}
        <div
          className="max-w-2xl mx-auto text-center mb-16 md:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 48px, 0)",
            transition: "opacity var(--reveal-lg) cubic-bezier(0.16,1,0.3,1), transform var(--reveal-lg) cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-accent mb-5 block font-semibold mx-auto">
            Servicios
          </span>
          <h2 className="font-fraunces text-4xl md:text-5xl lg:text-[3.4rem] font-normal text-foreground leading-[1.0] tracking-tight mb-5 mx-auto">
            Tu gran día comienza aquí{" "}
            <span className="font-fraunces font-normal text-accent">Descúbrelo</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-lg mx-auto">
            Cada historia de amor es única. Tu celebración merece una atención igual de especial.
          </p>
        </div>

        {/* Service list */}
        <div className="space-y-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group cursor-default"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 56px, 0)",
                transition: "opacity var(--reveal-lg) cubic-bezier(0.16,1,0.3,1), transform var(--reveal-lg) cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `calc(${i * 90 + 120}ms * var(--stagger-scale))`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="grid md:grid-cols-[2fr_3fr] rounded-2xl overflow-hidden"
                style={{
                  background: "oklch(0.995 0.005 50)",
                  border: hovered === i
                    ? "1px solid oklch(0.44 0.225 15 / 0.40)"
                    : "1px solid oklch(0.44 0.225 15 / 0.10)",
                  boxShadow: hovered === i
                    ? "0 24px 50px rgba(0,0,0,0.16), 0 0 30px oklch(0.44 0.225 15 / 0.10)"
                    : "0 4px 20px rgba(0,0,0,0.08)",
                  transform: hovered === i
                    ? "translate3d(0, -14px, 0)"
                    : "translate3d(0, 0, 0)",
                  transition: "border 0.45s ease, box-shadow 0.45s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                {/* Image */}
                <div className="relative h-44 md:h-auto overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                    style={{
                      objectPosition: (s as any).objectPosition || "center center",
                      transform: hovered === i ? "scale(1.06)" : "scale(1)",
                      transition: "transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to right, rgba(0,0,0,0.12) 0%, transparent 100%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  className="p-5 md:p-7 flex flex-col justify-center relative overflow-hidden"
                  style={{
                    backgroundColor: "oklch(0.995 0.005 50)",
                    backgroundImage: "radial-gradient(circle at 1px 1px, oklch(0.44 0.225 15 / 0.10) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                >
                  {/* Hover glow inside content */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at 0% 50%, oklch(0.44 0.225 15 / 0.08) 0%, transparent 60%)",
                      opacity: hovered === i ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }}
                  />

                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-8 bottom-8 rounded-r-full pointer-events-none"
                    style={{
                      width: hovered === i ? "3px" : "1px",
                      background: "linear-gradient(to bottom, transparent, oklch(0.44 0.225 15), transparent)",
                      boxShadow: hovered === i ? "0 0 10px oklch(0.44 0.225 15 / 0.7)" : "none",
                      transition: "width 0.3s, box-shadow 0.3s",
                    }}
                  />

                  <div className="relative z-10">
                    <h3
                      className="font-display text-xl md:text-2xl font-extrabold tracking-wide mb-4"
                      style={{
                        color: hovered === i ? "oklch(0.44 0.225 15)" : "oklch(0.10 0.025 8)",
                        transition: "color 0.3s",
                        wordSpacing: "0.15em",
                      }}
                    >
                      {s.title}
                    </h3>

                    <p className="text-base leading-relaxed mb-3 max-w-lg" style={{ color: "oklch(0.10 0.025 8)" }}>
                      {s.description}
                    </p>

                    {/* Secondary copy — expands on the service */}
                    <p
                      className="text-sm leading-relaxed mb-4 max-w-lg"
                      style={{ color: "oklch(0.32 0.020 15)" }}
                    >
                      {s.detail}
                    </p>

                    {/* Divider */}
                    <div
                      className="mb-3"
                      style={{
                        height: "1px",
                        background: "linear-gradient(90deg, oklch(0.44 0.225 15 / 0.25), transparent)",
                      }}
                    />

                    {/* CTA */}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleClick(s.whatsappMessage)}
                        className="inline-flex items-center justify-center gap-2 group/btn cursor-pointer overflow-hidden relative"
                        style={{
                          padding: "8px 20px",
                          borderRadius: "40px",
                          fontFamily: "var(--font-inter)",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "oklch(0.44 0.225 15)",
                          background: "oklch(0.44 0.225 15 / 0.06)",
                          border: "1px solid oklch(0.44 0.225 15 / 0.35)",
                          boxShadow: "0 0 16px oklch(0.44 0.225 15 / 0.10)",
                          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                          e.currentTarget.style.background = "oklch(0.44 0.225 15 / 0.12)";
                          e.currentTarget.style.border = "1px solid oklch(0.44 0.225 15 / 0.9)";
                          e.currentTarget.style.boxShadow = "0 0 25px oklch(0.44 0.225 15 / 0.22)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0) scale(1)";
                          e.currentTarget.style.background = "oklch(0.44 0.225 15 / 0.06)";
                          e.currentTarget.style.border = "1px solid oklch(0.44 0.225 15 / 0.35)";
                          e.currentTarget.style.boxShadow = "0 0 16px oklch(0.44 0.225 15 / 0.10)";
                        }}
                      >
                        <span className="relative z-10 text-center">Me interesa este servicio</span>
                        <ArrowRight
                          className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1.5"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.44 0.225 15 / 0.18), transparent)" }} />
    </section>
  )
}
