import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Laura Martínez Bodas",
  description:
    "Términos y condiciones de los servicios de wedding planning de Laura Martínez Bodas en Palmira, Valle del Cauca.",
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: "1. Aceptación de los términos",
    body: "Al usar este sitio web o contratar los servicios de Laura Martínez Bodas aceptas estos términos y condiciones. Cada evento se formaliza además mediante una propuesta o contrato individual que prevalece sobre este documento en lo que le sea específico.",
  },
  {
    title: "2. Servicios y cotizaciones",
    body: "Ofrecemos servicios de organización y coordinación de bodas y eventos. Toda cotización es personalizada, tiene una vigencia de 30 días y los valores se expresan en pesos colombianos (COP). Los servicios incluidos son únicamente los descritos por escrito en la propuesta aceptada.",
  },
  {
    title: "3. Reservas y pagos",
    body: "La fecha del evento se reserva con el anticipo acordado en la propuesta. El saldo se paga según el cronograma pactado y debe estar cubierto antes de la fecha del evento. La reserva de fecha es exclusiva: al confirmarla, dejamos de ofrecer esa fecha a otras parejas.",
  },
  {
    title: "4. Cambios y cancelaciones",
    body: "Los cambios de fecha están sujetos a disponibilidad y a las políticas de los proveedores ya contratados. En caso de cancelación por parte del cliente, el anticipo no es reembolsable, pues cubre la reserva exclusiva de la fecha y el trabajo de planeación ya ejecutado. Los casos de fuerza mayor se evaluarán individualmente buscando siempre la mejor solución para la pareja.",
  },
  {
    title: "5. Proveedores externos",
    body: "Actuamos como planificadores y coordinadores. Los servicios de terceros (lugares, catering, fotografía, música, decoración, entre otros) se rigen por los contratos de cada proveedor. Recomendamos y coordinamos proveedores de confianza, pero la responsabilidad por la ejecución de cada servicio contratado directamente por el cliente corresponde al respectivo proveedor.",
  },
  {
    title: "6. Uso de imagen",
    body: "Nos encanta mostrar nuestro trabajo: podremos publicar fotografías del evento en nuestro portafolio y redes sociales, siempre con respeto por la intimidad de la pareja y sus invitados. Si prefieres que tu boda no sea publicada, indícalo por escrito y lo respetaremos sin condiciones.",
  },
  {
    title: "7. Propiedad intelectual",
    body: "El contenido de este sitio web —textos, diseño, logotipo y fotografías— es propiedad de Laura Martínez Bodas o de sus autores bajo licencia. No está permitida su reproducción sin autorización previa.",
  },
]

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-light text-muted-foreground hover:text-primary transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4 text-balance">
          Términos y <span className="text-primary italic">Condiciones</span>
        </h1>
        <p className="text-muted-foreground font-light leading-relaxed mb-12 max-w-prose">
          Estos términos regulan el uso de este sitio web y la contratación de los servicios de Laura Martínez Bodas,
          wedding planner en Palmira, Valle del Cauca.
        </p>

        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.title} className="border-t border-border pt-6">
              <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3">{s.title}</h2>
              <p className="text-muted-foreground font-light leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-14 pt-6 border-t border-border text-xs font-light text-muted-foreground">
          Última actualización: julio de 2026 · Consulta también nuestra{" "}
          <Link href="/privacidad" className="text-primary hover:underline">
            Política de Privacidad
          </Link>
        </p>
      </div>
    </main>
  )
}
