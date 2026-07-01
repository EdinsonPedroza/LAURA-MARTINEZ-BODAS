"use client"

import { useEffect, useRef } from "react"

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const render = () => {
      ticking = false
      const el = barRef.current
      if (!el) return
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      const ratio = total > 0 ? scrollTop / total : 0
      // scaleX is GPU-composited — no layout, no React re-render per frame
      el.style.transform = `scaleX(${ratio})`
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(render)
    }

    render()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 z-[100] h-[3px] w-full origin-left"
      style={{
        transform: "scaleX(0)",
        background: "linear-gradient(90deg, oklch(0.44 0.225 15), oklch(0.60 0.20 20), oklch(0.44 0.225 15))",
        backgroundSize: "200% 100%",
        animation: "shimmer 2s linear infinite",
        boxShadow: "0 0 12px oklch(0.44 0.225 15 / 0.8), 0 0 4px oklch(0.44 0.225 15)",
        willChange: "transform",
      }}
    />
  )
}
