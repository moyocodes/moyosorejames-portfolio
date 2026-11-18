import { useEffect } from 'react'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/jetbrains-mono/700.css'
import { navigate } from '@/hooks/useHashRoute'

// MOYO.md — a working manifesto, laid out like a markdown file.
// Bracketed lines are placeholders for James to write.

const principles = [
  {
    title: 'ship the thing, then talk about it',
    body: '[Your take. Build in public, small apps, real users over slide decks.]',
  },
  {
    title: 'safety is a feature, not a footnote',
    body: '[What protecting people means in the products you build.]',
    quote: '[One line you’d want quoted.]',
  },
  {
    title: 'solve the boring problem well',
    body: '[Files, follow-ups, invoices: why unglamorous problems are worth your time.]',
  },
  { title: 'own the output. fully.', body: '[You picked the tool, wrote the prompt, shipped the result.]' },
  { title: 'build for where you’re from', body: '[The people and places your work is for.]' },
]

const stop = ['waiting until it’s “ready”', '[YOUR HABIT]', '[YOUR HABIT]']
const more = ['finish the rough version first', '[YOUR HABIT]', '[YOUR HABIT]']

const accent = 'text-[#f2b544]'
const serif = { fontFamily: "'Instrument Serif', Georgia, serif" }

function H2({ id, children, className = '' }) {
  return (
    <h2 id={id} className={`scroll-mt-24 text-[22px] font-bold ${className}`}>
      <span className={accent}>##</span> {children}
    </h2>
  )
}

export default function Human() {
  useEffect(() => {
    const prev = document.title
    document.title = 'MOYO.md — Moyosore James'
    return () => {
      document.title = prev
    }
  }, [])

  const home = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div
      className="min-h-screen [&_h2]:font-[inherit] [&_h2]:tracking-normal [&_h3]:font-[inherit] [&_h3]:tracking-normal [&_h3]:leading-[1.5] bg-[#1d1c1b] text-[16px] leading-[1.7] text-[#e9e4dc] selection:bg-[#f2b544] selection:text-[#1d1c1b]"
      style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
    >
      <header className="sticky top-0 z-10 border-b border-[#3a3836] bg-[#1d1c1b]">
        <nav className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-6 px-6 py-4 text-[13px]">
          <a href="#top" className="font-bold text-[#e9e4dc] no-underline">
            MOYO.md
          </a>
          <div className="flex flex-wrap gap-5">
            <a href="#job" className="text-[#b5afa6] hover:text-[#e9e4dc]">## the job</a>
            <a href="#stop" className="text-[#b5afa6] hover:text-[#e9e4dc]">## stop</a>
            <a href="#more" className="text-[#b5afa6] hover:text-[#e9e4dc]">## more</a>
            <a href="/" onClick={home} className={`${accent} hover:text-[#ffd88a]`}>← moyosorejames.com</a>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-[760px] px-6 pb-16 pt-24">
        <p className="mb-6 text-[12px] tracking-[0.14em] text-[#9c968d]">MOYOSORE JAMES · NOV 18, 2026</p>
        <h1 className="text-[clamp(64px,14vw,168px)] font-normal leading-[0.9] tracking-[-0.02em]" style={serif}>
          MOYO<span className={`${accent} italic`}>.md</span>
        </h1>
        <div className="mt-10 text-[15px] text-[#b5afa6]">
          <p>&gt; a working manifesto for building with machines.</p>
          <p>&gt; not a pitch. not a portfolio. not a thread.</p>
          <p>&gt; last edited [WHERE YOU WROTE IT].</p>
        </div>

        <H2 className="mb-4 mt-[120px]">what this file is</H2>
        <p>
          [Two or three plain sentences: why you’re writing this down, and what you think a builder still brings now
          that the tools write most of the code.]
        </p>

        <H2 id="job" className="mb-8 mt-24">the actual job</H2>
        <article className="flex flex-col gap-14">
          {principles.map((p, i) => (
            <section key={p.title}>
              <h3 className="mb-3 text-[18px] font-bold">
                <span className="text-[#9c968d]">### {i + 1}.</span> {p.title}
              </h3>
              <p>{p.body}</p>
              {p.quote && (
                <blockquote className={`mt-5 text-[34px] italic leading-[1.2] ${accent}`} style={serif}>
                  {p.quote}
                </blockquote>
              )}
            </section>
          ))}
        </article>

        <div className="mt-[120px] grid gap-12 sm:grid-cols-2">
          {[
            ['stop', 'trying to stop', stop],
            ['more', 'trying to do more', more],
          ].map(([id, title, items]) => (
            <section key={id}>
              <H2 id={id} className="mb-4 !text-[20px]">{title}</H2>
              <ul className="list-disc pl-5 text-[#cfc9c0]">
                {items.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className="mt-[140px] border-t border-dashed border-[#4a4744] pt-8 text-[14px] text-[#9c968d]">
          <p className="text-[#e9e4dc]">This file will be wrong in six months. Good.</p>
          <p className="mt-4">— moyo.</p>
          <p className="mt-8">
            Contact: <a href="mailto:[YOUR EMAIL]" className={`${accent} hover:text-[#ffd88a]`}>[YOUR EMAIL]</a>
          </p>
        </footer>
      </main>
    </div>
  )
}
