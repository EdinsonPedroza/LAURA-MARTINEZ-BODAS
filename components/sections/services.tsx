"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Check, ArrowRight } from "lucide-react"

const services = [
  {
    number: "01",
    image: "/images/boda.png",
    objectPosition: "center 70%",
    title: "Planificación Full Time",
    subtitle: "Desde el primer sí hasta el último baile",
    description: "Tú sueñas el momento, nosotros nos encargamos de hacerlo realidad. Gestión completa de tu boda de principio a fin.",
    features: ["Proveedores seleccionados", "Logística completa", "Planificación detallada", "Coordinación total"],
    whatsappMessage: "Hola Laura, me interesa el servicio de Wedding Planner Full Time. Me gustaría recibir más información.",
  },
  {
    number: "02",
    image: "/images/service-coordination.jpg",
    title: "Coordinación Love Day",
    subtitle: "El gran día en manos expertas",
    description: "Ya organizaste todo, pero necesitas que el día sea perfecto. Nuestro equipo asegura que nada falle.",
    features: ["Supervisión del evento", "Coordinación de proveedores", "Timeline del día", "Resolución de imprevistos"],
    whatsappMessage: "Hola Laura, me interesa el servicio de Coordinación Love Day. Me gustaría recibir más información.",
  },
  {
    number: "03",
    image: "/images/service-destination.jpg",
    title: "Bodas Destino",
    subtitle: "Colombia como escenario de tu amor",
    description: "Vives fuera pero quieres casarte en Colombia. Organizamos todo de forma remota, sin complicaciones.",
    features: ["Organización remota", "Venue scouting", "Proveedores locales", "Coordinación internacional"],
    whatsappMessage: "Hola Laura, me interesa el servicio de Bodas Destino. Vivo fuera de Colombia y me gustaría organizar mi boda allá.",
  },
  {
    number: "04",
    image: "/images/Gemini_Generated_Image_8hax0w8hax0w8hax.png",
    title: "Asesoría Virtual",
    subtitle: "2 horas de claridad y dirección",
    description: "Sesión personalizada para resolver todas tus dudas y darte el plan de acción que necesitas.",
    features: ["Optimización de presupuesto", "Organización correcta", "Consejos profesionales", "Plan de acción"],
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
    window.open(`https://wa.me/573186049903?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer")
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

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">

        {/* Header */}
        <div
          className="max-w-2xl mx-auto text-center mb-16 md:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(80px) scale(0.92)",
            filter: isVisible ? "blur(0)" : "blur(14px)",
            transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1), filter 1.1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-accent mb-5 block font-semibold mx-auto">
            Servicios
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-foreground leading-[1.0] tracking-tight mb-5 mx-auto">
            Qué hacemos{" "}
            <span className="font-serif font-black text-accent italic">por ti.</span>
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
                transform: isVisible ? "translateY(0) scale(1)" : "translateY(70px) scale(0.94)",
                filter: isVisible ? "blur(0)" : "blur(10px)",
                transition: `opacity 1s ${i * 150 + 200}ms cubic-bezier(0.16,1,0.3,1), transform 1s ${i * 150 + 200}ms cubic-bezier(0.16,1,0.3,1), filter 1s ${i * 150 + 200}ms cubic-bezier(0.16,1,0.3,1)`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="grid md:grid-cols-[2fr_3fr] rounded-2xl overflow-hidden"
                style={{
                  background: "oklch(0.10 0.020 8)",
                  border: hovered === i
                    ? "1px solid oklch(0.44 0.225 15 / 0.40)"
                    : "1px solid oklch(0.44 0.225 15 / 0.10)",
                  boxShadow: hovered === i
                    ? "0 24px 60px rgba(0,0,0,0.6), 0 0 40px oklch(0.44 0.225 15 / 0.10)"
                    : "0 4px 24px rgba(0,0,0,0.35)",
                  transform: hovered === i ? "translateY(-5px)" : "translateY(0)",
                  transition: "border 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
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
                  {/* Service number */}
                  <div
                    className="absolute top-4 left-4 font-display font-black leading-none select-none"
                    style={{
                      fontSize: "3.5rem",
                      color: "rgba(255,255,255,0.18)",
                      letterSpacing: "-0.05em",
                    }}
                  >
                    {s.number}
                  </div>
                </div>

                {/* Content */}
                <div
                  className="p-5 md:p-7 flex flex-col justify-center relative overflow-hidden"
                  style={{
                    backgroundColor: "oklch(0.10 0.020 8)",
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
                    {/* Badge */}
                    <span
                      className="inline-block self-start px-3 py-1 rounded-full text-[10px] tracking-[0.3em] uppercase font-semibold mb-2"
                      style={{
                        background: "oklch(0.44 0.225 15 / 0.15)",
                        color: "oklch(0.65 0.18 18)",
                        border: "1px solid oklch(0.44 0.225 15 / 0.20)",
                      }}
                    >
                      {s.subtitle}
                    </span>

                    <h3
                      className="font-display text-xl md:text-2xl font-extrabold tracking-tight mt-2 mb-4"
                      style={{
                        color: hovered === i ? "oklch(0.72 0.18 18)" : "oklch(0.97 0.005 50)",
                        transition: "color 0.3s",
                        textShadow: hovered === i ? "0 0 30px oklch(0.44 0.225 15 / 0.3)" : "none",
                      }}
                    >
                      {s.title}
                    </h3>

                    <p className="text-sm leading-relaxed mb-3 max-w-md" style={{ color: "oklch(0.65 0.012 30)" }}>
                      {s.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 mb-4">
                      {s.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "oklch(0.44 0.225 15 / 0.20)" }}
                          >
                            <Check className="w-2.5 h-2.5" style={{ color: "oklch(0.65 0.18 18)" }} />
                          </div>
                          <span className="text-xs font-semibold" style={{ color: "oklch(0.62 0.012 30)" }}>{f}</span>
                        </div>
                      ))}
                    </div>

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
                          color: "#ffffff",
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.4)",
                          boxShadow: "0 0 16px rgba(255, 255, 255, 0.12)",
                          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                          e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.9)";
                          e.currentTarget.style.boxShadow = "0 0 25px rgba(255, 255, 255, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0) scale(1)";
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                          e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.4)";
                          e.currentTarget.style.boxShadow = "0 0 16px rgba(255, 255, 255, 0.12)";
                        }}
                      >
                        <span className="relative z-10 text-center">Quiero este servicio</span>
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
