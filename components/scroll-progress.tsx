"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0)
    }
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-[3px] origin-left"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, oklch(0.44 0.225 15), oklch(0.60 0.20 20), oklch(0.44 0.225 15))",
        backgroundSize: "200% 100%",
        animation: "shimmer 2s linear infinite",
        boxShadow: "0 0 12px oklch(0.44 0.225 15 / 0.8), 0 0 4px oklch(0.44 0.225 15)",
        transition: "width 0.1s linear",
      }}
    />
  )
}
