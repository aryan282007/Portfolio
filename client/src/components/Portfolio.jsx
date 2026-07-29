import { useState } from 'react'
import { projects, categories } from '../data/projects'

export default function Portfolio() {
  const [active, setActive] = useState('All')

  const visible =
    active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="portfolio" className="section py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Selected work</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">Portfolio</h2>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={
              c === active
                ? 'rounded-full bg-brand px-4 py-2 text-sm font-semibold text-black'
                : 'rounded-full border border-base-border px-4 py-2 text-sm text-ink-dim transition-colors hover:text-ink'
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <div key={p.name} className="card group overflow-hidden p-0">
            <div className="flex h-40 items-center justify-center border-b border-base-border bg-base-alt text-ink-faint">
              {/* Replace with <img src={p.image} className="h-full w-full object-cover" /> */}
              <span className="text-sm">Preview</span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-xs text-ink-faint">{p.category}</p>
              <p className="mt-3 text-sm text-ink-dim">{p.desc}</p>
              <div className="mt-4 flex gap-4 text-xs">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="text-brand hover:underline">
                    Live ↗
                  </a>
                )}
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer" className="text-ink-dim hover:text-ink">
                    Code ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
