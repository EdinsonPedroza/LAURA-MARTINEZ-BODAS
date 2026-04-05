"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let rafId: number
    let isHovering = false

    const updateCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const setHoverOn = () => { isHovering = true }
    const setHoverOff = () => { isHovering = false }

    const attachHoverListeners = () => {
      document.querySelectorAll("a, button, [role=button], input, textarea, select, label").forEach(el => {
        el.addEventListener("mouseenter", setHoverOn)
        el.addEventListener("mouseleave", setHoverOff)
      })
    }

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`
        dotRef.current.style.top = `${mouseY}px`
        dotRef.current.style.opacity = "1"
      }

      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top = `${ringY}px`
        ringRef.current.style.opacity = "1"
        ringRef.current.style.transform = `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", updateCursor)
    attachHoverListeners()
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", updateCursor)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
