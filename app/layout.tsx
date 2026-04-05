import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ScrollProgress } from '@/components/scroll-progress'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Laura Martínez Bodas | Wedding Planner en Palmira, Valle del Cauca',
  description: 'Con más de 10 años de experiencia organizando bodas únicas, Laura Martínez transforma cada detalle en una experiencia mágica llena de emoción, elegancia y amor. Wedding Planner en Palmira, Colombia.',
  keywords: 'wedding planner Palmira, organizador de bodas Palmira, wedding planner Valle del Cauca, bodas en Palmira, bodas destino Colombia, wedding planner Colombia',
  openGraph: {
    title: 'Laura Martínez Bodas | Wedding Planner',
    description: 'Haz de tu boda un sueño inolvidable con Laura Martínez Bodas',
    type: 'website',
    locale: 'es_CO',
  },
}

export const viewport = {
  themeColor: '#5a6b4a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${cormorant.variable} ${outfit.variable} font-sans antialiased`}>
        <ScrollProgress />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
