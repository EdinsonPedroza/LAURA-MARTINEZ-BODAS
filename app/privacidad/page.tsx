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
    body: "Laura Martínez Bodas, con sede en Palmira, Valle del Cauca (Colombia), es responsable del tratamiento de los datos personales que nos compartes a través de este sitio web, WhatsApp, redes sociales o durante la planeación de tu evento. Puedes contactarnos en bodaslauramartinez@gmail.com o al WhatsApp +57 318 604 9903.",
  },
  {
    title: "2. Datos que recolectamos",
    body: "Recolectamos los datos necesarios para planear tu evento: nombres de la pareja, teléfono y correo de contacto, fecha y lugar tentativo del evento, número estimado de invitados y preferencias de estilo y presupuesto. A través del formulario de contacto recogemos tu nombre, teléfono, correo, fecha tentativa de la boda y el mensaje que nos escribes.",
  },
  {
    title: "3. Finalidad del tratamiento",
    body: "Usamos tus datos para responder tus consultas, preparar cotizaciones, coordinar proveedores y gestionar la logística de tu evento. Solo compartimos con cada proveedor la información estrictamente necesaria para prestar su servicio. No vendemos tus datos ni los usamos con fines distintos a los aquí descritos.",
  },
  {
    title: "4. Autorización",
    body: "El tratamiento de tus datos requiere tu autorización previa, expresa e informada, la cual otorgas al marcar la casilla de aceptación del formulario de contacto o al compartirnos tu información por WhatsApp, correo o redes sociales para planear tu evento. Esta autorización puede ser revocada en cualquier momento.",
  },
  {
    title: "5. Tus derechos (Ley 1581 de 2012)",
    body: "De acuerdo con la ley colombiana de protección de datos personales, puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos, así como revocar la autorización otorgada y solicitar prueba de la misma. Para ejercer estos derechos escríbenos a bodaslauramartinez@gmail.com o por WhatsApp al +57 318 604 9903.",
  },
  {
    title: "6. Consultas y reclamos",
    body: "Atenderemos tus consultas dentro de los diez (10) días hábiles siguientes a su recibo y tus reclamos dentro de los quince (15) días hábiles, conforme a los artículos 14 y 15 de la Ley 1581 de 2012. Si el plazo no es suficiente, te informaremos los motivos y la fecha en que se atenderá tu solicitud.",
  },
  {
    title: "7. Fotografías del evento",
    body: "Las fotografías de tu boda solo se publican en nuestro portafolio y redes sociales con tu consentimiento. Puedes revocarlo en cualquier momento y retiraremos el contenido correspondiente.",
  },
  {
    title: "8. Seguridad y conservación",
    body: "Adoptamos medidas razonables para proteger tu información contra acceso no autorizado, pérdida o alteración. Conservamos los datos durante la relación comercial y por los plazos que exija la ley.",
  },
  {
    title: "9. Cookies y analítica",
    body: "Utilizamos métricas anónimas de visitas (Vercel Analytics) y, cuando está habilitado, Google Analytics 4, que instala cookies propias y de terceros para entender de forma agregada cómo se usa el sitio y mejorar la experiencia. Anonimizamos la dirección IP y no usamos estas cookies con fines publicitarios ni de venta de datos. Puedes bloquear o eliminar las cookies desde la configuración de tu navegador; algunas funciones podrían verse afectadas.",
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
