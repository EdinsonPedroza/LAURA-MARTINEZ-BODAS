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

      {/* Services — 8 blocks, diagonal */}
      <SectionCurtain steps={8} duration={880} skew={4}>
        <Services />
      </SectionCurtain>

      {/* About — 6 blocks, steeper diagonal */}
      <SectionCurtain steps={6} duration={720} skew={7}>
        <About />
      </SectionCurtain>

      {/* Gallery — 10 blocks, fastest per-block snap */}
      <SectionCurtain steps={10} duration={1000} skew={3}>
        <Gallery />
      </SectionCurtain>

      {/* Guide — 7 blocks */}
      <SectionCurtain steps={7} duration={800} skew={5}>
        <Guide />
      </SectionCurtain>

      {/* CTA — 5 blocks, most explosive (fewer steps = bigger jumps) */}
      <SectionCurtain steps={5} duration={600} skew={8}>
        <CTA />
      </SectionCurtain>

      {/* Contact — 8 blocks, slight diagonal */}
      <SectionCurtain steps={8} duration={840} skew={3}>
        <Contact />
      </SectionCurtain>

      <Footer />
      <WhatsAppButton />
      <GlobalScrollArrow />
    </main>
  )
}
