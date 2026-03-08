"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Heart, Globe, Star } from "lucide-react"

const stats = [
  {
    icon: Award,
    value: 14,
    suffix: "+",
    label: "Años creando bodas perfectas",
    color: "text-amber-400"
  },
  {
    icon: Heart,
    value: 100,
    suffix: "+",
    label: "Parejas felices",
    color: "text-rose-400"
  },
  {
    icon: Globe,
    value: 15,
    suffix: "+",
    label: "Destinos internacionales",
    color: "text-sky-400"
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "",
    label: "Calificación en Google",
    color: "text-yellow-400"
  }
]

function AnimatedCounter({ value, suffix, isVisible }: { value: number, suffix: string, isVisible: boolean }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!isVisible) return
    
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let currentStep = 0
    
    const timer = setInterval(() => {
      currentStep++
      setCount(Math.min(increment * currentStep, value))
      
      if (currentStep >= steps) {
        clearInterval(timer)
        setCount(value)
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [isVisible, value])
  
  return (
    <span>
      {Number.isInteger(value) ? Math.floor(count) : count.toFixed(1)}{suffix}
    </span>
  )
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-primary via-accent to-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className={`text-center transition-all duration-1000 group cursor-default ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <div className="mb-4 flex justify-center">
                <div className={`w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
              </div>
              <div className="font-serif text-5xl md:text-6xl text-primary-foreground mb-2 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <p className="text-primary-foreground/80 text-sm md:text-base tracking-wide font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
