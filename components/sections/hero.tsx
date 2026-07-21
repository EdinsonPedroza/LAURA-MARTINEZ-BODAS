"use client"

import { useEffect, useState, type CSSProperties } from "react"
import Image from "next/image"
import { Calendar, MessageCircle, ChevronDown, ArrowRight } from "lucide-react"

type GlassPhoto = {
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

// Collage a lado y lado — piezas superpuestas con distinto tamaño/rotación, título en el centro
const glassPhotos: GlassPhoto[] = [
  // ── Izquierda ──
  {
    src: "/images/gallery-couple.jpg",
    alt: "Pareja de novios celebrando",
    side: "left",
    pos: { top: "16%", left: "2%" },
    size: { w: 158, h: 196 },
    rotate: -8,
    delay: 0.55,
    floatDelay: 0,
    z: 12,
    minBreak: "md",
  },
  {
    src: "/images/gallery-bouquet.jpg",
    alt: "Ramo de novia con detalles florales",
    side: "left",
    pos: { top: "38%", left: "10%" },
    size: { w: 122, h: 152 },
    rotate: 6,
    delay: 0.75,
    floatDelay: 1.1,
    z: 13,
    minBreak: "md",
  },
  {
    src: "/images/gallery-table.jpg",
    alt: "Decoración de mesa para boda",
    side: "left",
    pos: { top: "60%", left: "1%" },
    size: { w: 112, h: 140 },
    rotate: -4,
    delay: 0.95,
    floatDelay: 2.1,
    z: 11,
    minBreak: "lg",
  },
  // ── Derecha ──
  {
    src: "/images/gallery-ceremony.jpg",
    alt: "Ceremonia de boda decorada",
    side: "right",
    pos: { top: "14%", right: "2%" },
    size: { w: 158, h: 196 },
    rotate: 8,
    delay: 0.6,
    floatDelay: 0.6,
    z: 12,
    minBreak: "md",
  },
  {
    src: "/images/gallery-venue.jpg",
    alt: "Lugar para recepción de boda",
    side: "right",
    pos: { top: "37%", right: "10%" },
    size: { w: 122, h: 152 },
    rotate: -6,
    delay: 0.8,
    floatDelay: 1.6,
    z: 13,
    minBreak: "md",
  },
  {
    src: "/images/gallery-lighting.jpg",
    alt: "Iluminación decorativa para boda",
    side: "right",
    pos: { top: "59%", right: "1%" },
    size: { w: 110, h: 138 },
    rotate: 5,
    delay: 1.0,
    floatDelay: 2.4,
    z: 11,
    minBreak: "lg",
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

  const glassReveal = (photo: GlassPhoto) => ({
    opacity: visible ? 1 : 0,
    transform: visible
      ? `translateY(0) rotate(${photo.rotate}deg) scale(1)`
      : `translateY(${photo.side === "left" ? "-" : ""}40px) translateX(${photo.side === "left" ? "-70px" : "70px"}) rotate(${photo.rotate * 2.4}deg) scale(0.8)`,
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
          style={{ objectPosition: "50% 28%" }}
          priority
        />
        {/* Vignette radial — oscuro en el centro (texto), claro en las esquinas (fotos) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 62% 58% at 50% 56%, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 100%)",
          }}
        />
        {/* Top vignette */}
        <div
          className="absolute top-0 left-0 right-0 h-36 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)" }}
        />
        {/* Bottom vignette — legibilidad del indicador de scroll */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
        />
      </div>

      {/* Collage de fotos — Glassmorphism, a lado y lado del título centrado */}
      {glassPhotos.map((photo, i) => (
        <div
          key={photo.src}
          className={photo.minBreak === "lg" ? "hidden lg:block absolute" : "hidden md:block absolute"}
          style={{ ...photo.pos, zIndex: photo.z, ...glassReveal(photo) }}
        >
          <div
            className="animate-float"
            style={{ animationDelay: `${photo.floatDelay}s` }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                width: "clamp(88px, 8vw, " + photo.size.w + "px)",
                height: "clamp(110px, 10vw, " + photo.size.h + "px)",
                borderRadius: "1.25rem",
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.30)",
                boxShadow: "0 24px 50px -14px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.35)",
                padding: "6px",
              }}
            >
              <div className="relative w-full h-full rounded-[0.9rem] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="180px"
                  className="object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                {/* Glass sheen */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0) 45%)" }}
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
              Wedding Planner · Palmira
              <span style={{ width: "24px", height: "1px", background: "oklch(0.65 0.225 15)" }} />
            </span>
          </div>

          {/* Headline — the star of the show */}
          <div style={revealUp(0.35)}>
            <h1
              className="font-serif font-light text-white leading-[1.05] mb-5"
              style={{
                fontSize: "clamp(2.3rem, 5.2vw, 4.2rem)",
                letterSpacing: "-0.02em",
                textShadow:
                  "0 2px 4px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.7), 0 16px 64px rgba(0,0,0,0.4)",
              }}
            >
              Hacemos realidad<br />
              <em
                style={{
                  fontStyle: "italic",
                  color: "oklch(0.65 0.225 15)",
                  textShadow:
                    "0 0 60px oklch(0.44 0.225 15 / 0.7), 0 2px 4px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.7)",
                }}
              >
                la boda de tus sueños
              </em>
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
                fontSize: "clamp(0.88rem, 1.2vw, 1rem)",
                lineHeight: 1.75,
                maxWidth: "380px",
                color: "rgba(255,255,255,0.88)",
                textShadow: "0 1px 4px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.6)",
                letterSpacing: "0.01em",
                marginBottom: "2.5rem",
              }}
            >
              Cada detalle, cada emoción, cada instante.<br />
              Creamos experiencias únicas con pasión y dedicación.
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
