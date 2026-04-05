"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Calendar, MessageCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ══════ Particles config ══════ */
const PARTICLES = [
  { size: 3,  top: "14%",  left: "5%",   dur: "8s",   delay: "0s",   opacity: 0.4  },
  { size: 5,  top: "28%",  left: "6%",   dur: "11s",  delay: "1.5s", opacity: 0.25 },
  { size: 2,  top: "52%",  left: "3%",   dur: "7s",   delay: "2.2s", opacity: 0.5  },
  { size: 4,  top: "72%",  left: "7%",   dur: "9s",   delay: "0.7s", opacity: 0.3  },
  { size: 6,  top: "85%",  left: "4%",   dur: "13s",  delay: "3.5s", opacity: 0.18 },
  { size: 2,  top: "40%",  left: "2%",   dur: "6.5s", delay: "1s",   opacity: 0.45 },
  // Right side particles (visible area near couple)
  { size: 3,  top: "20%",  left: "92%",  dur: "9s",   delay: "0.5s", opacity: 0.3  },
  { size: 4,  top: "65%",  left: "95%",  dur: "7.5s", delay: "2s",   opacity: 0.25 },
  { size: 2,  top: "45%",  left: "90%",  dur: "10s",  delay: "4s",   opacity: 0.35 },
]

/* ══════ Word-split helper ══════ */
function SplitWords({
  text,
  baseDelay = 0,
  className = "",
}: {
  text: string
  baseDelay?: number
  className?: string
}) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className={`word-reveal ${className}`}
          style={{ animationDelay: `${baseDelay + i * 0.13}s` }}
        >
          {word}{i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </>
  )
}

export function Hero() {
  const [phase, setPhase] = useState(0)   // 0=loading, 1=image, 2=text, 3=full
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  /* ── Cinematic entrance sequence ── */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100)   // image fades in
    const t2 = setTimeout(() => setPhase(2), 700)   // text starts
    const t3 = setTimeout(() => setPhase(3), 1400)  // CTAs appear
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  /* ── Mouse parallax ── */
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / 30
      const y = (e.clientY - rect.top - rect.height / 2) / 30
      setMousePos({ x, y })
    }
    window.addEventListener("mousemove", handle, { passive: true })
    return () => window.removeEventListener("mousemove", handle)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-black">

      {/* ══ Background — noviosfelices.jpg ══ */}
      <div
        className="absolute inset-0 z-0"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 2s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.07)`,
            transition: "transform 0.6s ease-out",
            willChange: "transform",
          }}
        >
          <Image
            src="/images/noviosfelices.jpg"
            alt="Novios felices — su boda de ensueño"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Gradient layers — heavy left, romantic bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/65 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        <div
          className="hero-vignette absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, transparent 30%, black/40 100%)",
          }}
        />
      </div>

      {/* ══ Crimson light leak — dramatic ══ */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 15% 60%, oklch(0.44 0.225 15 / 0.12) 0%, transparent 50%)",
          opacity: phase >= 2 ? 1 : 0,
          transition: "opacity 2s 1s ease",
        }}
      />

      {/* ══ Particles ══ */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle bg-white"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: p.top,
              left: p.left,
              opacity: phase >= 2 ? p.opacity : 0,
              animationDuration: p.dur,
              animationDelay: p.delay,
              transition: "opacity 1.5s ease",
              background: i % 3 === 0 ? "oklch(0.44 0.225 15 / 0.7)" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
        {/* Diamond shapes */}
        {[
          { s: 5,  t: "30%", l: "8%",  dur: "10s", delay: "1s" },
          { s: 7,  t: "55%", l: "5%",  dur: "12s", delay: "3s" },
          { s: 4,  t: "75%", l: "10%", dur: "8s",  delay: "0.5s" },
        ].map((d, i) => (
          <div
            key={`d-${i}`}
            className="particle"
            style={{
              width: `${d.s}px`,
              height: `${d.s}px`,
              top: d.t,
              left: d.l,
              borderRadius: "2px",
              transform: "rotate(45deg)",
              background: "oklch(0.44 0.225 15 / 0.5)",
              opacity: phase >= 2 ? 0.35 : 0,
              animationDuration: d.dur,
              animationDelay: d.delay,
              transition: "opacity 1.5s ease",
            }}
          />
        ))}
      </div>

      {/* ══ Vertical accent line — left edge ══ */}
      <div
        className="absolute left-8 md:left-16 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: "1px",
          background: "linear-gradient(to bottom, transparent, oklch(0.44 0.225 15 / 0.5) 30%, oklch(0.44 0.225 15 / 0.5) 70%, transparent)",
          opacity: phase >= 2 ? 1 : 0,
          transition: "opacity 1s 1.5s ease",
        }}
      />

      {/* ══ Main content ══ */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 min-h-screen flex flex-col justify-center">
        <div className="max-w-3xl pt-20 pb-8">

          {/* Brand label */}
          <div
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease",
            }}
          >
            <span className="font-display text-[9px] tracking-[0.5em] uppercase text-white/35 mb-4 block font-light">
              Laura Martínez · Wedding Planner · Palmira, Colombia
            </span>
          </div>

          {/* ── Main Title — Editorial ── */}
          <div className="mb-1 overflow-visible">
            <h1 className="leading-[0.88] tracking-tight">

              {/* Line 1: "Hacemos" — Outfit, light weight */}
              <div className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] font-light text-white/90">
                {phase >= 2 && (
                  <SplitWords text="Hacemos" baseDelay={0.1} />
                )}
              </div>

              {/* Line 2: "realidad" — Cormorant italic, bold, crimson */}
              <div
                className="block font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] italic font-semibold"
                style={{ color: "oklch(0.44 0.225 15)", marginTop: "-0.04em" }}
              >
                {phase >= 2 && (
                  <SplitWords text="realidad" baseDelay={0.35} />
                )}
              </div>

              {/* Line 3: "la boda de tus sueños" — Outfit, thin */}
              <div className="block font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/60 mt-1 tracking-widest uppercase">
                {phase >= 2 && (
                  <SplitWords text="la boda de tus sueños" baseDelay={0.8} />
                )}
              </div>
            </h1>
          </div>

          {/* Crimson divider line */}
          <div
            className="my-5 h-px max-w-xs origin-left"
            style={{
              background: "linear-gradient(90deg, oklch(0.44 0.225 15), transparent)",
              animation: phase >= 2 ? "line-grow 1s 1.4s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
              transform: "scaleX(0)",
            }}
          />

          {/* Subtitle */}
          <p
            className="text-white/50 text-sm md:text-base max-w-sm mb-6 font-light leading-relaxed tracking-wide"
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1s 0s cubic-bezier(0.16,1,0.3,1), transform 1s 0s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            Cada detalle, cada emoción, cada instante.
            Creamos la boda que siempre soñaste con pasión y amor.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 items-start"
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 1s 0.2s cubic-bezier(0.16,1,0.3,1), transform 1s 0.2s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <Button
              size="lg"
              className="btn-elegant group bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-5 text-sm font-display font-medium tracking-widest uppercase shadow-2xl animate-pulse-glow border-0"
              asChild
            >
              <a href="#contacto">
                <Calendar className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12 flex-shrink-0" />
                Agendar asesoría gratuita
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="btn-elegant border border-white/25 text-white hover:bg-white/10 hover:border-white/50 px-8 py-5 text-sm font-display font-light tracking-widest uppercase bg-transparent"
              asChild
            >
              <a
                href="https://wa.me/573186049903?text=Hola%20Laura,%20estoy%20interesado/a%20en%20tus%20servicios%20de%20wedding%20planner"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                Escribenos ahora
              </a>
            </Button>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-8 mt-8 pt-6 border-t border-white/10"
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transition: "opacity 1s 0.5s ease",
            }}
          >
            {[
              { n: "14+", l: "Años de experiencia" },
              { n: "100+", l: "Parejas felices" },
              { n: "15+", l: "Destinos" },
            ].map((s) => (
              <div key={s.l} className="text-left">
                <p className="font-display text-2xl font-bold text-white">{s.n}</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/35 mt-0.5 font-light">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ Scroll indicator — right side, vertical ══ */}
      <div
        className="absolute bottom-10 right-8 md:right-16 z-20 flex flex-col items-center gap-3"
        style={{
          opacity: phase >= 3 ? 1 : 0,
          transition: "opacity 1s 1s ease",
        }}
      >
        <a href="#servicios" className="group flex flex-col items-center gap-2">
          <span
            className="text-[9px] tracking-[0.45em] uppercase text-white/35 group-hover:text-primary transition-colors duration-400 scroll-label-vertical"
          >
            SCROLL
          </span>
          <div
            className="w-px bg-white/20 group-hover:bg-primary transition-colors duration-400"
            style={{
              height: "50px",
              animation: "line-grow 1s 2s ease forwards",
              transform: "scaleY(0)",
              transformOrigin: "top",
            }}
          />
          {[0, 1, 2].map((i) => (
            <ChevronDown
              key={i}
              className="h-3.5 w-3.5 text-white/30 group-hover:text-primary transition-colors duration-400 animate-scroll-arrow"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </a>
      </div>

      {/* ══ Bottom fade to background ══ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-5 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, oklch(0.98 0.008 48))" }}
      />
    </section>
  )
}
