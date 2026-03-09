"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Award, GraduationCap, Users } from "lucide-react"

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
      icon: GraduationCap,
      title: "Formación Profesional",
      description: "Publicista de la Universidad Autónoma de Occidente"
    },
    {
      icon: Award,
      title: "Certificación Internacional",
      description: "Especializada con INIBEP y ABC (Asociación de Consultoras Nupciales)"
    },
    {
      icon: Users,
      title: "Miembro ASOCOLWEP",
      description: "Asociación Colombiana de Wedding Planners"
    }
  ]

  return (
    <section ref={sectionRef} id="quien-soy" className="py-24 md:py-32 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="relative aspect-[3/5] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/gallery-bouquet.jpg"
                alt="Laura Martínez - Wedding Planner"
                fill
                className="object-cover transition-transform duration-700"
                style={{ transform: `scale(${imageScale})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-primary/30 rounded-sm -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full -z-10 floating-element" />
            
            {/* Floating badge */}
            <div className="absolute bottom-6 -right-2 md:right-6 bg-primary text-primary-foreground px-5 py-3 rounded-lg shadow-xl">
              <p className="font-serif text-2xl font-bold">+14</p>
              <p className="text-xs">años</p>
            </div>
          </div>

          {/* Content */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight text-balance">
              Conóceme
            </h2>
            
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p className={`text-lg transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Soy <strong className="text-foreground">Publicista de la Universidad Autónoma de Occidente</strong>, y llevo 
                14 años organizando bodas con todo mimo, paciencia y responsabilidad.
              </p>
              <p className={`transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Me especialicé como Wedding Planner con <strong className="text-foreground">INIBEP</strong> (Instituto 
                Iberoamericano Event Planner) y <strong className="text-foreground">ABC</strong> (Asociación de Consultoras 
                Nupciales) y hago parte de <strong className="text-foreground">ASOCOLWEP</strong> (Asociación Colombiana de 
                Wedding Planners).
              </p>
              <p className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Como ves, <em>estoy preparada y lista para hacer realidad la boda de tus sueños.</em>
              </p>
            </div>

            {/* Quote highlight */}
            <div className={`mt-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="font-serif text-xl italic text-foreground leading-relaxed">
                &ldquo;El día de tu boda y durante la planificación, tu único trabajo es disfrutar, bailar, reír y ser feliz&rdquo;
              </p>
            </div>

            <p className={`mt-6 text-muted-foreground transition-all duration-700 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Contrario a la creencia popular, un wedding planner no es un lujo que incrementará tu presupuesto. 
              En realidad, <strong className="text-foreground">optimizamos tus recursos</strong> y supervisamos todo, 
              trabajando con proveedores certificados para hacer de tu día un evento inolvidable.
            </p>

            {/* Credentials */}
            <div className={`mt-8 grid gap-4 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {credentials.map((credential, index) => (
                <div 
                  key={credential.title}
                  className="flex items-start gap-4 p-4 bg-background rounded-lg hover:shadow-md transition-all duration-300"
                  style={{ transitionDelay: `${1100 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <credential.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{credential.title}</h4>
                    <p className="text-muted-foreground text-sm">{credential.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Signature */}
            <div className={`mt-10 pt-6 border-t border-border transition-all duration-700 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="font-serif text-2xl italic text-primary">Laura Martínez</p>
              <p className="text-sm text-muted-foreground mt-1">Wedding Planner Certificada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
