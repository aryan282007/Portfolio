const links = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'About Me', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact us', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-base-border/60 bg-base-alt/50">
      <div className="section flex flex-col items-center gap-6 py-12 text-center">
        <p className="font-display text-lg font-bold text-brand">ARYAN</p>
        <ul className="flex flex-wrap justify-center gap-6 text-sm text-ink-dim">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-ink-faint">
          ay2500050@gmail.com 
        </p>
        <p className="text-xs text-ink-faint">
          © {new Date().getFullYear()} Aryan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
