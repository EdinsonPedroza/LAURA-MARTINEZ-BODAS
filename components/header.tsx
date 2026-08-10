"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#quien-soy", label: "Quién soy" },
  { href: "#galeria", label: "Bodas reales" },
  { href: "#contacto", label: "Contacto" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const prevScrolled = useRef(false)

  useEffect(() => {
    let ticking = false
    const compute = () => {
      ticking = false
      const scrolled = window.scrollY > 40
      if (scrolled !== prevScrolled.current) {
        prevScrolled.current = scrolled
        setIsScrolled(scrolled)
      }
    }
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-[padding,box-shadow,background-color] duration-500"
        style={{
          paddingTop: isScrolled ? "1rem" : "1.5rem",
          paddingBottom: isScrolled ? "1rem" : "1.5rem",
          // Opaque fill instead of backdrop-filter: a blurred backdrop forces the
          // compositor to re-read the full-width area behind the bar every frame.
          background: isScrolled ? "oklch(0.965 0.011 84)" : "transparent",
          boxShadow: isScrolled ? "0 8px 30px -12px oklch(0.27 0.022 45 / 0.18)" : "none",
        }}
      >
        <div className="mx-auto max-w-350 px-5 sm:px-6 md:px-10 lg:px-14 grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6 lg:gap-8">

          {/* Wordmark */}
          <Link href="/" className="shrink-0" aria-label="Laura Martínez Bodas — Inicio">
            <Image
              src="/images/Logo-Blanco-1528x155.png"
              alt="Laura Martínez Bodas"
              width={1528}
              height={155}
              priority
              className="h-6 sm:h-7 md:h-8 lg:h-9 w-auto transition-[filter] duration-500"
              style={{
                filter: isScrolled
                  ? "brightness(0)"
                  : "drop-shadow(0 1px 3px rgba(0,0,0,0.7)) drop-shadow(0 4px 16px rgba(0,0,0,0.5))",
              }}
            />
          </Link>

          {/* Desktop nav — truly centered between logo and CTA */}
          <nav className="hidden lg:flex items-center justify-center gap-10" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline caps-label text-[0.7rem] font-semibold transition-colors duration-500 hover:text-primary"
                style={{
                  color: isScrolled ? "oklch(0.27 0.022 45 / 0.75)" : "oklch(0.99 0.005 80 / 0.85)",
                  textShadow: isScrolled ? "none" : "0 1px 3px rgba(0,0,0,0.6), 0 3px 12px rgba(0,0,0,0.45)",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: desktop CTA + mobile toggle */}
          <div className="flex items-center justify-end">
            <a
              href="#contacto"
              className={`hidden lg:inline-flex ${isScrolled ? "btn-ink" : "btn-paper"}`}
              style={{ padding: "0.75rem 1.75rem", fontSize: "0.68rem" }}
              data-testid="header-cta"
            >
              Agendar asesoría
            </a>

            {/* Mobile toggle — word in a hairline pill, not a bare label */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden caps-label font-semibold relative z-70 rounded-full shrink-0 transition-colors duration-500"
              style={{
                padding: "0.45rem 0.9rem",
                color: isScrolled ? "var(--foreground)" : "oklch(0.99 0.005 80)",
                border: `1px solid ${isScrolled ? "var(--border)" : "oklch(0.99 0.005 80 / 0.4)"}`,
              }}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              data-testid="menu-toggle"
            >
              {menuOpen ? "Cerrar" : "Menú"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — paper sheet, big serif links */}
      <div
        className="fixed inset-0 z-55 lg:hidden flex flex-col bg-background"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        <nav
          className="flex flex-col justify-center flex-1 px-8 gap-1"
          aria-label="Navegación móvil"
        >
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-baseline gap-4 py-4 border-b border-border"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "none" : "translateY(14px)",
                transition: `opacity 0.5s ${0.1 + i * 0.07}s ease, transform 0.5s ${0.1 + i * 0.07}s cubic-bezier(0.22,1,0.36,1)`,
              }}
            >
              <span className="caps-label text-muted-foreground">0{i + 1}</span>
              <span className="font-fraunces text-3xl text-foreground group-hover:text-primary transition-colors">
                {link.label}
              </span>
            </a>
          ))}

          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="btn-ink self-start mt-10"
            style={{
              opacity: menuOpen ? 1 : 0,
              transition: `opacity 0.5s ${0.1 + navLinks.length * 0.07}s ease`,
            }}
          >
            Agendar asesoría gratuita
          </a>
        </nav>

        <div className="pb-10 px-8 flex flex-col gap-2">
          <a
            href="https://www.instagram.com/bodaslauramartinez"
            target="_blank"
            rel="noopener noreferrer"
            className="caps-label link-underline text-muted-foreground self-start"
          >
            Instagram
          </a>
          <p className="caps-label text-muted-foreground/60">
            Palmira · Valle del Cauca · Colombia
          </p>
        </div>
      </div>
    </>
  )
}
