import { stats } from '../data/skills'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/aryan282007",
    icon: <FontAwesomeIcon icon={faGithub} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aryan-yadav-446bb4381/",
    icon: <FontAwesomeIcon icon={faLinkedin} />,
  },
  {
    label: "X",
    href: "https://x.com/ay2500050",
    icon: <FontAwesomeIcon icon={faTwitter} />,
  },
   {
    label: "Instagram",
    href: "https://www.instagram.com/aryyyan.yadav/",
    icon:  <FontAwesomeIcon icon={faInstagram}  /> ,
  },
];

export default function Hero() {
  return (
    <section id="top" className="border-b border-base-border/60">
      <div className="section grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="mb-3 text-ink-dim">Hi, I am</p>
          <h2 className="font-display text-2xl font-semibold text-ink">Aryan Yadav</h2>
          <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-brand md:text-5xl">
            Full Stack Developer
          </h1>

          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-base-border text-xs text-ink-dim transition-colors hover:border-brand hover:text-brand"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">
              Hire Me
            </a>
            <a href="/pdfs/aryan_resume.pdf" 
             download="aryan_resume.pdf" 
             className="btn-outline">
              Download CV
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="card p-4 text-center">
                <p className="font-display text-xl font-bold text-ink">{s.value}</p>
                <p className="mt-1 text-xs text-ink-dim">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto flex h-72 w-72 items-center justify-center overflow-hidden rounded-full border border-base-border bg-base-surface md:h-96 md:w-96">
          <img src="/image.png" alt="Aryan" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  )
}
