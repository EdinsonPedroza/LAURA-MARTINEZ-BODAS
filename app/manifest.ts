import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Laura Martínez Bodas',
    short_name: 'LM Bodas',
    description: 'Wedding Planner en Palmira, Valle del Cauca. Bodas únicas, elegantes y llenas de emoción.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0807',
    theme_color: '#0a0807',
    lang: 'es-CO',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
