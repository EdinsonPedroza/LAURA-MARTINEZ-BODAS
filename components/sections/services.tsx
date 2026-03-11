"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Heart, Phone } from "lucide-react"

const services = [
  {
    image: "/images/boda.png",
    title: "Planificación de bodas Full Time",
    subtitle: "Planificación completa",
    description: "Tú sueñas el momento, nosotros nos encargamos de hacerlo realidad.",
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
    image: "/images/Gemini_Generated_Image_8hax0w8hax0w8hax.png",
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
    <section ref={sectionRef} id="servicios" className="py-16 md:py-20 relative overflow-hidden">
      {/* Section background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/boda.png"
          alt="Boda"
          fill
          className="object-cover"
        />
        {/* White/gray overlay for contrast */}
        <div className="absolute inset-0 bg-white/90" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent z-10" />
      
      {/* Decorative light effects */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -translate-x-1/2 z-5" />
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[100px] translate-x-1/2 z-5" />

      <div className="container mx-auto px-4 relative z-20">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-2xl font-medium text-accent uppercase tracking-widest mb-5 mt-1 block">Servicios</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4">
            Qué hacemos{" "}
            <span className="text-accent italic">por ti.</span>
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto text-lg font-medium">
            Cada historia de amor es única, tu historia de amor merece una celebración inolvidable.
            Diseñamos bodas extraordinarias para historias de amor irrepetibles.
          </p>
        </div>

        {/* Services - Cards with image as background AND overlaid */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${hoveredIndex === index ? '-translate-y-1' : ''}`}
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-accent/30 via-rose-500/20 to-accent/30 rounded-2xl blur-lg transition-all duration-500 ${
                hoveredIndex === index ? 'opacity-100 scale-[1.02]' : 'opacity-0 scale-100'
              }`} />
              
              {/* Card with image as background - darker but not completely black */}
              <div className="relative rounded-2xl overflow-hidden">
                {/* Background Image (card background) - darker overlay */}
                <div className="absolute inset-0 z-0">
                  <div className={`absolute inset-0 bg-black/92 transition-transform duration-700 ${
                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                  }`} style={{ backgroundImage: `url(${service.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/90 to-black/85" />
                </div>
                
                {/* Content with overlaid image - full height on left */}
                <div className="relative z-10 p-0 md:p-0 grid md:grid-cols-5">
                  {/* Image overlaid on left side - FULL HEIGHT and left border */}
                  <div className="relative h-64 md:h-auto md:col-span-2 overflow-hidden">
                    {/* Container that scales with image - includes overlay */}
                    <div className={`absolute inset-0 transition-transform duration-700 ${
                      hoveredIndex === index ? 'scale-110' : 'scale-100'
                    }`}>
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      {/* Pure black overlay - scales with image */}
                      <div className="absolute inset-0 bg-black/40" />
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="p-8 md:p-10 md:col-span-3 flex flex-col justify-center">
                    {/* Subtitle badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-white text-sm font-semibold mb-3 w-fit">
                      {service.subtitle}
                    </div>
                    
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-white/80 mb-5 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features - SIMPLE LIST with green checkmarks */}
                    <div className="mb-5">
                      <p className="text-xs text-accent uppercase tracking-wider font-semibold mb-3">¿Qué incluye?</p>
                      <div className="grid grid-cols-1 gap-2">
                        {service.features.map((feature) => (
                          <div 
                            key={feature} 
                            className="flex items-center gap-3"
                          >
                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-green-400" />
                            </div>
                            <span className="text-sm font-medium text-white">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highlight with icon */}
                    <div className="flex items-center gap-2 mb-5 text-white/80">
                      <Heart className="w-4 h-4 text-accent" />
                      <p className="font-medium italic text-sm">
                        {service.highlight}
                      </p>
                    </div>

                    {/* Button on the right side - more emotional text */}
                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleServiceClick(service.whatsappMessage)}
                        className="bg-white text-gray-900 hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer font-semibold"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Planifica tu boda
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Shine effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 pointer-events-none ${
                  hoveredIndex === index ? 'translate-x-full' : '-translate-x-full'
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA - SIMPLE VERSION with bigger button and regular font */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-700 mb-4 font-medium text-lg">¿No sabes cuál servicio es el ideal para ti?</p>
          <Button 
            onClick={() => handleServiceClick("Hola Laura, me interesa conocer más sobre los servicios de wedding planner. ¿Cuál me recomiendas según mi caso?")}
            className="bg-accent hover:bg-accent/90 text-white cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 text-xl px-12 py-6"
          >
            <Phone className="w-5 h-5 mr-2" />
            Hablemos y te asesoramos
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Bottom decorative line */}
        <div className={`flex justify-center mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-accent/50" />
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-lg shadow-accent/50" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-accent/50" />
          </div>
        </div>
      </div>
    </section>
  )
}

