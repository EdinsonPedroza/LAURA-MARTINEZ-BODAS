"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Claudia Quintero Ochoa",
    initial: "C",
    text: "Las bodas que produce Laura Martínez son un espectáculo. Es una profesional que hace realidad los sueños de una pareja enamorada."
  },
  {
    name: "Angélica María Escobar Valencia",
    initial: "A",
    text: "Con Laura todo queda hermoso, divino, de sueño. Súper recomendada."
  },
  {
    name: "Andrea Sánchez",
    initial: "A",
    text: "Súper recomendada. No hay mejor que ella."
  },
  {
    name: "Laura Viviana Hernández Cadena",
    initial: "L",
    text: "Las bodas y todos los eventos que organizas son un sueño."
  },
  {
    name: "Teresa Montaño",
    initial: "T",
    text: "Todo es muy elegante y fino."
  },
  {
    name: "Eufemia Montaño",
    initial: "E",
    text: "Todo es de lujo. Recomendado 100%."
  }
]

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="relative mx-3 w-80 flex-shrink-0 rounded-2xl border border-border/60 bg-card p-7 shadow-lg hover:shadow-2xl hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 group">
      {/* Quote icon */}
      <Quote className="absolute top-5 right-5 w-8 h-8 text-accent/15 group-hover:text-accent/35 transition-colors duration-500" />

      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-accent text-accent transition-transform duration-200 group-hover:scale-110"
            style={{ transitionDelay: `${i * 40}ms` }}
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-foreground/80 leading-relaxed mb-6 italic text-sm">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          <span className="font-serif text-base font-bold text-accent-foreground">
            {t.initial}
          </span>
        </div>
        <div>
          <p className="font-medium text-foreground text-sm leading-tight">{t.name}</p>
          <p className="text-xs text-muted-foreground">Cliente verificada</p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  // Duplicate for seamless infinite marquee
  const rowOne = [...testimonials, ...testimonials, ...testimonials]
  const rowTwo = [...testimonials, ...testimonials, ...testimonials].reverse()

  return (
    <section ref={sectionRef} id="testimonios" className="py-24 md:py-32 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-accent mb-5 block font-medium">
            Testimonios
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 text-balance leading-[1.0] tracking-tight">
            Lo que dicen{" "}
            <span className="font-serif font-black text-accent">nuestras parejas</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Más de 100 bodas soñadas. Cada historia, única.
          </p>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div
        className={`mb-5 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
        }`}
        style={{ transition: "opacity 1s 0.3s cubic-bezier(0.16,1,0.3,1), transform 1s 0.3s cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div className="overflow-hidden">
          <div className="flex animate-marquee-fast" style={{ width: "max-content" }}>
            {rowOne.map((t, i) => (
              <TestimonialCard key={`r1-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div
        className={`transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
        }`}
        style={{ transition: "opacity 1s 0.5s cubic-bezier(0.16,1,0.3,1), transform 1s 0.5s cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div className="overflow-hidden">
          <div className="flex animate-marquee-reverse" style={{ width: "max-content" }}>
            {rowTwo.map((t, i) => (
              <TestimonialCard key={`r2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative bottom element */}
      <div className="container mx-auto px-4">
        <div
          className={`flex justify-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
          style={{ transition: "opacity 0.8s 0.7s, transform 0.8s 0.7s cubic-bezier(0.34,1.56,0.64,1)" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-accent/60" />
            <div className="w-2 h-2 bg-accent rounded-full shadow-lg shadow-accent/50 animate-float" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-accent/60" />
          </div>
        </div>
      </div>
    </section>
  )
}
