"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

// Each image gets a deliberate role in the editorial grid
const images = [
  { src: "/images/6.jpg",             alt: "Festejo de novios",       span: "md:col-span-2", aspect: "aspect-[4/3]"  },
  { src: "/images/7.jpg",             alt: "Baile de novios",         span: "",              aspect: "aspect-[3/4]"  },
  { src: "/images/1.jpg",             alt: "Beso de novios",          span: "",              aspect: "aspect-[3/4]"  },
  { src: "/images/2.jpg",             alt: "Novios felices",          span: "",              aspect: "aspect-[3/4]"  },
  { src: "/images/3.jpg",             alt: "Ceremonia de boda",       span: "md:col-span-2", aspect: "aspect-[4/3]"  },
  { src: "/images/4.jpg",             alt: "Ceremonia en iglesia",    span: "",              aspect: "aspect-[3/4]"  },
  { src: "/images/noviosfelices.jpg", alt: "Pareja de novios",        span: "",              aspect: "aspect-[3/4]"  },
  { src: "/images/5.jpg",             alt: "Boda en el altar",        span: "",              aspect: "aspect-square"  },
  { src: "/images/Decoracion.jpg",    alt: "Decoración de mesa",      span: "md:col-span-2", aspect: "aspect-[4/3]"  },
  { src: "/images/atardecer.jpg",     alt: "Iluminación romántica",   span: "",              aspect: "aspect-[3/4]"  },
  { src: "/images/8.jpg",             alt: "Boda en iglesia",         span: "",              aspect: "aspect-[3/4]"  },
  { src: "/images/9.jpg",             alt: "Foto de novios",          span: "md:col-span-2", aspect: "aspect-[4/3]"  },
]

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.04 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="overflow-hidden relative"
      style={{ background: "oklch(0.938 0.011 46)" }}
    >
      {/* SVG fractal noise — exhibition wall / raw linen */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.48' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.075'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 85% 75% at 50% 52%, oklch(0.950 0.009 47 / 0.8) 0%, oklch(0.895 0.015 44 / 0.6) 100%)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 10%, oklch(0.44 0.225 15 / 0.22) 50%, transparent 90%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 10%, oklch(0.44 0.225 15 / 0.12) 50%, transparent 90%)" }}
      />

      {/* ── HEADER — untouched ── */}
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-12 relative z-10">
        <div
          className="text-center max-w-3xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(90px) scale(0.90)",
            filter: isVisible ? "blur(0)" : "blur(16px)",
            transition: "opacity 1.3s cubic-bezier(0.16,1,0.3,1), transform 1.3s cubic-bezier(0.16,1,0.3,1), filter 1.2s cubic-bezier(0.16,1,0.3,1)",
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
      </div>

      {/* ── EDITORIAL GRID — full bleed, no container ── */}
      <div
        className="relative z-10 px-4 md:px-8 pb-24 md:pb-32"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.6s 0.3s ease",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={`relative overflow-hidden cursor-pointer ${img.span} ${img.aspect}`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? hovered === i ? "scale(1.012)" : "scale(1)"
                  : `translateY(${40 + i * 5}px)`,
                filter: isVisible ? "blur(0)" : "blur(8px)",
                transition: `opacity 0.8s ${i * 60}ms cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.34,1.56,0.64,1), filter 0.8s ${i * 60}ms cubic-bezier(0.16,1,0.3,1)`,
                zIndex: hovered === i ? 2 : 1,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={img.span ? "(max-width: 768px) 50vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                className="object-cover"
                style={{
                  transform: hovered === i ? "scale(1.08)" : "scale(1.02)",
                  transition: "transform 0.9s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              />

              {/* Always-present subtle vignette */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.35) 100%)",
                  opacity: 0.6,
                }}
              />

              {/* Hover dark wash */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.25) 45%, transparent 70%)",
                  opacity: hovered === i ? 1 : 0,
                  transition: "opacity 0.45s ease",
                }}
              />

              {/* Spotlight mask — darkens siblings so hovered image pops */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: "rgba(0,0,0,0.75)",
                  opacity: hovered !== null && hovered !== i ? 1 : 0,
                  transition: "opacity 0.4s ease",
                  zIndex: 5,
                }}
              />

              {/* Film counter — top left */}
              <div
                className="absolute top-3 left-3 font-display font-black leading-none select-none"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  color: "rgba(255,255,255,0.12)",
                  letterSpacing: "-0.04em",
                  opacity: hovered === i ? 0 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Hover content */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4 md:p-5"
                style={{
                  transform: hovered === i ? "translateY(0)" : "translateY(10px)",
                  opacity: hovered === i ? 1 : 0,
                  transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
                }}
              >
                {/* Film number on hover */}
                <p className="font-display font-black text-white/20 leading-none mb-1 select-none"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.05em" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-serif text-sm md:text-base text-white font-medium leading-tight">{img.alt}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-px flex-1 max-w-[2rem]" style={{ background: "oklch(0.44 0.225 15)" }} />
                  <p className="text-[9px] tracking-[0.28em] uppercase text-white/50">Laura Martínez</p>
                </div>
              </div>

              {/* Corner brackets on hover */}
              <div className="absolute top-3 left-3 w-5 h-5 pointer-events-none"
                style={{
                  borderTop: "1.5px solid rgba(255,255,255,0.6)",
                  borderLeft: "1.5px solid rgba(255,255,255,0.6)",
                  opacity: hovered === i ? 1 : 0,
                  transform: hovered === i ? "scale(1)" : "scale(0.5)",
                  transition: "opacity 0.35s 0.05s ease, transform 0.4s 0.05s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              />
              <div className="absolute bottom-3 right-3 w-5 h-5 pointer-events-none"
                style={{
                  borderBottom: "1.5px solid rgba(255,255,255,0.6)",
                  borderRight: "1.5px solid rgba(255,255,255,0.6)",
                  opacity: hovered === i ? 1 : 0,
                  transform: hovered === i ? "scale(1)" : "scale(0.5)",
                  transition: "opacity 0.35s 0.1s ease, transform 0.4s 0.1s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              />

              {/* Crimson dot — top right */}
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full pointer-events-none"
                style={{
                  background: "oklch(0.44 0.225 15)",
                  boxShadow: "0 0 8px 2px oklch(0.44 0.225 15 / 0.7)",
                  opacity: hovered === i ? 1 : 0,
                  transform: hovered === i ? "scale(1)" : "scale(0)",
                  transition: "opacity 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom signature line */}
        <div
          className="flex items-center justify-center gap-6 mt-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1s 1s ease, transform 1s 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(to right, transparent, oklch(0.44 0.225 15 / 0.5))" }} />
          <span className="font-display text-[9px] tracking-[0.5em] uppercase font-medium" style={{ color: "oklch(0.44 0.225 15 / 0.7)" }}>
            Laura Martínez Bodas
          </span>
          <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(to left, transparent, oklch(0.44 0.225 15 / 0.5))" }} />
        </div>
      </div>
    </section>
  )
}
