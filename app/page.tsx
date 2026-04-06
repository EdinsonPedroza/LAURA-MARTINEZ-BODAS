import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import { Footer } from "@/components/sections/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

// Lazy loading the sections that operate below the fold
const Services = dynamic(() => import("@/components/sections/services").then(mod => mod.Services))
const About = dynamic(() => import("@/components/sections/about").then(mod => mod.About))
const Benefits = dynamic(() => import("@/components/sections/benefits").then(mod => mod.Benefits))
const Testimonials = dynamic(() => import("@/components/sections/testimonials").then(mod => mod.Testimonials))
const Gallery = dynamic(() => import("@/components/sections/gallery").then(mod => mod.Gallery))
const CTA = dynamic(() => import("@/components/sections/cta").then(mod => mod.CTA))
const Contact = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact))

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <Services />
      <About />
      <Benefits />
      <Testimonials />
      <Gallery />
      <CTA />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
