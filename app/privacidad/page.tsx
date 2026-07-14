import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Privacidad | Laura Martínez Bodas",
  description:
    "Política de tratamiento de datos personales de Laura Martínez Bodas conforme a la Ley 1581 de 2012 (Colombia).",
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: "1. Responsable del tratamiento",
    body: "Laura Martínez Bodas, con sede en Palmira, Valle del Cauca (Colombia), es responsable del tratamiento de los datos personales que nos compartes a través de este sitio web, WhatsApp, redes sociales o durante la planeación de tu evento.",
  },
  {
    title: "2. Datos que recolectamos",
    body: "Recolectamos los datos necesarios para planear tu evento: nombres de la pareja, teléfono y correo de contacto, fecha y lugar tentativo del evento, número estimado de invitados y preferencias de estilo y presupuesto.",
  },
  {
    title: "3. Finalidad del tratamiento",
    body: "Usamos tus datos para responder tus consultas, preparar cotizaciones, coordinar proveedores y gestionar la logística de tu evento. Solo compartimos con cada proveedor la información estrictamente necesaria para prestar su servicio. No vendemos tus datos ni los usamos con fines distintos a los aquí descritos.",
  },
  {
    title: "4. Tus derechos (Ley 1581 de 2012)",
    body: "De acuerdo con la ley colombiana de protección de datos personales, puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos, así como revocar la autorización otorgada. Para ejercer estos derechos escríbenos por WhatsApp al +57 318 604 9903.",
  },
  {
    title: "5. Fotografías del evento",
    body: "Las fotografías de tu boda solo se publican en nuestro portafolio y redes sociales con tu consentimiento. Puedes revocarlo en cualquier momento y retiraremos el contenido correspondiente.",
  },
  {
    title: "6. Seguridad y conservación",
    body: "Adoptamos medidas razonables para proteger tu información contra acceso no autorizado, pérdida o alteración. Conservamos los datos durante la relación comercial y por los plazos que exija la ley.",
  },
  {
    title: "7. Cookies y analítica",
    body: "Este sitio no utiliza cookies de rastreo publicitario. Usamos métricas anónimas de visitas (Vercel Analytics) únicamente para mejorar la experiencia del sitio.",
  },
]

export default function PrivacidadPage() {
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
          Política de <span className="text-primary italic">Privacidad</span>
        </h1>
        <p className="text-muted-foreground font-light leading-relaxed mb-12 max-w-prose">
          En Laura Martínez Bodas cuidamos tus datos personales con el mismo detalle con el que cuidamos tu boda,
          conforme a la Ley 1581 de 2012 y sus decretos reglamentarios.
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
          Última actualización: julio de 2026 · Consulta también nuestros{" "}
          <Link href="/terminos" className="text-primary hover:underline">
            Términos y Condiciones
          </Link>
        </p>
      </div>
    </main>
  )
}
