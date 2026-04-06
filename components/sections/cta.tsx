"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, MessageCircle } from "lucide-react"

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  // parallax values stored in refs — no re-renders on scroll/mousemove
  const parallax = useRef({ scrollY: 0, mouseX: 0, mouseY: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches
    const applyTransform = () => {
      if (!bgRef.current) return
      const { scrollY, mouseX, mouseY } = parallax.current
      bgRef.current.style.transform =
        `translateY(${scrollY}px) translate(${mouseX}px, ${mouseY}px) scale(1.14)`
    }
    const handleScroll = () => {
      if (isTouch || !sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      parallax.current.scrollY = progress * 60
      applyTransform()
    }
    const handleMouse = (e: MouseEvent) => {
      if (isTouch || !sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      parallax.current.mouseX = (e.clientX - rect.left - rect.width / 2) / 60
      parallax.current.mouseY = (e.clientY - rect.top - rect.height / 2) / 60
      applyTransform()
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouse, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouse)
    }
  }, [])

  const revealStyle = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.96)",
    filter: isVisible ? "blur(0)" : "blur(6px)",
    transition: `opacity 1.2s ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 1.2s ${delay}ms cubic-bezier(0.16,1,0.3,1), filter 1.2s ${delay}ms cubic-bezier(0.16,1,0.3,1)`,
  })

  return (
    <section id="empieza-tu-historia" ref={sectionRef} className="relative py-40 md:py-56 overflow-hidden">
      {/* Background with parallax + mouse tilt */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          transform: "translateY(0px) translate(0px, 0px) scale(1.14)",
          transition: "transform 0.2s ease-out",
          willChange: "transform",
        }}
      >
        <Image
          src="/images/gallery-couple.jpg"
          alt="Pareja de novios"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Decorative lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10 origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.45 0.15 25 / 0.7), transparent)",
          animation: isVisible ? "line-grow 1.2s 0.3s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
          transform: "scaleX(0)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10 origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.45 0.15 25 / 0.5), transparent)",
          animation: isVisible ? "line-grow 1.2s 0.5s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
          transform: "scaleX(0)",
        }}
      />

      {/* Floating light orbs */}
      <div className="absolute top-16 left-8 w-2 h-2 bg-accent/60 rounded-full animate-float" />
      <div className="absolute bottom-16 right-12 w-1.5 h-1.5 bg-white/40 rounded-full animate-float animation-delay-400" />
      <div className="absolute top-1/2 left-16 w-1 h-1 bg-accent/50 rounded-full animate-float animation-delay-200" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">

          {/* Label */}
          <div style={revealStyle(0)}>
            <span className="font-display inline-block text-white/50 text-xs tracking-[0.45em] uppercase mb-8">
              Empieza tu historia
            </span>
          </div>

          {/* Title */}
          <div style={revealStyle(150)}>
            <h2 className="font-display text-5xl md:text-6xl lg:text-8xl font-extrabold text-white mb-2 leading-[0.95] tracking-tight">
              Tu boda merece ser
            </h2>
          </div>
          <div style={revealStyle(280)}>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-8xl font-black text-accent mb-10 leading-[0.95] tracking-tight">
              perfecta
            </h2>
          </div>

          {/* Divider */}
          <div
            className="mx-auto mb-10 h-px max-w-xs origin-center"
            style={{
              background: "linear-gradient(90deg, transparent, oklch(0.45 0.15 25 / 0.6), transparent)",
              animation: isVisible ? "line-grow 0.9s 500ms cubic-bezier(0.16,1,0.3,1) forwards" : "none",
              transform: "scaleX(0)",
            }}
          />

          {/* Subtitle */}
          <div style={revealStyle(450)}>
            <p className="text-white/70 text-lg md:text-xl mb-14 leading-relaxed max-w-xl mx-auto">
              Permítenos ayudarte a crear uno de los días más importantes de tu vida.
            </p>
          </div>

          {/* Buttons */}
          <div style={revealStyle(600)}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Button
                size="lg"
                className="btn-elegant group bg-white text-foreground hover:bg-white/90 px-12 py-7 text-lg font-medium tracking-wide shadow-2xl border-0"
                asChild
              >
                <a href="#contacto">
                  <Calendar className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  Agendar asesoría
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="btn-elegant border-2 border-white/50 text-white hover:bg-white/10 hover:border-white px-12 py-7 text-lg font-medium tracking-wide bg-transparent"
                asChild
              >
                <a
                  href="https://wa.me/573186049903?text=Hola,%20estoy%20interesado/a%20en%20los%20servicios%20de%20wedding%20planner"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Escribir por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
