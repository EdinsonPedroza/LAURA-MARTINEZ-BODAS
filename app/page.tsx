import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import { PageIntro } from "@/components/page-intro"
import { Footer } from "@/components/sections/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { GlobalScrollArrow } from "@/components/global-scroll-arrow"
import { SectionCurtain } from "@/components/section-curtain"

// Lazy loading the sections that operate below the fold
const Services = dynamic(() => import("@/components/sections/services").then(mod => mod.Services))
const About    = dynamic(() => import("@/components/sections/about").then(mod => mod.About))
const Gallery  = dynamic(() => import("@/components/sections/gallery").then(mod => mod.Gallery))
const Guide    = dynamic(() => import("@/components/sections/guide").then(mod => mod.Guide))
const CTA      = dynamic(() => import("@/components/sections/cta").then(mod => mod.CTA))
const Contact  = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact))

export default function Home() {
  return (
    <main className="overflow-x-hidden relative">
      <PageIntro />
      <Header />
      <Hero />

      {/* Diagonal slash ← from left */}
      <SectionCurtain type="slash">
        <Services />
      </SectionCurtain>

      {/* Iris burst from center of image */}
      <SectionCurtain type="radial" origin="42% 55%">
        <About />
      </SectionCurtain>

      {/* Reverse slash ← from right */}
      <SectionCurtain type="slash-reverse">
        <Gallery />
      </SectionCurtain>

      {/* Diagonal slash ← from left */}
      <SectionCurtain type="slash" delay={40}>
        <Guide />
      </SectionCurtain>

      {/* Radial erupts from bottom — the most dramatic */}
      <SectionCurtain type="radial" origin="50% 92%">
        <CTA />
      </SectionCurtain>

      {/* Reverse slash ← from right */}
      <SectionCurtain type="slash-reverse" delay={20}>
        <Contact />
      </SectionCurtain>

      <Footer />
      <WhatsAppButton />
      <GlobalScrollArrow />
    </main>
  )
}
