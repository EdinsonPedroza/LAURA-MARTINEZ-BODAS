"use client"

import { useEffect, useState, type CSSProperties } from "react"
import Image from "next/image"
import { Calendar, MessageCircle, ChevronDown, ArrowRight } from "lucide-react"

type CollagePhoto = {
  src: string
  alt: string
  side: "left" | "right"
  pos: CSSProperties
  size: { w: number; h: number }
  rotate: number
  delay: number
  floatDelay: number
  z: number
  /** breakpoint desde el cual se muestra — las piezas pequeñas del collage solo aparecen en pantallas más grandes */
  minBreak: "md" | "lg"
}

// Collage a lado y lado — cluster compacto de fotos superpuestas (estilo Polaroid), título en el centro
const collagePhotos: CollagePhoto[] = [
  // ── Izquierda — cluster superpuesto ──
  {
    src: "/images/Decoracion.jpg",
    alt: "Decoración de mesa de boda",
    side: "left",
    pos: { top: "22%", left: "0%" },
    size: { w: 148, h: 182 },
    rotate: -11,
    delay: 0.55,
    floatDelay: 0,
    z: 11,
    minBreak: "lg",
  },
  {
    src: "/images/1.jpg",
    alt: "Beso de novios",
    side: "left",
    pos: { top: "30%", left: "9%" },
    size: { w: 196, h: 240 },
    rotate: 4,
    delay: 0.7,
    floatDelay: 0.9,
    z: 13,
    minBreak: "md",
  },
  {
    src: "/images/2.jpg",
    alt: "Novios felices",
    side: "left",
    pos: { top: "56%", left: "3%" },
    size: { w: 150, h: 186 },
    rotate: -6,
    delay: 0.9,
    floatDelay: 1.7,
    z: 12,
    minBreak: "md",
  },
  // ── Derecha — cluster superpuesto (espejo) ──
  {
    src: "/images/atardecer.jpg",
    alt: "Iluminación romántica de boda",
    side: "right",
    pos: { top: "20%", right: "0%" },
    size: { w: 148, h: 182 },
    rotate: 10,
    delay: 0.6,
    floatDelay: 0.5,
    z: 11,
    minBreak: "lg",
  },
  {
    src: "/images/3.jpg",
    alt: "Ceremonia de boda",
    side: "right",
    pos: { top: "29%", right: "9%" },
    size: { w: 196, h: 240 },
    rotate: -5,
    delay: 0.75,
    floatDelay: 1.3,
    z: 13,
    minBreak: "md",
  },
  {
    src: "/images/4.jpg",
    alt: "Ceremonia en iglesia",
    side: "right",
    pos: { top: "55%", right: "2%" },
    size: { w: 150, h: 186 },
    rotate: 7,
    delay: 0.95,
    floatDelay: 2.2,
    z: 12,
    minBreak: "md",
  },
]

export function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120)
    return () => clearTimeout(t)
  }, [])

  const revealUp = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(26px) scale(0.96)",
    transition: `opacity 1.1s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 1.2s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
  })

  const collageReveal = (photo: CollagePhoto) => ({
    opacity: visible ? 1 : 0,
    transform: visible
      ? `translateY(0) rotate(${photo.rotate}deg) scale(1)`
      : `translateY(${photo.side === "left" ? "-" : ""}18px) translateX(${photo.side === "left" ? "-32px" : "32px"}) rotate(${photo.rotate * 1.5}deg) scale(0.92)`,
    transition: `opacity 1.3s ${photo.delay}s cubic-bezier(0.16,1,0.3,1), transform 1.4s ${photo.delay}s cubic-bezier(0.16,1,0.3,1)`,
  })

  return (
    <section id="hero" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-black">

      {/* Image — full screen backdrop */}
      <div
        className="absolute inset-0 z-0"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(1.05)",
          transition: "opacity 2.5s 0.1s ease, transform 8s 0.1s cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform, opacity",
        }}
      >
        <Image
          src="/images/noviosfelices.jpg"
          alt="Boda de ensueño"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 28%", filter: "brightness(0.5) saturate(0.82) contrast(1.05)" }}
          priority
        />
        {/* Oscurecimiento uniforme — evita que el fondo "brille" y compita con el texto */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(0,0,0,0.45)" }} />
        {/* Vignette radial — oscuro en el centro (texto), un poco más claro hacia las esquinas (fotos) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 62% 58% at 50% 56%, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.75) 42%, rgba(0,0,0,0.48) 70%, rgba(0,0,0,0.32) 100%)",
          }}
        />
        {/* Top vignette */}
        <div
          className="absolute top-0 left-0 right-0 h-36 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.62), transparent)" }}
        />
        {/* Bottom vignette — legibilidad del indicador de scroll */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.62), transparent)" }}
        />
      </div>

      {/* Collage de fotos — impresas tipo foto física (papel + sombra), a lado y lado del título centrado */}
      {collagePhotos.map((photo, i) => (
        <div
          key={photo.src}
          className={photo.minBreak === "lg" ? "hidden lg:block absolute" : "hidden md:block absolute"}
          style={{ ...photo.pos, zIndex: photo.z, ...collageReveal(photo) }}
        >
          <div
            className="animate-float-soft"
            style={{ animationDelay: `${photo.floatDelay}s` }}
          >
            {/* Marco de papel — Polaroid real: borde blanco parejo, más grueso abajo */}
            <div
              className="relative"
              style={{
                width: "clamp(112px, 10vw, " + photo.size.w + "px)",
                height: "clamp(140px, 12.5vw, " + photo.size.h + "px)",
                borderRadius: "0.3rem",
                background: "oklch(0.995 0.003 50)",
                boxShadow:
                  "0 28px 48px -14px rgba(0,0,0,0.65), 0 6px 14px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(0,0,0,0.05)",
                padding: "8px 8px 20px 8px",
              }}
            >
              <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: "2px" }}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="180px"
                  quality={88}
                  className="object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                {/* Brillo diagonal sutil — gloss de papel fotográfico, no vidrio esmerilado */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 35%)" }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Content — centrado */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-[620px] flex flex-col items-center">

          {/* Eyebrow */}
          <div style={revealUp(0.2)} className="mb-4">
            <span
              className="inline-flex items-center gap-3 uppercase"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.35em",
                color: "rgba(255,255,255,0.75)",
                textShadow: "0 2px 8px rgba(0,0,0,0.7)",
              }}
            >
              <span style={{ width: "24px", height: "1px", background: "oklch(0.65 0.225 15)" }} />
              Valle del Cauca, Colombia
              <span style={{ width: "24px", height: "1px", background: "oklch(0.65 0.225 15)" }} />
            </span>
          </div>

          {/* Headline — the star of the show */}
          <div style={revealUp(0.35)}>
            <h1
              className="text-white leading-[1.05]"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontWeight: 600,
                fontSize: "clamp(2.3rem, 5.2vw, 4.2rem)",
                letterSpacing: "-0.02em",
                marginTop: "14px",
                marginBottom: "6px",
                textShadow:
                  "0 2px 4px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.7), 0 16px 64px rgba(0,0,0,0.4)",
              }}
            >
              Hacemos realidad<br />
              <span
                style={{
                  fontStyle: "normal",
                  color: "oklch(0.65 0.225 15)",
                  textShadow:
                    "0 0 60px oklch(0.44 0.225 15 / 0.7), 0 2px 4px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.7)",
                }}
              >
                la boda de tus sueños
              </span>
            </h1>
          </div>

          {/* Divider */}
          <div style={revealUp(0.5)}>
            <div
              className="mb-5 mx-auto"
              style={{
                width: visible ? "48px" : "0px",
                height: "1px",
                background: "oklch(0.44 0.225 15)",
                transition: "width 1s 1.2s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </div>

          {/* Subtitle */}
          <div style={revealUp(0.6)}>
            <p
              className="mx-auto"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 300,
                fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
                lineHeight: 1.5,
                maxWidth: "320px",
                color: "rgba(255,255,255,0.88)",
                textShadow: "0 1px 4px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.6)",
                letterSpacing: "0.01em",
                marginBottom: "1.75rem",
              }}
            >
              Cada detalle, cada emoción, con pasión y dedicación.
            </p>
          </div>

          {/* CTAs */}
          <div style={revealUp(0.72)}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">

              {/* Primary */}
              <div className="relative inline-flex">
                <span aria-hidden className="cta-glow" />
                <a
                  href="#contacto"
                  className="btn-elegant btn-hero-primary inline-flex items-center justify-center gap-2.5 text-white w-full"
                  style={{
                    padding: "14px 32px",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 500,
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    background: "oklch(0.44 0.225 15)",
                    boxShadow: "0 4px 24px oklch(0.44 0.225 15 / 0.65), 0 2px 8px rgba(0,0,0,0.5)",
                    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = "0 12px 44px oklch(0.44 0.225 15 / 0.9), 0 4px 16px rgba(0,0,0,0.6)"
                    el.style.transform = "translateY(-3px) scale(1.04)"
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = "0 4px 24px oklch(0.44 0.225 15 / 0.65), 0 2px 8px rgba(0,0,0,0.5)"
                    el.style.transform = "translateY(0) scale(1)"
                  }}
                >
                  <Calendar className="cta-icon h-3.5 w-3.5 flex-shrink-0 relative z-10" />
                  <span className="relative z-10">Asesoría gratuita</span>
                </a>
              </div>

              {/* Secondary */}
              <a
                href="https://wa.me/573186049903?text=Hola%20Laura,%20estoy%20interesado/a%20en%20tus%20servicios%20de%20wedding%20planner"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-secondary group inline-flex items-center justify-center gap-2.5"
                style={{
                  padding: "14px 32px",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(255,255,255,0.35)",
                  color: "rgba(255,255,255,0.90)",
                  background: "rgba(0,0,0,0.25)",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "rgba(255,255,255,0.75)"
                  el.style.color = "white"
                  el.style.background = "rgba(255,255,255,0.10)"
                  el.style.transform = "translateY(-3px)"
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "rgba(255,255,255,0.35)"
                  el.style.color = "rgba(255,255,255,0.90)"
                  el.style.background = "rgba(0,0,0,0.25)"
                  el.style.transform = "translateY(0)"
                }}
              >
                <MessageCircle className="h-3.5 w-3.5 flex-shrink-0" />
                Escríbenos
                <ArrowRight className="cta-arrow h-3.5 w-3.5 flex-shrink-0 opacity-70" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator — bounces to invite scroll */}
      <div
        className="absolute bottom-8 left-1/2 z-20 flex flex-col items-center gap-1.5"
        style={{
          opacity: visible ? 1 : 0,
          transform: "translateX(-50%)",
          transition: "opacity 1s 2s ease",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "8px",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          Scroll
        </span>
        {/* Animated line */}
        <div
          className="relative overflow-hidden"
          style={{ width: "1px", height: "36px", background: "rgba(255,255,255,0.15)" }}
        >
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: "40%",
              background: "linear-gradient(to bottom, transparent, oklch(0.44 0.225 15), transparent)",
              animation: visible ? "scroll-line 1.6s ease-in-out 2.2s infinite" : "none",
            }}
          />
        </div>
        <ChevronDown
          className="w-4 h-4"
          style={{ color: "oklch(0.44 0.225 15 / 0.8)", animation: "chevron-bounce 1.5s ease-in-out 2.4s infinite" }}
        />
      </div>

    </section>
  )
}
