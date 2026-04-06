"use client"

import { ChevronDown } from "lucide-react"

export function SectionArrow({ targetId }: { targetId: string }) {
  const scroll = () => {
    const el = document.getElementById(targetId)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex justify-center py-6 relative z-10">
      <button
        onClick={scroll}
        aria-label="Ver más"
        className="group flex flex-col items-center gap-1.5 cursor-pointer"
        style={{ background: "none", border: "none", padding: 0 }}
      >
        <span
          className="font-display text-[9px] tracking-[0.45em] uppercase font-semibold transition-colors duration-300"
          style={{ color: "oklch(0.44 0.225 15 / 0.6)" }}
        >
          Ver más
        </span>
        <div
          className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-400 group-hover:scale-110"
          style={{
            borderColor: "oklch(0.44 0.225 15 / 0.3)",
            background: "oklch(0.44 0.225 15 / 0.04)",
          }}
        >
          <ChevronDown
            className="w-4 h-4 animate-scroll-arrow"
            style={{ color: "oklch(0.44 0.225 15)" }}
          />
        </div>
      </button>
    </div>
  )
}
