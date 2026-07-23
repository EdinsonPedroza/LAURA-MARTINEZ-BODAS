"use client"

import { useEffect, useState, type CSSProperties } from "react"
import Image from "next/image"
import { Calendar, MessageCircle } from "lucide-react"
import { Magnetic } from "@/components/magnetic"

const WHATSAPP_URL =
  "https://wa.me/573186049903?text=" +
  encodeURIComponent("Hola Laura, estoy interesado/a en tus servicios de wedding planner.")

const InstagramIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const FacebookIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

export function Hero() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80)
    return () => clearTimeout(t)
  }, [])

  const fade = (i: number): CSSProperties => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "none" : "translateY(16px)",
    transition: `opacity 1s ${0.1 + i * 0.12}s cubic-bezier(0.22,1,0.36,1), transform 1s ${0.1 + i * 0.12}s cubic-bezier(0.22,1,0.36,1)`,
  })

  return (
    <section id="hero" className="relative min-h-svh flex items-center overflow-hidden">

      {/* ── Full-bleed photo — sparkler exit, dark and dramatic, no watermark ── */}
      <Image
        src="/images/3.jpg"
        alt="Salida de los novios entre luces de bengala, boda real en el Valle del Cauca"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "50% 45%" }}
      />

      {/* Scrim — kept light at the sides, concentrated behind the text */}
      <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/20" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 100% 95% at 50% 42%, rgba(0,0,0,0.55) 0%, transparent 80%)" }}
      />

      {/* ── Vertical social rail — desktop only ── */}
      <div className="hidden lg:flex flex-col gap-5 absolute left-8 top-1/2 -translate-y-1/2 z-10">
        <a
          href="https://www.instagram.com/bodaslauramartinez"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-white/70 hover:text-white transition-colors duration-300"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://facebook.com/bodasLauraMartinez"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-white/70 hover:text-white transition-colors duration-300"
        >
          <FacebookIcon />
        </a>
      </div>

      {/* ── Text overlay — centered ── */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 flex flex-col items-center text-center mt-6 sm:mt-10">
        <div className="max-w-2xl flex flex-col items-center">
          <div className="flex items-center gap-4" style={fade(0)}>
            <span style={{ width: "28px", height: "1px", background: "rgba(255,255,255,0.6)" }} />
            <p className="caps-label" style={{ color: "rgba(255,255,255,0.95)", textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}>
              Wedding planner · Palmira, Valle del Cauca
            </p>
            <span style={{ width: "28px", height: "1px", background: "rgba(255,255,255,0.6)" }} />
          </div>

          <h1
            className="font-fraunces font-light text-balance mt-3"
            style={{
              color: "oklch(1 0 0)",
              fontSize: "clamp(2.2rem, 4.6vw, 4.2rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              textShadow: "0 1px 2px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.65), 0 6px 28px rgba(0,0,0,0.6), 0 14px 56px rgba(0,0,0,0.4)",
              ...fade(1),
            }}
          >
            Hacemos realidad la boda de tus sueños.
          </h1>

          <p
            className="font-newsreader mt-7 max-w-md mx-auto leading-[1.8]"
            style={{ color: "rgba(255,255,255,0.82)", textShadow: "0 2px 12px rgba(0,0,0,0.4)", ...fade(2) }}
          >
            Llevo catorce años acompañando parejas en el Valle del Cauca. Mi trabajo
            es que ese día ustedes solo tengan que vivirlo.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4" style={fade(3)}>
            <Magnetic>
              <a
                href="#contacto"
                className="btn-paper group"
                style={{ padding: "0.95rem 2rem", fontSize: "0.72rem" }}
                data-testid="hero-cta-primary"
              >
                <Calendar className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                Agendar asesoría gratuita
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light group"
                style={{ padding: "0.95rem 2rem", fontSize: "0.72rem" }}
                data-testid="hero-cta-whatsapp"
              >
                <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Escríbenos por WhatsApp
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
