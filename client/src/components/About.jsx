import { skills } from '../data/skills'

function SkillRing({ label, percent }) {
  const r = 26
  const c = 2 * Math.PI * r
  const offset = c - (percent / 100) * c

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#2A2A2A" strokeWidth="5" />
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="#FF7A3D"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="-mt-14 font-display text-sm font-bold text-ink">{percent}%</div>
      <p className="mt-8 text-xs text-ink-dim">{label}</p>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="border-t border-base-border/60 bg-base-alt/30 py-24">
      <div className="section">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Get to know me</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">About Me</h2>
        </div>

        <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
          <div className="mx-auto flex h-72 w-64 items-center justify-center rounded-2xl border border-base-border bg-base-surface"> 
          <img src="/image.png" alt="Aryan" className="h-full w-full rounded-2xl object-cover" />
          
          </div>

          <div>
            <p className="leading-relaxed text-ink-dim">
             I'm a <b>Full-Stack Developer</b> focused on creating fast, reliable, and intuitive web applications. Working across the <b>MERN Stack</b> with a strong foundation in <b>JavaScript, TypeScript, C++, and Java</b>, I value clean architecture, thoughtful design, and code that scales. I'm driven by curiosity, continuous learning, and the challenge of building software that makes an impact.

            </p>
            <a href="/pdfs/aryan_resume.pdf" 
             download="aryan_resume.pdf" 
             className="btn-primary mt-6">
              Download CV
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {skills.map((s) => (
            <SkillRing key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
