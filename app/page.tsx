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

      {/* Services — crimson sweep igual que el resto */}
      <SectionCurtain mode="sweep" color="oklch(0.44 0.225 15)" accentColor="oklch(0.72 0.065 70)" duration={750}>
        <Services />
      </SectionCurtain>

      {/* Crimson sweep → about */}
      <SectionCurtain mode="sweep" color="oklch(0.44 0.225 15)" accentColor="oklch(0.72 0.065 70)" duration={680}>
        <About />
      </SectionCurtain>

      {/* Dark sweep → gallery */}
      <SectionCurtain mode="sweep" color="oklch(0.06 0.015 5)" duration={800} barWidth="70%">
        <Gallery />
      </SectionCurtain>

      {/* Wine sweep → guide */}
      <SectionCurtain mode="sweep" color="oklch(0.12 0.040 5)" accentColor="oklch(0.44 0.225 15)" duration={640}>
        <Guide />
      </SectionCurtain>

      {/* Explosive crimson → CTA */}
      <SectionCurtain mode="sweep" color="oklch(0.44 0.225 15)" accentColor="oklch(0.72 0.065 70)" duration={580} barWidth="80%">
        <CTA />
      </SectionCurtain>

      {/* Dark sweep → contact */}
      <SectionCurtain mode="sweep" color="oklch(0.08 0.018 5)" duration={650}>
        <Contact />
      </SectionCurtain>

      <Footer />
      <WhatsAppButton />
      <GlobalScrollArrow />
    </main>
  )
}
