"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [imageScale, setImageScale] = useState(1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollProgress = 1 - (rect.top / window.innerHeight)
        const scale = Math.min(Math.max(1, 1 + scrollProgress * 0.1), 1.1)
        setImageScale(scale)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const credentials = [
    {
      title: "Formacion Profesional",
      description: "Publicista de la Universidad Autonoma de Occidente",
      image: "/images/descarga.png",
      alt: "Universidad Autonoma de Occidente"
    },
    {
      title: "Certificacion Internacional",
      description: "Especializada con INIBEP",
      image: "/images/Certified-2-PNG-1-1000x1024-1-768x786.png",
      alt: "Certificacion INIBEP"
    },
    {
      title: "Certificacion ABC",
      description: "Asociacion de Consultoras Nupciales",
      image: "/images/1-768x768.png",
      alt: "Certificacion ABC"
    }
  ]

  return (
    <section ref={sectionRef} id="quien-soy" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-rose-50/30 to-background">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="absolute top-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="relative aspect-[3/5] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/gallery-bouquet.jpg"
                alt="Laura Martinez - Wedding Planner"
                fill
                className="object-cover transition-transform duration-700"
                style={{ transform: `scale(${imageScale})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-accent/30 rounded-sm -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-full -z-10" />
            
            <div className="absolute bottom-6 -right-2 md:right-6 bg-accent text-accent-foreground px-5 py-3 rounded-lg shadow-xl">
              <p className="font-serif text-2xl font-bold">14</p>
              <p className="text-xs">anos</p>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight text-balance">
              Conoceme
            </h2>
            
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Soy <strong className="text-foreground">Publicista de la Universidad Autonoma de Occidente</strong>, y llevo 
                14 anos organizando bodas con todo mimo, paciencia y responsabilidad.
              </p>
              <p>
                Me especialice como Wedding Planner con <strong className="text-foreground">INIBEP</strong> (Instituto 
                Iberoamericano Event Planner) y <strong className="text-foreground">ABC</strong> (Asociacion de Consultoras 
                Nupciales).
              </p>
              <p>
                Como ves, <em className="text-accent">estoy preparada y lista para hacer realidad la boda de tus suenos.</em>
              </p>
            </div>

            <div className="mt-8 grid gap-4">
              {credentials.map((credential) => (
                <div 
                  key={credential.title}
                  className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border/50"
                >
                  <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-white flex-shrink-0 border border-border/50">
                    <Image
                      src={credential.image}
                      alt={credential.alt}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{credential.title}</h4>
                    <p className="text-muted-foreground text-sm">{credential.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-accent/5 border-l-4 border-accent rounded-r-lg">
              <p className="font-serif text-xl italic text-foreground leading-relaxed">
                El dia de tu boda y durante la planificacion, tu unico trabajo es disfrutar, bailar, reir y ser feliz
              </p>
            </div>

            <p className="mt-6 text-muted-foreground">
              Contrario a la creencia popular, un wedding planner no es un lujo que incrementara tu presupuesto. 
              En realidad, <strong className="text-foreground">optimizamos tus recursos</strong> y supervisamos todo, 
              trabajando con proveedores certificados para hacer de tu dia un evento inolvidable.
            </p>

            <div className="mt-10 pt-6 border-t border-border">
              <p className="font-serif text-2xl italic text-accent">Laura Martinez</p>
              <p className="text-sm text-muted-foreground mt-1">Wedding Planner Certificada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

