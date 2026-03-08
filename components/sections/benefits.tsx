"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Wallet, Sparkles, Clock, Heart, Shield, Users } from "lucide-react"

const benefits = [
  {
    icon: Wallet,
    title: "Optimiza tu presupuesto",
    description: "Acceso a proveedores aliados con precios exclusivos que maximizan cada peso invertido.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: Sparkles,
    title: "Detalles impecables",
    description: "Cada elemento es cuidadosamente seleccionado para crear una experiencia visualmente espectacular.",
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: Clock,
    title: "Tu tiempo es valioso",
    description: "Nos encargamos de todo para que solo te preocupes por disfrutar cada momento.",
    color: "from-sky-500 to-blue-600"
  },
  {
    icon: Heart,
    title: "Conexión emocional",
    description: "Entendemos tus sueños y los transformamos en una celebración que refleja tu historia de amor.",
    color: "from-rose-500 to-pink-600"
  },
  {
    icon: Shield,
    title: "Tranquilidad total",
    description: "Respaldados por certificaciones internacionales que garantizan profesionalismo y calidad.",
    color: "from-violet-500 to-purple-600"
  },
  {
    icon: Users,
    title: "Equipo dedicado",
    description: "Un equipo completo trabajando para que tu día sea absolutamente perfecto.",
    color: "from-cyan-500 to-blue-600"
  }
]

export function Benefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery-lighting.jpg"
          alt="Decoración de bodas"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/90" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-semibold mb-4 block">
            Por Qué Elegirnos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6 text-balance leading-tight">
            La diferencia de trabajar con{" "}
            <span className="italic">profesionales</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            Más de 100 parejas felices nos respaldan
          </p>
        </div>

        {/* Benefits Grid - More dynamic */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className={`group relative p-8 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 transition-all duration-500 cursor-pointer overflow-hidden ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              } ${hoveredIndex === index ? 'bg-primary-foreground/15 scale-[1.02] -translate-y-2' : ''}`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className={`relative z-10`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 transition-all duration-500 ${hoveredIndex === index ? 'scale-110 rotate-3' : ''}`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-2xl text-primary-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-primary-foreground/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
