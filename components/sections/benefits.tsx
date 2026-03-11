"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Wallet, Sparkles, Clock, Heart, Shield, Users, CheckCircle } from "lucide-react"

const benefits = [
  {
    icon: Wallet,
    title: "Optimiza tu presupuesto",
    description: "Acceso a proveedores aliados con precios exclusivos que maximizan cada peso invertido.",
  },
  {
    icon: Sparkles,
    title: "Detalles impecables",
    description: "Cada elemento es cuidadosamente seleccionado para crear una experiencia visualmente elegante.",
  },
  {
    icon: Clock,
    title: "Tu tiempo es valioso",
    description: "Nos encargamos de todo para que solo te preocupaciones por disfrutar cada momento.",
  },
  {
    icon: Heart,
    title: "Conexión emocional",
    description: "Entendemos tus sueños y los transformamos en una celebración que refleja tu historia de amor.",
  },
  {
    icon: Shield,
    title: "Tranquilidad total",
    description: "Respaldados por certificaciones internacionales que garantizan profesionalismo y calidad.",
  },
  {
    icon: Users,
    title: "Equipo dedicado",
    description: "Un equipo completo trabajando para que tu día sea absolutamente perfecto.",
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
        <div className="absolute inset-0 bg-foreground/85" />
      </div>

      {/* Elegant red accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent z-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-2xl font-medium text-accent uppercase tracking-widest mb-4 block">
            Por Qué Elegirnos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6 text-balance leading-tight">
            La diferencia de trabajar con{" "}
            <span className="italic text-accent">profesionales</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            Más de 100 parejas felices nos respaldan
          </p>
        </div>

        {/* Benefits Grid - Elegant dark cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className={`group relative p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 cursor-pointer ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              } ${hoveredIndex === index ? 'bg-white/10 border-accent/30' : ''}`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Elegant left accent */}
              <div className={`absolute left-0 top-8 bottom-8 w-0.5 bg-accent/50 transition-all duration-300 ${hoveredIndex === index ? 'w-1 bg-accent' : ''}`} />
              
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${hoveredIndex === index ? 'bg-accent scale-110' : ''}`}>
                  <benefit.icon className={`w-6 h-6 transition-colors duration-300 ${hoveredIndex === index ? 'text-white' : 'text-accent'}`} />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-primary-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-primary-foreground/60 leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>

              {/* Elegant check on hover */}
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border border-accent/30 flex items-center justify-center transition-all duration-300 ${hoveredIndex === index ? 'bg-accent border-accent' : ''}`}>
                <CheckCircle className={`w-4 h-4 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100 text-white' : 'opacity-0'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Elegant stats */}
        <div className={`mt-16 flex flex-wrap justify-center gap-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { number: "100+", label: "Bodas exitosas" },
            { number: "14", label: "Años de experiencia" },
            { number: "500+", label: "Proveedores aliados" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-serif text-accent font-bold mb-1">{stat.number}</div>
              <div className="text-primary-foreground/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

