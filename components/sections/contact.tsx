"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Cra. 22 #35-39",
    subvalue: "Palmira, Valle del Cauca, Colombia"
  },
  {
    icon: Phone,
    label: "Teléfono / WhatsApp",
    value: "+57 318 6049903",
    link: "tel:+573186049903"
  },
  {
    icon: Mail,
    label: "Email",
    value: "bodaslauramartinez@gmail.com",
    link: "mailto:bodaslauramartinez@gmail.com"
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Abierto 24 horas",
    subvalue: "Respondemos lo antes posible"
  }
]

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    message: ""
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Build WhatsApp message with form data
    const message = `¡Hola Laura! Me gustaría agendar una asesoría para mi boda.

*Datos de contacto:*
- Nombre: ${formData.name}
- Teléfono: ${formData.phone}
- Email: ${formData.email}
${formData.date ? `- Fecha tentativa de boda: ${formData.date}` : ""}

*Mensaje:*
${formData.message}

¡Gracias!`

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message)
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/573186049903?text=${encodedMessage}`, "_blank")
  }

  return (
    <section ref={sectionRef} id="contacto" className="py-24 md:py-32 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-primary-foreground/70 text-sm tracking-[0.3em] uppercase font-medium mb-4 block">
            Contacto
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6 text-balance">
            Comienza a planear tu{" "}
            <span className="italic">boda soñada</span>
          </h2>
          <p className="text-primary-foreground/70 leading-relaxed">
            Estamos listos para escucharte y crear la boda perfecta para ti.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="bg-primary-foreground/10 border-primary-foreground/20 shadow-2xl backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <h3 className="font-serif text-2xl text-primary-foreground mb-6">
                  Envíanos un mensaje
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-primary-foreground mb-2">
                        Nombre completo *
                      </label>
                      <Input 
                        id="name"
                        name="name"
                        placeholder="Tu nombre"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground focus:ring-primary-foreground"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-primary-foreground mb-2">
                        Teléfono *
                      </label>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Tu teléfono"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground focus:ring-primary-foreground"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary-foreground mb-2">
                      Email *
                    </label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground focus:ring-primary-foreground"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-primary-foreground mb-2">
                      Fecha tentativa de la boda
                    </label>
                    <Input 
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground focus:ring-primary-foreground [color-scheme:dark]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary-foreground mb-2">
                      Mensaje *
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      placeholder="Cuéntanos sobre tu boda soñada..."
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground focus:ring-primary-foreground resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full btn-elegant bg-primary-foreground text-foreground hover:bg-primary-foreground/90 py-6 text-lg font-medium transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Agendar por WhatsApp
                  </Button>
                  
                  <p className="text-center text-primary-foreground/50 text-sm">
                    Al enviar, serás redirigido a WhatsApp con tu mensaje
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-primary-foreground mb-8">
                Información de contacto
              </h3>
              
              {contactInfo.map((info) => (
                <div 
                  key={info.label}
                  className="flex items-start gap-4 p-4 rounded-lg bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-all duration-300 group card-hover"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0 group-hover:bg-primary-foreground/20 transition-colors">
                    <info.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60 mb-1">{info.label}</p>
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-primary-foreground font-medium hover:underline transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-primary-foreground font-medium">{info.value}</p>
                    )}
                    {info.subvalue && (
                      <p className="text-sm text-primary-foreground/60">{info.subvalue}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div className="pt-8 mt-8 border-t border-primary-foreground/20">
                <h4 className="font-serif text-xl text-primary-foreground mb-4">
                  Síguenos en redes
                </h4>
                <div className="flex flex-wrap items-center gap-4">
                  <a 
                    href="https://www.instagram.com/bodaslauramartinez" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="font-medium">Instagram</span>
                  </a>
                  <a 
                    href="https://facebook.com/bodasLauraMartinez" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 rounded-lg bg-[#1877F2] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="font-medium">Facebook</span>
                  </a>
                </div>
              </div>

              {/* Brand Name */}
              <div className="pt-8 mt-8 border-t border-primary-foreground/20">
                <h4 className="font-serif text-3xl text-primary-foreground mb-2">
                  Laura Martínez Bodas
                </h4>
                <p className="text-primary-foreground/60">
                  Wedding Planner | Palmira, Valle del Cauca
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
