"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, Menu } from "lucide-react"

const navLinks = [
  { href: "#servicios",   label: "Servicios" },
  { href: "#quien-soy",   label: "Quién Soy" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#galeria",     label: "Nuestras Bodas" },
  { href: "#contacto",    label: "Contacto" },
]

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
      const sections = navLinks.map(l => l.href.replace("#", ""))
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const { top, bottom } = el.getBoundingClientRect()
          if (top <= 200 && bottom >= 200) { setActiveSection(id); break }
        }
      }
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* Prevent body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      {/* ═══════════════════════════════
          MAIN HEADER
      ═══════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          paddingTop: isScrolled ? "14px" : "24px",
          paddingBottom: isScrolled ? "14px" : "24px",
          background: isScrolled
            ? "oklch(0.98 0.008 48 / 0.96)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 75%, transparent 100%)",
          backdropFilter: isScrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(24px) saturate(180%)" : "none",
          boxShadow: isScrolled
            ? "0 1px 0 oklch(0.44 0.225 15 / 0.12), 0 4px 24px rgba(0,0,0,0.06)"
            : "none",
        }}
      >
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between">

            {/* ─── Logo ─── */}
            <Link href="/" className="relative z-10 flex items-center flex-shrink-0">
              <div
                className="relative w-auto"
                style={{
                  height: isScrolled ? "26px" : "34px",
                  aspectRatio: "1536 / 244",
                  transition: "height 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <Image
                  src="/images/Logo-Blanco-1536x244.png"
                  alt="Laura Martínez Bodas"
                  fill
                  className="object-contain"
                  style={{
                    filter: isScrolled ? "brightness(0)" : "brightness(0) invert(1)",
                    transition: "filter 0.4s ease",
                  }}
                />
              </div>
            </Link>

            {/* ─── Desktop Navigation ─── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = activeSection === link.href.replace("#", "")
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 group overflow-hidden"
                    style={{
                      fontSize: "11.5px",
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      letterSpacing: "0.13em",
                      textTransform: "uppercase",
                      color: isScrolled
                        ? active ? "oklch(0.44 0.225 15)" : "oklch(0.22 0.025 5)"
                        : active ? "white" : "rgba(255,255,255,0.60)",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.color = isScrolled
                          ? "oklch(0.44 0.225 15)"
                          : "white"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.color = isScrolled
                          ? "oklch(0.22 0.025 5)"
                          : "rgba(255,255,255,0.60)"
                      }
                    }}
                  >
                    {link.label}
                    {/* Underline that grows from left on active, or on hover via CSS */}
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] rounded-full transition-all duration-400"
                      style={{
                        width: active ? "70%" : "0%",
                        background: "oklch(0.44 0.225 15)",
                        transition: "width 0.35s cubic-bezier(0.16,1,0.3,1)",
                      }}
                    />
                    {/* Hover underline (group-hover via inline) */}
                  </a>
                )
              })}
            </nav>

            {/* ─── Right: Socials + CTA ─── */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Social icons */}
              <div className="flex items-center gap-1.5 mr-1">
                <a
                  href="https://www.instagram.com/bodaslauramartinez"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: isScrolled
                      ? "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)"
                      : "rgba(255,255,255,0.14)",
                    color: "white",
                    backdropFilter: isScrolled ? "none" : "blur(6px)",
                    boxShadow: isScrolled
                      ? "0 3px 12px rgba(253,29,29,0.35)"
                      : "0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = "translateY(-3px) scale(1.15)"
                    el.style.boxShadow = "0 6px 20px rgba(253,29,29,0.5)"
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = "translateY(0) scale(1)"
                    el.style.boxShadow = isScrolled
                      ? "0 3px 12px rgba(253,29,29,0.35)"
                      : "0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)"
                  }}
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://facebook.com/bodasLauraMartinez"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: isScrolled ? "#1877F2" : "rgba(255,255,255,0.14)",
                    color: "white",
                    backdropFilter: isScrolled ? "none" : "blur(6px)",
                    boxShadow: isScrolled
                      ? "0 3px 12px rgba(24,119,242,0.4)"
                      : "0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = "translateY(-3px) scale(1.15)"
                    el.style.boxShadow = "0 6px 20px rgba(24,119,242,0.55)"
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = "translateY(0) scale(1)"
                    el.style.boxShadow = isScrolled
                      ? "0 3px 12px rgba(24,119,242,0.4)"
                      : "0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)"
                  }}
                >
                  <FacebookIcon />
                </a>
              </div>

              {/* CTA button */}
              <a
                href="#contacto"
                className="btn-elegant relative overflow-hidden rounded-full"
                style={{
                  padding: "10px 24px",
                  fontSize: "11px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "white",
                  background: isScrolled
                    ? "oklch(0.44 0.225 15)"
                    : "oklch(0.44 0.225 15 / 0.90)",
                  boxShadow: isScrolled
                    ? "0 4px 22px oklch(0.44 0.225 15 / 0.55), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)"
                    : "0 4px 22px oklch(0.44 0.225 15 / 0.45), 0 0 0 1px rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
                  transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = "translateY(-3px) scale(1.06)"
                  el.style.boxShadow = "0 10px 40px oklch(0.44 0.225 15 / 0.75), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = "translateY(0) scale(1)"
                  el.style.boxShadow = isScrolled
                    ? "0 4px 22px oklch(0.44 0.225 15 / 0.55), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)"
                    : "0 4px 22px oklch(0.44 0.225 15 / 0.45), 0 0 0 1px rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.12)"
                }}
              >
                Agendar asesoría
              </a>
            </div>

            {/* ─── Mobile toggle ─── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative z-[70] p-2 transition-all duration-300 hover:scale-110"
              aria-label="Toggle menu"
              style={{ color: menuOpen ? "white" : isScrolled ? "oklch(0.12 0.025 5)" : "white" }}
            >
              <div className="relative w-6 h-6">
                <Menu
                  className="absolute inset-0 transition-all duration-400"
                  style={{
                    opacity: menuOpen ? 0 : 1,
                    transform: menuOpen ? "rotate(90deg) scale(0)" : "rotate(0deg) scale(1)",
                  }}
                />
                <X
                  className="absolute inset-0 transition-all duration-400"
                  style={{
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Thin crimson accent line — bottom of header on scroll */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
          style={{
            background: "linear-gradient(90deg, transparent, oklch(0.44 0.225 15 / 0.5) 50%, transparent)",
            opacity: isScrolled ? 1 : 0,
          }}
        />
      </header>

      {/* ═══════════════════════════════
          FULL-SCREEN MOBILE MENU
      ═══════════════════════════════ */}
      <div
        className="fixed inset-0 z-[55] lg:hidden flex flex-col transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          background: "oklch(0.06 0.025 5 / 0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          clipPath: menuOpen
            ? "circle(150% at calc(100% - 40px) 40px)"
            : "circle(0% at calc(100% - 40px) 40px)",
          transition: "opacity 0.5s ease, clip-path 0.8s cubic-bezier(0.76,0,0.24,1)",
        }}
      >
        {/* Crimson atmospheric glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 20% 85%, oklch(0.44 0.225 15 / 0.18) 0%, transparent 100%)",
          }}
        />

        {/* Nav links — centered */}
        <nav className="flex flex-col justify-center items-center flex-1 gap-0 px-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="relative py-5 text-center group w-full border-b"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                transform: menuOpen ? "translateY(0)" : `translateY(${30 + i * 8}px)`,
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.7s ${i * 0.08 + 0.2}s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ${i * 0.08 + 0.2}s ease`,
              }}
            >
              <span
                className="font-display font-extrabold text-white group-hover:text-accent transition-colors duration-300"
                style={{ fontSize: "clamp(1.6rem, 8vw, 2.4rem)", letterSpacing: "-0.01em" }}
              >
                {link.label}
              </span>
            </a>
          ))}

          {/* CTA button */}
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-10 px-10 py-4 rounded-full text-white font-display font-semibold tracking-[0.15em] uppercase text-sm transition-all duration-400 hover:scale-105"
            style={{
              background: "oklch(0.44 0.225 15)",
              boxShadow: "0 8px 30px oklch(0.44 0.225 15 / 0.45)",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.6s ${navLinks.length * 0.08 + 0.3}s ease, transform 0.6s ${navLinks.length * 0.08 + 0.3}s cubic-bezier(0.16,1,0.3,1)`,
            }}
          >
            Agendar asesoría gratuita
          </a>
        </nav>

        {/* Bottom brand + socials */}
        <div
          className="pb-12 px-8 flex flex-col items-center gap-5"
          style={{
            opacity: menuOpen ? 1 : 0,
            transition: `opacity 0.6s ${navLinks.length * 0.08 + 0.5}s ease`,
          }}
        >
          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/bodaslauramartinez"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
              style={{ background: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)" }}
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com/bodasLauraMartinez"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
              style={{ background: "#1877F2" }}
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>

          <p
            className="font-display text-[9px] tracking-[0.4em] uppercase text-white/20 font-light"
          >
            Laura Martínez Bodas · Palmira, Colombia
          </p>
        </div>
      </div>
    </>
  )
}
