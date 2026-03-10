"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Heart, Star, Sparkles } from "lucide-react"

const services = [
  {
    image: "/images/service-fulltime.jpg",
    title: "Wedding Planner Full Time",
    subtitle: "Planificación completa",
    description: "Desde el primer día hasta el gran momento, te acompañamos en cada paso del camino. Nos encargamos de cada detalle para que tú solo te dediques a disfrutar.",
    features: [
      "Proveedores seleccionados",
      "Logística completa",
      "Planificación detallada",
      "Coordinación total"
    ],
    highlight: "Para que tú solo te preocuparse por disfrutar.",
    whatsappMessage: "Hola Laura, me interesa el servicio de Wedding Planner Full Time. Me gustaría recibir más información."
  },
  {
    image: "/images/service-coordination.jpg",
    title: "Coordinación Love Day",
    subtitle: "El día de tu boda",
    description: "Si ya organizaste todo pero necesitas que todo salga perfecto el gran día, nuestro equipo se encarga de que nada falle.",
    features: [
      "Supervisión del evento",
      "Coordinación de proveedores",
      "Timeline del día",
      "Resolución de imprevistos"
    ],
    highlight: "Nos encargamos de que todo funcione perfectamente.",
    whatsappMessage: "Hola Laura, me interesa el servicio de Coordinación Love Day. Me gustaría recibir más información."
  },
  {
    image: "/images/service-destination.jpg",
    title: "Bodas Destino",
    subtitle: "Bodas en Colombia",
    description: "Vives fuera de Colombia pero quieres una boda de ensueño aquí. Hacemos que sea posible y sin complicaciones.",
    features: [
      "Organización remota",
      "Venue scouting",
      "Proveedores locales",
      "Coordinación internacional"
    ],
    highlight: "Tu boda de ensueño en Colombia.",
    whatsappMessage: "Hola Laura, me interesa el servicio de Bodas Destino. Vivo fuera de Colombia y me gustaría organizar mi boda allá."
  },
  {
    image: "/images/service-virtual.jpg",
    title: "Asesoría Virtual",
    subtitle: "Sesión personalizada",
    description: "2 horas de asesoría personalizada para resolver todas tus dudas y darte la dirección que necesitas.",
    features: [
      "Optimización de presupuesto",
      "Organización correcta",
      "Consejos profesionales",
      "Plan de acción"
    ],
    highlight: "Claridad y dirección para tu boda.",
    whatsappMessage: "Hola Laura, me interesa la Asesoría Virtual de 2 horas. Me gustaría agendar una sesión."
  }
]

const stats = [
  { value: "14+", label: "Años creando bodas" },
  { value: "100+", label: "Parejas felices" },
  { value: "15+", label: "Destinos internacionales" },
  { value: "4.9", label: "Google" }
]

export function Services() {
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

  const handleServiceClick = (whatsappMessage: string) => {
    const encodedMessage = encodeURIComponent(whatsappMessage)
    window.open(`https://wa.me/573186049903?text=${encodedMessage}`, '_blank')
  }

  return (
    <section ref={sectionRef} id="servicios" className="py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-sm font-medium text-accent uppercase tracking-widest mb-3 block">Servicios</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Experiencias{" "}
            <span className="text-accent italic">únicas</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Cada boda es diferente, y cada pareja merece una celebración que refleje su historia. 
            Descubre cómo podemos hacer de tu día algo verdaderamente especial.
          </p>
        </div>

        {/* Stats - Simple and elegant */}
        <div className={`flex justify-center gap-6 md:gap-12 mb-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-serif text-2xl md:text-3xl text-foreground mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services - Full width cards */}
        <div className="space-y-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={`group relative bg-card border border-border/50 rounded-2xl overflow-hidden transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${hoveredIndex === index ? 'shadow-2xl shadow-accent/10' : 'shadow-lg'}`}
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="grid md:grid-cols-5">
                {/* Image section */}
                <div className="relative h-64 md:h-72 md:col-span-2 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      hoveredIndex === index ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
                  
                  {/* Decorative corner */}
                  <div className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent/30 to-transparent transition-all duration-300 ${
                    hoveredIndex === index ? 'w-28 h-28' : ''
                  }`} />
                </div>

                {/* Content section */}
                <div className="p-6 md:p-8 md:col-span-3 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm text-accent font-medium">{service.subtitle}</span>
                  </div>
                  
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features grid */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {service.features.map((feature, featureIndex) => (
                      <div 
                        key={feature} 
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-foreground/80 font-medium italic mb-4">
                    {service.highlight}
                  </p>

                  <Button
                    onClick={() => handleServiceClick(service.whatsappMessage)}
                    className={`self-start bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 ${
                      hoveredIndex === index ? 'shadow-lg shadow-accent/30' : ''
                    }`}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Me interesa
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-muted-foreground mb-4">¿No sabes cuál servicio es el ideal para ti?</p>
          <Button 
            onClick={() => handleServiceClick("Hola Laura, me interesa conocer más sobre los servicios de wedding planner. ¿Cuál me recomiendas según mi caso?")}
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            Hablemos y te asesoramos
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

