import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import { PageIntro } from "@/components/page-intro"
// import { SectionArrow } from "@/components/section-arrow"
import { Footer } from "@/components/sections/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { GlobalScrollArrow } from "@/components/global-scroll-arrow"

// Lazy loading the sections that operate below the fold
const Services     = dynamic(() => import("@/components/sections/services").then(mod => mod.Services))
const About        = dynamic(() => import("@/components/sections/about").then(mod => mod.About))
const Gallery      = dynamic(() => import("@/components/sections/gallery").then(mod => mod.Gallery))
const Guide        = dynamic(() => import("@/components/sections/guide").then(mod => mod.Guide))
const CTA          = dynamic(() => import("@/components/sections/cta").then(mod => mod.CTA))
const Contact      = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact))

export default function Home() {
  return (
    <main className="overflow-x-hidden relative">
      <PageIntro />
      <Header />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Guide />
      <CTA />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <GlobalScrollArrow />
    </main>
  )
}
