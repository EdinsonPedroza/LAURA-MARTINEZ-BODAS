"use client"

import { useRef } from "react"

/* Magnetic wrapper — the child drifts slightly toward the cursor, then springs back on leave */
export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)"
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
      style={{ transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}
    >
      {children}
    </div>
  )
}
