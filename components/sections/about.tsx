"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Award, GraduationCap, Users, CheckCircle, Sparkles } from "lucide-react"

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
      description: "Publicista de la Universidad Autónoma de Occidente",
      logo: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 text-accent" fill="currentColor">
          <path d="M50 10C30 10 15 25 15 40v5c0 15 10 30 35 35 25-5 35-20 35-35v-5c0-15-15-30-35-30zm0 20c8 0 15 7 15 15s-7 15-15 15-15-7-15-15 7-15 15-15z"/>
          <circle cx="50" cy="40" r="12"/>
          <path d="M25 60c0 10 8 20 25 25-17-5-25-15-25-25zm50 0c0 10-8 20-25 25 17-5 25-15 25-25z"/>
        </svg>
      )
    },
    {
      icon: Award,
      title: "Certificación Internacional",
      description: "Especializada con INIBEP y ABC",
      logo: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 text-accent" fill="currentColor">
          <path d="M50 5L60 20H85L65 30L75 50L50 40L25 50L35 30L15 20H40L50 5z"/>
          <circle cx="50" cy="55" r="25" fill="none" stroke="currentColor" strokeWidth="3"/>
          <path d="M40 50L47 57L60 44" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      icon: Users,
      title: "Miembro ASOCOLWEP",
      description: "Asociación Colombiana de Wedding Planners",
      logo: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 text-accent" fill="currentColor">
          <circle cx="30" cy="35" r="15" />
          <circle cx="70" cy="35" r="15" />
          <path d="M10 80c0-15 10-25 20-25s20 10 20 25M50 55c-20 0-35 10-40 25 5 15 20 25 40 25s35-10 40-25c-5-15-20-25-40-25z" />
        </svg>
      )
    }
  ]

  const certifications = [
    { name: "INIBEP", color: "bg-red-900" },
    { name: "ABC", color: "bg-rose-800" },
    { name: "ASOCOLWEP", color: "bg-red-950" }
  ]

  return (
    <section ref={sectionRef} id="quien-soy" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-card">
        {/* Decorative red accents */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="absolute top-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
            {/* Decorative elements - now in red */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-accent/30 rounded-sm -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-full -z-10 floating-element" />
            
            {/* Floating badge - now in red */}
            <div className="absolute bottom-6 -right-2 md:right-6 bg-accent text-accent-foreground px-5 py-3 rounded-lg shadow-xl">
              <p className="font-serif text-2xl font-bold">+14</p>
              <p className="text-xs">años</p>
            </div>

            {/* Decorative sparkles */}
            <div className="absolute top-6 left-6 text-accent/60">
              <Sparkles className="w-6 h-6 animate-pulse" />
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

            {/* Certification badges with logos instead of emojis */}
            <div className={`mt-6 flex flex-wrap gap-3 transition-all duration-700 delay-750 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {certifications.map((cert) => (
                <div 
                  key={cert.name}
                  className={`${cert.color} text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium text-sm">{cert.name}</span>
                </div>
              ))}
            </div>

            {/* Quote highlight - now in red */}
            <div className={`mt-8 p-6 bg-accent/5 border-l-4 border-accent rounded-r-lg transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="font-serif text-xl italic text-foreground leading-relaxed">
                &ldquo;El día de tu boda y durante la planificación, tu único trabajo es disfrutar, bailar, reír y ser feliz&rdquo;
              </p>
            </div>

            <p className={`mt-6 text-muted-foreground transition-all duration-700 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Contrario a la creencia popular, un wedding planner no es un lujo que incrementará tu presupuesto. 
              En realidad, <strong className="text-foreground">optimizamos tus recursos</strong> y supervisamos todo, 
              trabajando con proveedores certificados para hacer de tu día un evento inolvidable.
            </p>

            {/* Credentials - now with custom logos */}
            <div className={`mt-8 grid gap-4 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {credentials.map((credential, index) => (
                <div 
                  key={credential.title}
                  className="flex items-start gap-4 p-4 bg-background rounded-lg hover:shadow-md transition-all duration-300 border border-border/50 hover:border-accent/30"
                  style={{ transitionDelay: `${1100 + index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    {credential.logo}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{credential.title}</h4>
                    <p className="text-muted-foreground text-sm">{credential.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Signature - now in red */}
            <div className={`mt-10 pt-6 border-t border-border transition-all duration-700 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="font-serif text-2xl italic text-accent">Laura Martínez</p>
              <p className="text-sm text-muted-foreground mt-1">Wedding Planner Certificada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

