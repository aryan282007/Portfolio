import { services } from '../data/services'

export default function Services() {
  return (
    <section id="services" className="section py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">What I do</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">Services</h2>
        <p className="mt-3 text-ink-dim">
          Full-stack work end to end — from the interface to the database.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="card transition-colors hover:border-brand/50">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-brand/30 text-brand">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <path d="M8 20h8M12 18v2" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
