"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const images = [
  { src: "/images/6.jpg",              alt: "Festejo de novios" },
  { src: "/images/7.jpg",              alt: "Baile de novios" },
  { src: "/images/1.jpg",              alt: "Beso de novios" },
  { src: "/images/2.jpg",              alt: "Novios felices" },
  { src: "/images/3.jpg",              alt: "Ceremonia de boda" },
  { src: "/images/4.jpg",              alt: "Ceremonia en iglesia" },
  { src: "/images/noviosfelices.jpg",  alt: "Pareja de novios" },
  { src: "/images/5.jpg",              alt: "Boda en el altar" },
  { src: "/images/Decoracion.jpg",     alt: "Decoración de mesa" },
  { src: "/images/atardecer.jpg",      alt: "Iluminación romántica" },
  { src: "/images/8.jpg",              alt: "Boda en iglesia" },
  { src: "/images/9.jpg",              alt: "Foto de novios" },
]

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="galeria" className="py-24 md:py-32 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.96)",
            filter: isVisible ? "blur(0)" : "blur(8px)",
            transition: "opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1), filter 1.1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-accent mb-5 block font-medium">
            Nuestras Bodas
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-5 text-balance leading-[1.0] tracking-tight">
            Momentos que{" "}
            <span className="font-serif font-black text-accent">inspiran</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Una muestra de las bodas que hemos tenido el honor de crear.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {images.map((image, index) => {
            const delay = index * 80
            return (
              <div
                key={image.src}
                className="relative overflow-hidden rounded-xl cursor-pointer group"
                style={{
                  aspectRatio: index % 5 === 0 ? "4/5" : index % 7 === 0 ? "1/1.3" : "1/1",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateY(0) scale(1)"
                    : `translateY(${60 + index * 4}px) scale(0.88)`,
                  filter: isVisible ? "blur(0)" : "blur(10px)",
                  transition: `opacity 0.9s ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 0.9s ${delay}ms cubic-bezier(0.16,1,0.3,1), filter 0.9s ${delay}ms cubic-bezier(0.16,1,0.3,1)`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  style={{
                    transform: hoveredIndex === index ? "scale(1.13)" : "scale(1)",
                    filter: hoveredIndex === index ? "brightness(0.8) saturate(1.2)" : "brightness(1)",
                    transition: "transform 0.7s cubic-bezier(0.34,1.56,0.64,1), filter 0.7s ease",
                  }}
                />

                {/* Hover overlay — elegant dark vignette */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)",
                    opacity: hoveredIndex === index ? 1 : 0,
                    transition: "opacity 0.5s ease",
                  }}
                />

                {/* Caption */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-4"
                  style={{
                    transform: hoveredIndex === index ? "translateY(0)" : "translateY(12px)",
                    opacity: hoveredIndex === index ? 1 : 0,
                    transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease",
                  }}
                >
                  <p className="font-serif text-base text-white leading-tight">{image.alt}</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <div className="w-4 h-px bg-accent" />
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/60">Laura Martínez Bodas</p>
                  </div>
                </div>

                {/* Corner accent */}
                <div
                  className="absolute top-3 left-3 w-6 h-6 border-t border-l border-white/70"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform: hoveredIndex === index ? "scale(1)" : "scale(0.5)",
                    transition: "opacity 0.4s 0.1s ease, transform 0.4s 0.1s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                />
                <div
                  className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-white/70"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform: hoveredIndex === index ? "scale(1)" : "scale(0.5)",
                    transition: "opacity 0.4s 0.15s ease, transform 0.4s 0.15s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                />

                {/* Accent dot */}
                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/50"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform: hoveredIndex === index ? "scale(1)" : "scale(0)",
                    transition: "opacity 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Bottom accent line */}
        <div
          className="flex justify-center mt-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s 0.8s ease, transform 1s 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-accent/60" />
            <div className="w-2 h-2 bg-accent rounded-full animate-float shadow-lg shadow-accent/50" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-accent/60" />
          </div>
        </div>
      </div>
    </section>
  )
}
