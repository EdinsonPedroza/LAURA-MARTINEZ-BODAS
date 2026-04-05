"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [imageScale, setImageScale] = useState(1)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const progress = 1 - rect.top / window.innerHeight
        const scale = Math.min(Math.max(1, 1 + progress * 0.12), 1.12)
        setImageScale(scale)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / 80
      const y = (e.clientY - rect.top - rect.height / 2) / 80
      setMousePos({ x, y })
    }
    window.addEventListener("mousemove", handleMouse, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  const credentials = [
    {
      title: "Formación Profesional",
      description: "Publicista · Universidad Autónoma de Occidente",
      image: "/images/descarga.png",
      alt: "Universidad Autónoma de Occidente",
    },
    {
      title: "Certificación Internacional",
      description: "Especializada con INIBEP",
      image: "/images/Certified-2-PNG-1-1000x1024-1-768x786.png",
      alt: "Certificación INIBEP",
    },
    {
      title: "Certificación ABC",
      description: "Asociación de Consultoras Nupciales",
      image: "/images/1-768x768.png",
      alt: "Certificación ABC",
    },
  ]

  const revealStyle = (direction: "left" | "right" | "up", delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translateX(0) translateY(0) scale(1)"
      : direction === "left"
      ? "translateX(-90px) scale(0.97)"
      : direction === "right"
      ? "translateX(90px) scale(0.97)"
      : "translateY(60px) scale(0.97)",
    filter: isVisible ? "blur(0)" : "blur(8px)",
    transition: `opacity 1.2s ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 1.2s ${delay}ms cubic-bezier(0.16,1,0.3,1), filter 1.2s ${delay}ms cubic-bezier(0.16,1,0.3,1)`,
  })

  return (
    <section ref={sectionRef} id="quien-soy" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-rose-50/20 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute top-32 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-32 -right-24 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">

          {/* ── Image column ── */}
          <div style={revealStyle("left", 0)}>
            <div className="relative">
              {/* Main image */}
              <div
                className="relative aspect-[3/5] rounded-sm overflow-hidden shadow-2xl"
                style={{
                  transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
                  transition: "transform 0.4s ease-out",
                }}
              >
                <Image
                  src="/images/gallery-bouquet.jpg"
                  alt="Laura Martinez - Wedding Planner"
                  fill
                  className="object-cover"
                  style={{
                    transform: `scale(${imageScale})`,
                    transition: "transform 0.5s ease-out",
                    transformOrigin: "center center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-5 -right-2 md:right-6 bg-accent text-accent-foreground px-6 py-4 rounded-xl shadow-2xl shadow-accent/30"
                style={{
                  transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)`,
                  transition: "transform 0.5s ease-out",
                }}
              >
                <p className="font-serif text-3xl font-bold leading-none">+14</p>
                <p className="text-xs tracking-widest uppercase mt-1 opacity-80">años</p>
              </div>

              {/* Decorative frame */}
              <div
                className="absolute -bottom-8 -right-8 w-56 h-56 border border-accent/25 rounded-sm -z-10"
                style={{
                  transform: `translate(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px)`,
                  transition: "transform 0.6s ease-out",
                }}
              />
              <div
                className="absolute -top-5 -left-5 w-28 h-28 bg-accent/8 rounded-full -z-10 blur-xl"
              />
            </div>
          </div>

          {/* ── Text column ── */}
          <div style={revealStyle("right", 200)}>
            <span className="font-display text-[11px] tracking-[0.45em] uppercase text-accent mb-6 block font-medium">
              Conoce a Laura
            </span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-8 leading-[1.05] tracking-tight text-balance">
              Con pasión, experiencia<br />
              <span className="font-serif italic font-semibold text-accent">y corazón</span>
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Soy <strong className="text-foreground font-semibold">Publicista de la Universidad Autónoma de Occidente</strong>, y llevo
                14 años organizando bodas con todo mimo, paciencia y responsabilidad.
              </p>
              <p>
                Me especialicé como Wedding Planner con <strong className="text-foreground">INIBEP</strong> (Instituto
                Iberoamericano Event Planner) y <strong className="text-foreground">ABC</strong> (Asociación de Consultoras
                Nupciales).
              </p>
              <p className="text-accent font-medium italic">
                Estoy preparada y lista para hacer realidad la boda de tus sueños.
              </p>
            </div>

            {/* Credentials */}
            <div className="mt-10 space-y-3">
              {credentials.map((c, i) => (
                <div
                  key={c.title}
                  className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border/50 hover:border-accent/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-400 group"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(40px)",
                    filter: isVisible ? "blur(0)" : "blur(4px)",
                    transition: `opacity 0.8s ${400 + i * 120}ms cubic-bezier(0.16,1,0.3,1), transform 0.8s ${400 + i * 120}ms cubic-bezier(0.16,1,0.3,1), filter 0.8s ${400 + i * 120}ms cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s, border-color 0.3s, translate 0.3s`,
                  }}
                >
                  <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-white flex-shrink-0 border border-border/40 group-hover:shadow-md transition-shadow duration-300">
                    <Image src={c.image} alt={c.alt} fill className="object-contain p-1.5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm group-hover:text-accent transition-colors duration-300">{c.title}</h4>
                    <p className="text-muted-foreground text-sm">{c.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div
              className="mt-10 p-6 bg-accent/6 border-l-4 border-accent rounded-r-xl"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
                transition: "opacity 0.9s 700ms cubic-bezier(0.16,1,0.3,1), transform 0.9s 700ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <p className="font-serif text-xl italic text-foreground leading-relaxed">
                "El día de tu boda y durante la planificación, tu único trabajo es disfrutar, bailar, reír y ser feliz."
              </p>
            </div>

            <p className="mt-6 text-muted-foreground text-sm leading-relaxed">
              Contrario a la creencia popular, un wedding planner no es un lujo.
              En realidad, <strong className="text-foreground">optimizamos tus recursos</strong> y supervisamos todo,
              trabajando con proveedores certificados.
            </p>

            <div className="mt-10 pt-6 border-t border-border">
              <p className="font-serif text-2xl italic text-accent">Laura Martinez</p>
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mt-1">Wedding Planner Certificada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
