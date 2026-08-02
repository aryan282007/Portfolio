import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './Navbar.module.css'

const links = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'About Me', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact Us', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [mounted, setMounted] = useState(false) // Ensures safe rendering in SSR frameworks
  const drawerRef = useRef(null)
  const drawerId = useId()

  // Mark component as mounted to safely use createPortal
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sections = links.map((link) => document.querySelector(link.href))
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          const id = visibleEntry.target.id
          setActiveSection(id)
        }
      },
      { threshold: [0.2, 0.5, 0.8] }
    )

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isOpen) return

    // FIX: Removed <HTMLElement> syntax
    const firstFocusable = drawerRef.current?.querySelector(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    firstFocusable?.focus()

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        return
      }

      if (event.key === 'Tab') {
        // FIX: Removed <HTMLElement> syntax
        const focusableElements = drawerRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )

        if (!focusableElements || focusableElements.length === 0) {
          event.preventDefault()
          return
        }

        const first = focusableElements[0]
        const last = focusableElements[focusableElements.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleNavigate = () => setIsOpen(false)

  // Extract the drawer UI to render it in a Portal
  const drawerContent = (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        data-testid="mobile-nav-overlay"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        id={drawerId}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        data-testid="mobile-nav-drawer"
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
      >
        <div className={styles.drawerHeader}>
          <a href="#top" className={styles.drawerBrand} onClick={handleNavigate}>
            aryan<span className={styles.drawerBrandAccent}>.</span>
          </a>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className={styles.navList} aria-label="Mobile section links">
          {links.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <a
                key={link.href}
                href={link.href}
                className={`${styles.link} ${isActive ? styles.activeLink : ''}`}
                onClick={handleNavigate}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <a href="#contact" className={styles.drawerCta} onClick={handleNavigate}>
          Hire Me
        </a>
      </div>
    </>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-base-border/60 bg-base-bg/90 backdrop-blur">
      <nav className="section flex h-20 items-center justify-between" aria-label="Primary navigation">
        <a href="#top" className="font-display text-lg font-bold text-ink">
          aryan<span className="text-brand">.</span>
        </a>

        <ul className="hidden gap-8 text-sm text-ink-dim md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-ink">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn-primary hidden md:inline-flex">
          Hire Me
        </a>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-base-border p-2 text-ink md:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          aria-controls={drawerId}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </nav>

      {/* Render the drawer via Portal to bypass header's backdrop-blur block */}
      {mounted && createPortal(drawerContent, document.body)}
    </header>
  )
}