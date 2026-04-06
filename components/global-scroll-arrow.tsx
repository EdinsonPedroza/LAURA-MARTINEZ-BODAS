"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

// Todas las secciones en el orden que aparecen en tu página
const SECTIONS = ["hero", "servicios", "quien-soy", "galeria", "empieza-tu-historia", "contacto"]

export function GlobalScrollArrow() {
  const [nextSection, setNextSection] = useState<string | null>(SECTIONS[1])
  const [isVisible, setIsVisible] = useState(false)

  // Aparece suavemente al cargar
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 3800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Determinar en qué sección estamos
      let currentIdx = 0

      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          // Si la sección ocupa la mayor parte o ya pasó la mitad de la pantalla
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            currentIdx = i
          }
        }
      }

      // Si estamos en la última sección, podemos ocultar la flecha
      if (currentIdx === SECTIONS.length - 1) {
        setNextSection(null)
      } else {
        setNextSection(SECTIONS[currentIdx + 1])
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToNext = () => {
    if (nextSection) {
      const el = document.getElementById(nextSection)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // Si no hay siguiente sección (llegó al final), se oculta
  if (!nextSection) return null

  return (
    <div
      className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex justify-center z-[100] transition-opacity duration-1000"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <button
        onClick={scrollToNext}
        aria-label="Ir a la siguiente sección"
        className="group flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none p-0 outline-none"
      >
        <span
          className="font-display text-[9px] tracking-[0.45em] uppercase font-semibold transition-colors duration-300"
          style={{ color: "oklch(0.98 0.008 48 / 0.8)" }} // Blanco un poco transparente para que se vea sobre hero
        >
          Ver más
        </span>
        <div
          className="w-9 h-9 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-black/40 group-hover:border-white/50"
        >
          <ChevronDown
            className="w-4 h-4 animate-scroll-arrow text-white"
          />
        </div>
      </button>
    </div>
  )
}