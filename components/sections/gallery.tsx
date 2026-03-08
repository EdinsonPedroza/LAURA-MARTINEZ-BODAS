"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const images = [
  { src: "/images/gallery-ceremony.jpg", alt: "Ceremonia de boda elegante", span: "md:col-span-2" },
  { src: "/images/gallery-table.jpg", alt: "Decoración de mesa de boda", span: "" },
  { src: "/images/gallery-lighting.jpg", alt: "Iluminación romántica de boda", span: "" },
  { src: "/images/gallery-venue.jpg", alt: "Venue de boda de lujo", span: "md:col-span-2" },
  { src: "/images/gallery-couple.jpg", alt: "Pareja de novios", span: "" },
  { src: "/images/gallery-bouquet.jpg", alt: "Ramo de novia", span: "" },
]

export function Gallery() {
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
    <section ref={sectionRef} id="galeria" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium mb-4 block">
            Nuestras Bodas
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 text-balance">
            Momentos que{" "}
            <span className="italic text-primary">inspiran</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Una muestra de las bodas que hemos tenido el honor de crear.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div 
              key={image.src}
              className={`relative aspect-square overflow-hidden rounded-lg group cursor-pointer transition-all duration-700 ${image.span} ${
                isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-90'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover transition-all duration-700 ${hoveredIndex === index ? 'scale-125 brightness-110' : 'scale-100'}`}
              />
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`} />
              
              {/* Caption */}
              <div className={`absolute bottom-0 left-0 right-0 p-4 text-primary-foreground transition-all duration-500 ${hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <p className="font-serif text-lg">{image.alt}</p>
              </div>

              {/* Corner decorations */}
              <div className={`absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary-foreground transition-all duration-500 ${hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
              <div className={`absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary-foreground transition-all duration-500 ${hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
