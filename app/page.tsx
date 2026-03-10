import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { About } from "@/components/sections/about"
import { Benefits } from "@/components/sections/benefits"
import { Testimonials } from "@/components/sections/testimonials"
import { Stats } from "@/components/sections/stats"
import { Gallery } from "@/components/sections/gallery"
import { CTA } from "@/components/sections/cta"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <Services />
      <About />
      <Benefits />
      <Testimonials />
      <Stats />
      <Gallery />
      <CTA />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
