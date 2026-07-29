const links = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'About Me', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact Us', href: '#contact' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-base-border/60 bg-base-bg/90 backdrop-blur">
      <nav className="section flex h-20 items-center justify-between">
        <a href="#top" className="font-display text-lg font-bold text-ink">
          aryan<span className="text-brand">.</span>
        </a>
        <ul className="hidden gap-8 text-sm text-ink-dim md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn-primary hidden md:inline-flex">
          Hire Me
        </a>
      </nav>
    </header>
  )
}
