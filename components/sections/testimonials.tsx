"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Claudia Quintero Ochoa",
    text: "Las bodas que produce Laura Martínez son un espectáculo. Es una profesional que hace realidad los sueños de una pareja enamorada."
  },
  {
    name: "Angélica María Escobar Valencia",
    text: "Con Laura todo queda hermoso, divino, de sueño. Súper recomendada."
  },
  {
    name: "Andrea Sánchez",
    text: "Súper recomendada. No hay mejor que ella."
  },
  {
    name: "Laura Viviana Hernández Cadena",
    text: "Las bodas y todos los eventos que organizas son un sueño."
  },
  {
    name: "Teresa Montaño",
    text: "Todo es muy elegante y fino."
  },
  {
    name: "Eufemia Montaño",
    text: "Todo es de lujo. Recomendado 100%."
  }
]

export function Testimonials() {
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
    <section ref={sectionRef} id="testimonios" className="py-24 md:py-32 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-2xl font-medium text-accent uppercase tracking-widest mb-4 block">
            Testimonios
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
            Lo que dicen{" "}
            <span className="italic text-accent">nuestras parejas</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className={`bg-secondary border-0 transition-all duration-700 cursor-pointer ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              } ${hoveredIndex === index ? 'shadow-2xl scale-[1.02] -translate-y-2' : 'shadow-md'}`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CardContent className="p-6 relative">
                {/* Quote icon */}
                <Quote className={`absolute top-4 right-4 w-10 h-10 text-primary/20 transition-all duration-500 ${hoveredIndex === index ? 'text-primary/40 scale-110' : ''}`} />
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 fill-primary text-primary transition-all duration-300 ${hoveredIndex === index ? 'scale-110' : ''}`}
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-foreground leading-relaxed mb-6 italic text-lg">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-primary flex items-center justify-center transition-all duration-500 ${hoveredIndex === index ? 'scale-110 rotate-6' : ''}`}>
                    <span className="text-primary-foreground font-serif text-xl font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Cliente verificada
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
