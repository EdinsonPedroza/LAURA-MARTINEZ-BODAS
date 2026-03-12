"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Calendar, ChevronDown, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / 50
      const y = (e.clientY - rect.top - rect.height / 2) / 50

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.05)` }}
      >
        <Image
          src="/images/hero-wedding.jpg"
          alt="Boda elegante de ensueno"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      <div className="relative z-10 container mx-auto flex min-h-screen items-center justify-center px-4 py-20 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} lg:pt-20`}>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-primary-foreground mb-8 leading-[0.9] tracking-tight max-w-6xl mx-auto">
            <span className={`block transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Hacemos realidad
            </span>
            <span className={`block italic font-medium transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              la boda de tus sueños
            </span>
          </h1>

          {/* Subtitle - Smaller and trust-inspiring */}
          <p className={`text-primary-foreground/80 text-sm md:text-base max-w-lg mx-auto mb-12 font-light leading-relaxed tracking-wide transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Haz de tu boda una experiencia inolvidable. Nosotros nos encargamos de cada detalle para que vivas una experiencia mágica y extraordinaria. ¡Contáctanos hoy y empecemos a planear tu día perfecto!
          </p>

          <div className={`flex flex-col sm:flex-row gap-5 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Button
              size="lg"
              className="btn-elegant bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-7 text-base font-semibold tracking-wide shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 animate-pulse-glow"
              asChild
            >
              <a href="#contacto">
                <Calendar className="mr-2 h-5 w-5" />
                Agendar asesoria gratuita
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="btn-elegant border-2 border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground hover:text-foreground px-10 py-7 text-base font-medium tracking-wide bg-transparent transition-all duration-300 hover:scale-105"
              asChild
            >
              <a
                href="https://wa.me/573186049903?text=Hola%20Laura,%20estoy%20interesado/a%20en%20tus%20servicios%20de%20wedding%20planner"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Escribenos ahora
              </a>
            </Button>
          </div>
        </div>

        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-900 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <a href="#servicios" className="group flex flex-col items-center cursor-pointer">
            <div className="animate-bounce-subtle">
              <ChevronDown className="h-6 w-6 text-primary-foreground/50 transition-colors group-hover:text-primary-foreground/80" />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
