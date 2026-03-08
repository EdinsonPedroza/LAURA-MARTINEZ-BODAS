"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <a
      href="https://wa.me/573186049903?text=Hola,%20estoy%20interesado/a%20en%20los%20servicios%20de%20wedding%20planner"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contactar por WhatsApp"
    >
      {/* Text label */}
      <span 
        className={`bg-foreground text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-300 whitespace-nowrap ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
      >
        ¡Escríbenos ahora!
      </span>

      {/* Button */}
      <div className={`w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl transition-all duration-300 ${isHovered ? 'scale-110' : 'animate-bounce-subtle'}`}>
        <MessageCircle className="w-8 h-8 text-white" />
        {/* Pulse ring */}
        <span className="absolute w-16 h-16 rounded-full bg-[#25D366] animate-ping opacity-30" />
      </div>
    </a>
  )
}
