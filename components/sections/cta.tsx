"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, MessageCircle, Sparkles } from "lucide-react"

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        setScrollY(scrollProgress * 50)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-100"
        style={{ transform: `translateY(${scrollY}px) scale(1.1)` }}
      >
        <Image
          src="/images/gallery-couple.jpg"
          alt="Pareja de novios"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground/90" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <Sparkles className="w-12 h-12 text-primary-foreground floating-element" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <Sparkles className="w-8 h-8 text-primary-foreground floating-element-delay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className={`inline-block text-primary-foreground/70 text-sm tracking-[0.3em] uppercase font-medium mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Empieza tu historia
          </span>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-primary-foreground mb-8 leading-tight">
            <span className={`block transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Tu boda merece ser
            </span>
            <span className={`block italic transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              perfecta
            </span>
          </h2>
          
          <p className={`text-primary-foreground/80 text-xl md:text-2xl mb-12 leading-relaxed transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Permítenos ayudarte a crear uno de los días más importantes de tu vida.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button 
              size="lg" 
              className="btn-elegant bg-primary-foreground text-foreground hover:bg-primary-foreground/90 px-10 py-7 text-lg font-medium tracking-wide shadow-2xl hover:scale-105 transition-all duration-300"
              asChild
            >
              <a href="#contacto">
                <Calendar className="mr-2 h-5 w-5" />
                Agendar asesoría
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-elegant border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground px-10 py-7 text-lg font-medium tracking-wide bg-transparent hover:scale-105 transition-all duration-300"
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
    </section>
  )
}
