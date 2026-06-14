"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const credentials = [
  {
    title: "Formación Profesional",
    description: "Publicista · Universidad Autónoma de Occidente",
    image: "/images/descarga.png",
    alt: "Universidad Autónoma de Occidente",
  },
  {
    title: "Certificación Internacional",
    description: "Especializada con INIBEP",
    image: "/images/Certified-2-PNG-1-1000x1024-1-768x786.png",
    alt: "Certificación INIBEP",
  },
  {
    title: "Certificación ABC",
    description: "Asociación de Consultoras Nupciales",
    image: "/images/1-768x768.png",
    alt: "Certificación ABC",
  },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [yearsCount, setYearsCount] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Counter animation for "14+" badge
  useEffect(() => {
    if (!isVisible) return
    const target = 14
    let current = 0
    const interval = setInterval(() => {
      current = Math.min(current + 1, target)
      setYearsCount(current)
      if (current >= target) clearInterval(interval)
    }, 55)
    return () => clearInterval(interval)
  }, [isVisible])

  useEffect(() => {
    // Skip on touch-only devices (mobile/tablet with no pointer)
    if (window.matchMedia("(hover: none)").matches) return
    const handleMouse = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / 100
      const y = (e.clientY - rect.top - rect.height / 2) / 100
      setMousePos({ x, y })
    }
    window.addEventListener("mousemove", handleMouse, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="quien-soy"
      className="relative overflow-hidden"
      style={{ background: "oklch(0.997 0.003 52)" }}
    >
      {/* SVG fractal noise — fine vellum/cotton paper grain */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='280' height='280' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "280px 280px",
        }}
      />

      {/* Horizontal directional light — brighter towards text column */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to right, oklch(0.975 0.008 48 / 0.6) 0%, oklch(0.998 0.002 52 / 0.9) 55%, oklch(0.990 0.005 50) 100%)",
        }}
      />

      {/* Subtle top light — photographic softbox feel */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 100% 50% at 50% 0%, oklch(1 0 0 / 0.5) 0%, transparent 100%)",
        }}
      />

      {/* Crimson warmth — barely visible, bottom right */}
      <div className="absolute bottom-0 right-0 w-96 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 100% 100%, oklch(0.44 0.225 15 / 0.04) 0%, transparent 65%)" }}
      />

      {/* Top / bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 5%, oklch(0.44 0.225 15 / 0.6) 35%, oklch(0.72 0.065 70 / 0.4) 50%, oklch(0.44 0.225 15 / 0.6) 65%, transparent 95%)", boxShadow: "0 0 12px 1px oklch(0.44 0.225 15 / 0.2)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.44 0.225 15 / 0.3), transparent)" }}
      />

      {/* ────────────── LAYOUT ────────────── */}
      <div className="grid lg:grid-cols-[1fr_1fr] items-stretch min-h-[90vh]">

        {/* ═══ LEFT — IMAGE COLUMN ═══ */}
        <div
          className="relative overflow-hidden min-h-[75vw] lg:min-h-0"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateX(0) skewX(0deg) scale(1) rotate(0deg)"
              : "translateX(-110%) skewX(-10deg) scale(0.82) rotate(-2.5deg)",
            transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1), transform 1.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Ghost watermark number */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-end pointer-events-none z-0 select-none"
            style={{ padding: "2rem", paddingRight: "8%" }}
          >
            <span
              className="font-display font-black leading-none opacity-20 drop-shadow-md"
              style={{
                fontSize: "clamp(5rem, 22vw, 28rem)",
                color: "oklch(0.44 0.225 15 / 0.15)",
                letterSpacing: "-0.06em",
                lineHeight: 1,
                textShadow: "0px 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              {yearsCount}
            </span>
          </div>

          {/* The image — framed elegant card instead of full bleed */}
          <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 lg:p-16 z-10 pointer-events-none">
            <div
              className="relative w-full h-full rounded-[2rem] overflow-hidden pointer-events-auto"
              style={{
                transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)`,
                transition: "transform 0.6s ease-out",
                willChange: "transform",
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <Image
                src="/images/gallery-bouquet.jpg"
                alt="Laura Martinez — Wedding Planner"
                fill
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-cover"
                style={{
                  objectPosition: "center 20%",
                  transform: "scale(1.05)",
                  transition: "transform 1.5s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                loading="lazy"
              />
              
              {/* Inner subtle shadow for depth */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2), inset 0 20px 40px -10px rgba(0,0,0,0.5)",
                }}
              />
            </div>
          </div>

          {/* Vertical label — hidden on mobile to avoid clutter */}
          <div className="hidden md:block absolute top-1/2 right-6 -translate-y-[50%] pointer-events-none z-20"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            <span
              className="font-display text-[9px] tracking-[0.5em] uppercase font-semibold drop-shadow-sm"
              style={{ color: "oklch(0.44 0.225 15 / 0.8)", textShadow: "0px 2px 4px rgba(255,255,255,0.7)" }}
            >
              Wedding Planner · Palmira
            </span>
          </div>

          {/* Bottom info badge */}
          <div className="absolute bottom-[8%] right-[8%] md:right-[6%] lg:right-[4%] z-30 pointer-events-none">
            <div
              className="flex items-center gap-3 md:gap-6 px-4 py-3 md:px-7 md:pt-4 md:pb-5 rounded-2xl md:rounded-[2rem]"
              style={{
                background: "oklch(0.44 0.225 15)",
                color: "white",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1s 0.6s, transform 1s 0.6s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: "0 12px 28px -8px oklch(0.44 0.225 15 / 0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              <div className="flex items-start">
                <span
                  className="font-display font-bold leading-none tracking-tighter"
                  style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
                >
                  {yearsCount}
                </span>
                <span
                  className="font-display font-medium opacity-80"
                  style={{ fontSize: "clamp(0.9rem, 2.5vw, 2.2rem)", marginLeft: "0.05em", marginTop: "0.15em" }}
                >
                  +
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <div className="w-6 md:w-10 h-[1px] md:h-[1.5px] mb-1.5 md:mb-2.5 bg-white/60" />
                <p className="font-display text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-bold text-white/90 leading-[1.6]">
                  Años de<br />experiencia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ RIGHT — TEXT COLUMN ═══ */}
        <div
          className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-20 relative z-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateX(0) skewX(0deg) scale(1)"
              : "translateX(90%) skewX(7deg) scale(0.88)",
            transition: "opacity 1.4s 0.18s cubic-bezier(0.16,1,0.3,1), transform 1.5s 0.18s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: "oklch(0.44 0.225 15)" }} />
            <span className="font-display text-[10px] tracking-[0.55em] uppercase font-semibold"
              style={{ color: "oklch(0.44 0.225 15)" }}>
              Conoce a Laura
            </span>
          </div>

          {/* Heading — oversized, brutal */}
          <h2
            className="font-display font-extrabold leading-[0.92] tracking-tight mb-8"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)", color: "oklch(0.09 0.025 8)" }}
          >
            Con pasión,<br />
            <em className="font-serif font-black not-italic"
              style={{ color: "oklch(0.60 0.20 18)", fontStyle: "italic" }}>
              experiencia
            </em>
            <br />
            y corazón.
          </h2>

          {/* Crimson divider */}
          <div className="flex items-center gap-4 mb-8">
            <div style={{ width: "2.5rem", height: "2px", background: "oklch(0.44 0.225 15)", boxShadow: "0 0 8px oklch(0.44 0.225 15 / 0.6)" }} />
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "oklch(0.44 0.225 15)", boxShadow: "0 0 8px oklch(0.44 0.225 15)" }} />
          </div>

          {/* Bio */}
          <div className="space-y-4 mb-10" style={{ color: "oklch(0.35 0.018 10)" }}>
            <p className="text-base leading-relaxed">
              Soy{" "}
              <strong style={{ color: "oklch(0.10 0.025 8)", fontWeight: 700 }}>
                Publicista de la Universidad Autónoma de Occidente
              </strong>
              , y llevo 14 años organizando bodas con todo mimo, paciencia y responsabilidad.
            </p>
            <p className="text-sm leading-relaxed">
              Me especialicé como Wedding Planner con{" "}
              <strong style={{ color: "oklch(0.10 0.025 8)" }}>INIBEP</strong> y{" "}
              <strong style={{ color: "oklch(0.10 0.025 8)" }}>ABC</strong> — Asociación de Consultoras Nupciales.
            </p>
            <p className="text-sm font-medium italic" style={{ color: "oklch(0.44 0.225 15)" }}>
              Estoy preparada y lista para hacer realidad la boda de tus sueños.
            </p>
          </div>

          {/* Credentials */}
          <div className="space-y-2 mb-10">
            {credentials.map((c, i) => (
              <div
                key={c.title}
                className="flex items-center gap-4 group cursor-default"
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "white",
                  border: "1px solid oklch(0.87 0.012 45)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateX(0) rotate(0deg) scale(1)"
                    : `translateX(110px) rotate(${i % 2 === 0 ? 4 : -3}deg) scale(0.88)`,
                  transition: `opacity 1s ${550 + i * 130}ms cubic-bezier(0.16,1,0.3,1), transform 1s ${550 + i * 130}ms cubic-bezier(0.16,1,0.3,1), border-color 0.3s`,
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "oklch(0.44 0.225 15 / 0.35)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "oklch(0.44 0.225 15 / 0.10)")}
              >
                <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-white flex-shrink-0">
                  <Image src={c.image} alt={c.alt} fill sizes="40px" loading="lazy" className="object-contain p-1" />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: "oklch(0.12 0.025 8)" }}>{c.title}</p>
                  <p className="text-[11px]" style={{ color: "oklch(0.48 0.015 25)" }}>{c.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div
            className="relative pl-5 mb-10"
            style={{
              borderLeft: "2px solid oklch(0.44 0.225 15)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s 700ms cubic-bezier(0.16,1,0.3,1), transform 0.9s 700ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <p className="font-serif text-base font-medium italic leading-relaxed"
              style={{ color: "oklch(0.30 0.018 10)" }}>
              "El día de tu boda, tu único trabajo es disfrutar, bailar, reír y ser feliz."
            </p>
          </div>

          {/* Signature */}
          <div className="flex items-center gap-4 pt-6"
            style={{ borderTop: "1px solid oklch(0.87 0.012 45)" }}>
            <div>
              <p className="font-serif text-2xl font-bold" style={{ color: "oklch(0.60 0.20 18)" }}>
                Laura Martinez
              </p>
              <p className="font-display text-[9px] tracking-[0.35em] uppercase mt-0.5"
                style={{ color: "oklch(0.50 0.015 25)" }}>
                Wedding Planner Certificada
              </p>
            </div>
            <div aria-hidden="true" className="ml-auto flex gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full"
                  style={{ background: i === 0 ? "oklch(0.44 0.225 15)" : "oklch(0.44 0.225 15 / 0.3)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
