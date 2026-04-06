import type { Metadata } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ScrollProgress } from '@/components/scroll-progress'
import './globals.css'

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
  themeColor: '#0a0807',
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
      <body className={`${dmSans.variable} ${playfair.variable} ${jakartaSans.variable} font-sans antialiased`}>
        <ScrollProgress />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
