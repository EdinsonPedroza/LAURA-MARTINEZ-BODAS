import type { Metadata } from 'next'
import Script from 'next/script'
import { Playfair_Display, Plus_Jakarta_Sans, DM_Sans, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ScrollProgress } from '@/components/scroll-progress'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lauramartinezbodas.com'
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Laura Martínez Bodas | Wedding Planner en Palmira, Valle del Cauca',
  description: 'Con más de 10 años de experiencia organizando bodas únicas, Laura Martínez transforma cada detalle en una experiencia mágica llena de emoción, elegancia y amor. Wedding Planner en Palmira, Colombia.',
  keywords: 'wedding planner Palmira, organizador de bodas Palmira, wedding planner Valle del Cauca, bodas en Palmira, bodas destino Colombia, wedding planner Colombia',
  alternates: {
    // './' resolves per-route against metadataBase → self-referencing canonical on every page
    canonical: './',
  },
  openGraph: {
    title: 'Laura Martínez Bodas | Wedding Planner',
    description: 'Haz de tu boda un sueño inolvidable con Laura Martínez Bodas',
    type: 'website',
    locale: 'es_CO',
    url: SITE_URL,
    siteName: 'Laura Martínez Bodas',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Laura Martínez Bodas — Wedding Planner en Palmira, Valle del Cauca',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laura Martínez Bodas | Wedding Planner',
    description: 'Haz de tu boda un sueño inolvidable con Laura Martínez Bodas',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  // Set NEXT_PUBLIC_GSC_VERIFICATION in Vercel to verify Search Console via meta tag
  // (or verify the domain via DNS, which is preferred)
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
}

export const viewport = {
  themeColor: '#0a0807',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Laura Martínez Bodas',
  description:
    'Wedding planner en Palmira, Valle del Cauca. Más de 10 años de experiencia organizando bodas únicas, elegantes y llenas de emoción en Colombia.',
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: '+573186049903',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Palmira',
    addressRegion: 'Valle del Cauca',
    addressCountry: 'CO',
  },
  areaServed: [
    { '@type': 'City', name: 'Palmira' },
    { '@type': 'AdministrativeArea', name: 'Valle del Cauca' },
  ],
  knowsAbout: ['Wedding planning', 'Organización de bodas', 'Bodas destino', 'Decoración de eventos'],
  sameAs: [
    'https://www.instagram.com/bodaslauramartinez',
    'https://www.facebook.com/bodasLauraMartinez',
  ],
  priceRange: '$$$',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${playfair.variable} ${jakartaSans.variable} ${montserrat.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        {children}
        <Analytics />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
