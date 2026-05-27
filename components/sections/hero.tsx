"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Calendar, MessageCircle, ChevronDown } from "lucide-react"

export function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120)
    return () => clearTimeout(t)
  }, [])

  const slideLeft = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translateX(0) skewX(0deg) scale(1)"
      : "translateX(-80px) skewX(-6deg) scale(0.88)",
    filter: visible ? "blur(0)" : "blur(12px)",
    transition: `opacity 1.1s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 1.2s ${delay}s cubic-bezier(0.16,1,0.3,1), filter 1s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
  })

  return (
    <section id="hero" className="relative h-[100svh] min-h-[500px] overflow-hidden bg-black">

      {/* Image — full screen */}
      <div
        className="absolute inset-0 z-0"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(1.05)",
          transition: "opacity 2.5s 0.1s ease, transform 8s 0.1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Image
          src="/images/noviosfelices.jpg"
          alt="Boda de ensueño"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "0% 30%", transform: "translateX(4%)" }}
          priority
        />
        {/* Difuminación izquierda — la sombra termina antes de llegar a la novia */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,1) 5%, rgba(0,0,0,0.85) 11%, rgba(0,0,0,0.3) 39%, rgba(0,0,0,0) 47%)",
          }}
        />
        {/* Top vignette */}
        <div
          className="absolute top-0 left-0 right-0 h-36 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45), transparent)" }}
        />
      </div>

      {/* Content — tercio inferior */}
      <div className="relative z-10 h-full flex items-end pb-[20svh] md:pb-[15svh]">
        <div className="w-full pl-8 sm:pl-12 md:pl-16 lg:pl-24 xl:pl-32 pr-6">
          <div className="max-w-[500px]">

            {/* Headline — the star of the show */}
            <div style={slideLeft(0.35)}>
              <h1
                className="font-serif font-light text-white leading-[1.03] mb-5"
                style={{
                  fontSize: "clamp(2.4rem, 4.2vw, 4.5rem)",
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
            <div style={slideLeft(0.5)}>
              <div
                className="mb-5"
                style={{
                  width: visible ? "48px" : "0px",
                  height: "1px",
                  background: "linear-gradient(90deg, oklch(0.44 0.225 15), oklch(0.44 0.225 15 / 0.1))",
                  transition: "width 1s 1.2s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>

            {/* Subtitle */}
            <div style={slideLeft(0.6)}>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 300,
                  fontSize: "clamp(0.88rem, 1.2vw, 1rem)",
                  lineHeight: 1.75,
                  maxWidth: "340px",
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
            <div style={slideLeft(0.72)}>
              <div className="flex flex-col sm:flex-row gap-3">

                {/* Primary */}
                <a
                  href="#contacto"
                  className="btn-elegant inline-flex items-center justify-center gap-2.5 text-white"
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
                    el.style.boxShadow = "0 12px 44px oklch(0.44 0.225 15 / 0.85), 0 4px 16px rgba(0,0,0,0.6)"
                    el.style.transform = "translateY(-3px) scale(1.03)"
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = "0 4px 24px oklch(0.44 0.225 15 / 0.65), 0 2px 8px rgba(0,0,0,0.5)"
                    el.style.transform = "translateY(0) scale(1)"
                  }}
                >
                  <Calendar className="h-3.5 w-3.5 flex-shrink-0 relative z-10" />
                  <span className="relative z-10">Asesoría gratuita</span>
                </a>

                {/* Secondary */}
                <a
                  href="https://wa.me/573186049903?text=Hola%20Laura,%20estoy%20interesado/a%20en%20tus%20servicios%20de%20wedding%20planner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5"
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
                </a>
              </div>
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
