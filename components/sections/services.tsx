"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

const services = [
  {
    image: "/images/service-fulltime.jpg",
    title: "Wedding Planner Full Time",
    description: "Planificación completa de tu boda desde el inicio hasta el gran día.",
    features: [
      "Proveedores seleccionados",
      "Logística completa",
      "Planificación detallada",
      "Coordinación total"
    ],
    highlight: "Para que tú solo te preocupes por disfrutar.",
    whatsappMessage: "Hola Laura, me interesa el servicio de Wedding Planner Full Time. Me gustaría recibir más información."
  },
  {
    image: "/images/service-coordination.jpg",
    title: "Coordinación Love Day",
    description: "Si ya organizaste tu boda pero quieres disfrutarla sin preocupaciones.",
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
    description: "Si vives fuera de Colombia pero quieres celebrar tu boda aquí.",
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
    description: "Sesión de asesoría personalizada de 2 horas para resolver dudas.",
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
    <section ref={sectionRef} id="servicios" className="py-24 md:py-32 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase font-medium mb-4 block">
            Servicios
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4 text-balance">
            Qué hacemos{" "}
            <span className="italic">por ti</span>
          </h2>
          <p className="text-primary-foreground/60 leading-relaxed">
            Cada pareja es única, por eso ofrecemos diferentes opciones para 
            adaptarnos a tus necesidades y presupuesto.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className={`group bg-primary-foreground/5 border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-500 overflow-hidden card-hover ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              } ${hoveredIndex === index ? 'scale-[1.02]' : ''}`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className={`object-cover transition-all duration-700 ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-xl text-primary-foreground">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-primary-foreground/60 text-sm">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={feature} 
                      className={`flex items-center text-primary-foreground/70 text-sm transition-all duration-300 ${hoveredIndex === index ? 'translate-x-1' : ''}`}
                      style={{ transitionDelay: `${featureIndex * 50}ms` }}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full bg-primary-foreground/40 mr-2 transition-all duration-300 ${hoveredIndex === index ? 'bg-primary-foreground' : ''}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-primary-foreground/80 font-medium italic text-sm pt-4 border-t border-primary-foreground/10 mb-4">
                  {service.highlight}
                </p>
                <Button
                  onClick={() => handleServiceClick(service.whatsappMessage)}
                  className={`w-full bg-primary-foreground/10 hover:bg-primary-foreground text-primary-foreground hover:text-foreground transition-all duration-300 cursor-pointer ${hoveredIndex === index ? 'bg-primary-foreground/20' : ''}`}
                  variant="ghost"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Consultar por WhatsApp
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
