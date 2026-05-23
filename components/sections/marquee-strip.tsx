"use client"

const keywords = [
  "Bodas de Ensueño",
  "Wedding Planning",
  "Palmira · Colombia",
  "Días Perfectos",
  "Amor & Elegancia",
  "Coordinación Total",
  "Momentos Únicos",
  "Tu Historia Comienza",
  "14+ Años de Experiencia",
  "Bodas Destino",
]

function MarqueeRow({
  items,
  reverse = false,
  speed = "32s",
}: {
  items: string[]
  reverse?: boolean
  speed?: string
}) {
  const doubled = [...items, ...items]
  return (
    <div className="relative overflow-hidden flex items-center">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `${reverse ? "marquee-scroll-reverse" : "marquee-scroll"} ${speed} linear infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((word, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5">
            <span
              className="font-display font-semibold uppercase select-none"
              style={{
                fontSize: "11px",
                letterSpacing: "0.42em",
                color: i % 2 === 0 ? "oklch(1 0 0 / 0.88)" : "oklch(1 0 0 / 0.55)",
              }}
            >
              {word}
            </span>
            <span
              className="flex-shrink-0"
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "oklch(0.44 0.225 15 / 0.9)",
                boxShadow: "0 0 6px oklch(0.44 0.225 15 / 0.7)",
              }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

export function MarqueeStrip() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "oklch(0.10 0.020 8)",
        borderTop: "1px solid oklch(0.44 0.225 15 / 0.18)",
        borderBottom: "1px solid oklch(0.44 0.225 15 / 0.18)",
      }}
    >
      {/* Subtle crimson glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 50%, oklch(0.44 0.225 15 / 0.07) 0%, transparent 100%)",
        }}
      />

      {/* Edge fade masks */}
      <div
        className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, oklch(0.10 0.020 8), transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, oklch(0.10 0.020 8), transparent)" }}
      />

      <div className="py-3.5 flex flex-col gap-3">
        <MarqueeRow items={keywords} speed="34s" />
        <MarqueeRow items={[...keywords].reverse()} reverse speed="28s" />
      </div>
    </div>
  )
}
