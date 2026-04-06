"use client"

import { useEffect, useState } from "react"

export function PageIntro() {
  const [step, setStep] = useState(0)
  // 0 → black  1 → text in  2 → line in  3 → curtains open  4 → unmount

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 0),
      setTimeout(() => setStep(2), 300),
      setTimeout(() => setStep(3), 1050),
      setTimeout(() => setStep(4), 1950),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  if (step === 4) return null

  const isOpening = step >= 3

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: isOpening ? "none" : "all",
      }}
    >
      {/* ── Top curtain ── */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "51%",
          background: "oklch(0.055 0.012 8)",
          transform: isOpening ? "translateY(-101%)" : "translateY(0)",
          transition: isOpening ? "transform 1.25s cubic-bezier(0.76,0,0.24,1)" : "none",
        }}
      />

      {/* ── Bottom curtain ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "51%",
          background: "oklch(0.055 0.012 8)",
          transform: isOpening ? "translateY(101%)" : "translateY(0)",
          transition: isOpening ? "transform 1.25s cubic-bezier(0.76,0,0.24,1)" : "none",
        }}
      />

      {/* ── Center band (joins the two halves, hides the seam) ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "2%",
          transform: "translateY(-50%)",
          background: "oklch(0.055 0.012 8)",
          opacity: isOpening ? 0 : 1,
          transition: isOpening ? "opacity 0.3s ease" : "none",
        }}
      />

      {/* ── Brand content ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: isOpening ? 0 : 1,
          transition: isOpening ? "opacity 0.3s ease" : "none",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: "9px",
            letterSpacing: "0.58em",
            color: "oklch(0.44 0.225 15)",
            textTransform: "uppercase",
            marginBottom: "20px",
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          Wedding Planner · Palmira
        </p>

        {/* Main name */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
            color: "oklch(0.97 0.005 50)",
            fontWeight: 900,
            letterSpacing: "-0.025em",
            lineHeight: 0.93,
            textAlign: "center",
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? "translateY(0) scale(1)" : "translateY(20px) scale(0.96)",
            transition: "opacity 0.6s 0.05s cubic-bezier(0.16,1,0.3,1), transform 0.6s 0.05s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          Laura Martínez
        </h1>

        {/* Crimson line */}
        <div
          style={{
            height: "1px",
            width: step >= 2 ? "180px" : "0px",
            background: "linear-gradient(90deg, transparent, oklch(0.44 0.225 15), transparent)",
            marginTop: "22px",
            transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: "9px",
            letterSpacing: "0.38em",
            color: "oklch(0.97 0.005 50 / 0.30)",
            textTransform: "uppercase",
            marginTop: "14px",
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s 0.1s ease, transform 0.5s 0.1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          Bodas · Eventos · Amor
        </p>
      </div>
    </div>
  )
}
