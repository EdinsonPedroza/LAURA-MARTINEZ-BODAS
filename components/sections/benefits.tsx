"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Wallet, Sparkles, Clock, Heart, Shield, Users, CheckCircle, SparklesIcon } from "lucide-react"

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
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Decorative light effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
      </div>

      {/* Elegant red accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent z-20" />

      {/* Additional decorative lines */}
      <div className="absolute top-20 left-10 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent z-10" />
      <div className="absolute top-40 right-10 w-px h-48 bg-gradient-to-b from-transparent via-accent/30 to-transparent z-10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-2xl font-medium text-accent uppercase tracking-widest mb-4 block animate-glow">
            Por Qué Elegirnos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-balance leading-tight">
            La diferencia de trabajar con{" "}
            <span className="italic text-accent">profesionales</span>
          </h2>
          <p className="text-white/80 text-lg">
            Más de 100 parejas felices nos respaldan
          </p>
        </div>

        {/* Benefits Grid - White cards with glow effects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className={`group relative p-8 rounded-xl bg-white border border-gray-200 shadow-xl transition-all duration-500 cursor-pointer ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              } ${hoveredIndex === index ? 'border-accent shadow-2xl shadow-accent/20 -translate-y-2' : ''}`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : ''}`} />
              
              {/* Elegant left accent */}
              <div className={`absolute left-0 top-8 bottom-8 w-0.5 bg-accent transition-all duration-300 ${hoveredIndex === index ? 'w-1 shadow-[0_0_10px_rgba(212,175,55,0.5)]' : ''}`} />
              
              <div className="flex items-start gap-5 relative z-10">
                <div className={`w-14 h-14 rounded-full bg-accent flex items-center justify-center flex-shrink-0 transition-all duration-300 ${hoveredIndex === index ? 'scale-110 shadow-lg shadow-accent/40' : 'shadow-md'}`}>
                  <benefit.icon className={`w-6 h-6 transition-colors duration-300 text-white`} />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-gray-900 mb-2 group-hover:text-accent transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>

              {/* Elegant check on hover */}
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border border-accent flex items-center justify-center transition-all duration-300 ${hoveredIndex === index ? 'bg-accent shadow-lg shadow-accent/30' : 'bg-white'}`}>
                <CheckCircle className={`w-4 h-4 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100 text-white' : 'opacity-0 text-accent'}`} />
              </div>

              {/* Sparkle effect on hover */}
              <div className={`absolute top-2 right-8 transition-all duration-500 ${hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <SparklesIcon className="w-4 h-4 text-accent animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Elegant stats with glow */}
        <div className={`mt-16 flex flex-wrap justify-center gap-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { number: "14+", label: "Años creando bodas" },
            { number: "100+", label: "Parejas felices" },
            { number: "15+", label: "Destinos internacionales" }
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center group"
            >
<div className="text-5xl font-serif text-white font-bold mb-1 group-hover:text-accent transition-colors duration-300 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                {stat.number}
              </div>
              <div className="text-white/80 text-base group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className={`mt-16 flex justify-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-accent" />
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-lg shadow-accent/50" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-accent" />
          </div>
        </div>
      </div>
    </section>
  )
}

