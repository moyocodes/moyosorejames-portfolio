import { useEffect, useRef, useState } from 'react'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/dm-sans/700.css'
import { navigate } from '@/hooks/useHashRoute'

// MOYO.md — a working manifesto told as full-screen scroll scenes.
// Each scene pins for a while; its big line reveals word by word, then the
// body text fades in. Bracketed lines are placeholders for James to write.
// `em` words in a line are set in italic serif.

const scenes = [
  {
    id: 'what',
    label: '## what this file is',
    bg: '#f4481b',
    line: 'A reminder, in plain text, of what a *builder* still brings.',
    body: '[Two or three plain sentences: why you’re writing this down, and what you think a builder still brings now that the tools write most of the code.]',
    object: 'sun',
  },
  {
    id: 'p1',
    label: '### 1. ship the thing, then talk about it',
    bg: '#6aa3c9',
    line: 'A working app beats a *confident* take.',
    body: '[Your take. Build in public, small apps, real users over slide decks.]',
    object: 'ball',
  },
  {
    id: 'p2',
    label: '### 2. safety is a feature, not a footnote',
    bg: '#1f3fd6',
    line: '[One line you’d want *quoted*.]',
    body: '[What protecting people means in the products you build.]',
    object: 'shield',
  },
  {
    id: 'p3',
    label: '### 3. solve the boring problem well',
    bg: '#b5bf7c',
    line: 'Files. Follow-ups. Invoices. *Somebody* has to.',
    body: '[Why unglamorous problems are worth your time.]',
    object: 'stack',
  },
  {
    id: 'p4',
    label: '### 4. own the output. fully.',
    bg: '#232222',
    dark: true,
    line: 'You picked the tool. You wrote the prompt. You *shipped* it.',
    body: '[What owning the output means to you.]',
    object: 'mirror',
  },
  {
    id: 'p5',
    label: '### 5. build for where you’re from',
    bg: '#c9a6f2',
    line: '[The people and places your work is *for*.]',
    body: '[A few sentences on who you build for and why.]',
    object: 'globe',
  },
  {
    id: 'stop',
    label: '## things I am trying to stop doing',
    bg: '#f7a9c8',
    list: ['waiting until it’s “ready”', '[YOUR HABIT]', '[YOUR HABIT]'],
  },
  {
    id: 'more',
    label: '## things I am trying to do more',
    bg: '#6bb88a',
    list: ['finish the rough version first', '[YOUR HABIT]', '[YOUR HABIT]'],
  },
]

const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" }
const serif = { fontFamily: "'Instrument Serif', Georgia, serif" }
const sans = { fontFamily: "'DM Sans', system-ui, sans-serif" }

// 0 → 1 progress of a tall section scrolling past its sticky viewport.
function useProgress(ref) {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      setP(Math.min(1, Math.max(0, -r.top / (total || 1))))
    }
    const on = () => raf || (raf = requestAnimationFrame(tick))
    tick()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      cancelAnimationFrame(raf)
    }
  }, [ref])
  return p
}

function Reveal({ text, progress, className, style }) {
  const words = text.split(' ')
  return (
    <p className={className} style={style}>
      {words.map((w, i) => {
        const em = w.includes('*')
        const t = Math.min(1, Math.max(0, progress * (words.length + 2) - i))
        return (
          <span
            key={i}
            className="inline-block transition-[opacity,transform] duration-300"
            style={{ opacity: 0.12 + t * 0.88, transform: `translateY(${(1 - t) * 0.25}em)`, ...(em ? { ...serif, fontStyle: 'italic', fontWeight: 400 } : null) }}
          >
            {w.replaceAll('*', '')}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </p>
  )
}

// Simple CSS objects sitting on a plate, standing in for illustrations.
function SceneObject({ kind, progress }) {
  const bob = Math.sin(progress * Math.PI * 3) * 10
  const shapes = {
    sun: <div className="h-40 w-40 rounded-full bg-[#ffd23f] shadow-[inset_-18px_-18px_0_rgba(0,0,0,.12)]" />,
    ball: <div className="h-32 w-32 rounded-full bg-[#f4481b] shadow-[inset_-16px_-16px_0_rgba(0,0,0,.15)]" />,
    shield: (
      <svg viewBox="0 0 100 120" className="h-44 w-36" aria-hidden="true">
        <path d="M50 4 94 20v36c0 30-20 52-44 60C26 108 6 86 6 56V20Z" fill="#ffd23f" />
        <path d="M50 4 94 20v36c0 30-20 52-44 60Z" fill="rgba(0,0,0,.12)" />
      </svg>
    ),
    stack: (
      <div className="flex flex-col items-center gap-1">
        {['#f7f1e6', '#f4481b', '#f7f1e6', '#1f3fd6'].map((c, i) => (
          <div key={i} className="h-8 rounded-md shadow-[inset_0_-6px_0_rgba(0,0,0,.12)]" style={{ width: 150 - i * 12, background: c }} />
        ))}
      </div>
    ),
    mirror: (
      <div className="flex h-52 w-40 items-center justify-center rounded-[50%] border-[10px] border-[#f7a9c8] bg-gradient-to-b from-[#3a3a3a] to-[#161616]">
        <div className="h-10 w-10 rounded-full bg-[#f4481b]" />
      </div>
    ),
    globe: (
      <div className="relative h-40 w-40 overflow-hidden rounded-full bg-[#1f3fd6]">
        <div className="absolute left-6 top-8 h-14 w-20 rounded-[40%] bg-[#6bb88a]" />
        <div className="absolute bottom-6 right-4 h-12 w-16 rounded-[45%] bg-[#6bb88a]" />
      </div>
    ),
  }
  return (
    <div className="flex flex-col items-center">
      <div style={{ transform: `translateY(${bob}px)` }}>{shapes[kind]}</div>
      <div className="-mt-3 h-8 w-72 rounded-[50%] bg-[#f7f4ee] shadow-[0_18px_30px_-12px_rgba(0,0,0,.35)]" />
    </div>
  )
}

function Scene({ s, onActive }) {
  const ref = useRef(null)
  const p = useProgress(ref)
  useEffect(() => {
    if (p > 0 && p < 1) onActive(s)
  }, [p, s, onActive])
  const fg = s.dark ? '#f7f4ee' : '#141414'
  const lineP = Math.min(1, p / 0.55)
  const bodyIn = p > 0.6

  return (
    <section ref={ref} id={s.id} className="relative" style={{ height: s.list ? '220vh' : '300vh', background: s.bg, color: fg }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        {s.list ? (
          <div className="w-full max-w-[900px]">
            {s.list.map((t, i) => {
              const on = p > 0.12 + i * 0.2
              return (
                <p
                  key={i}
                  className="border-b-2 py-5 text-[clamp(28px,5vw,64px)] font-bold leading-tight transition-all duration-500"
                  style={{ ...sans, borderColor: fg, opacity: on ? 1 : 0.1, transform: on ? 'none' : 'translateX(-24px)' }}
                >
                  <span className="mr-4 text-[0.5em]" style={mono}>{s.id === 'stop' ? '✕' : '+'}</span>
                  {t}
                </p>
              )
            })}
          </div>
        ) : (
          <>
            <Reveal
              text={s.line}
              progress={lineP}
              className="absolute left-6 right-6 top-24 max-w-[1100px] text-[clamp(32px,5.4vw,76px)] font-bold leading-[1.05] tracking-[-0.02em] sm:left-10"
              style={sans}
            />
            <div className="mt-24" style={{ transform: `scale(${0.85 + lineP * 0.15})` }}>
              <SceneObject kind={s.object} progress={p} />
            </div>
            <p
              className="absolute bottom-24 left-6 right-6 mx-auto max-w-[620px] text-[15px] leading-[1.7] transition-all duration-700 sm:left-10"
              style={{ ...mono, opacity: bodyIn ? 1 : 0, transform: bodyIn ? 'none' : 'translateY(16px)' }}
            >
              {s.body}
            </p>
          </>
        )}
      </div>
    </section>
  )
}

export default function Human() {
  const [active, setActive] = useState(null)
  const [indexOpen, setIndexOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const prev = document.title
    document.title = 'MOYO.md — Moyosore James'
    const on = () => {
      setScrolled(window.scrollY > 40)
      if (window.scrollY < window.innerHeight * 0.6) setActive(null)
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => {
      document.title = prev
      window.removeEventListener('scroll', on)
    }
  }, [])

  const go = (id) => {
    setIndexOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  const home = (e) => {
    e.preventDefault()
    navigate('/')
  }
  const fg = active?.dark ? '#f7f4ee' : '#141414'

  return (
    <div className="bg-[#1f3fd6] text-[#141414] selection:bg-[#f4481b] selection:text-white" style={sans}>
      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-30 flex items-center gap-4 px-4 py-3 sm:px-6" style={{ color: active ? fg : '#f7f4ee' }}>
        <a href="#top" onClick={(e) => (e.preventDefault(), window.scrollTo({ top: 0, behavior: 'smooth' }))} className="flex items-center gap-2">
          <img src="/mj-logo.png" alt="" className="h-9 w-9 rounded-full bg-[#f7f4ee] object-contain p-1" />
          <span className="text-[13px] font-bold">MOYO.md</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#f4481b]" />
        </a>
        <span className="hidden truncate text-[12px] font-bold opacity-80 md:block md:pl-10">{active?.label}</span>
        <div className="ml-auto flex items-center gap-3">
          <a href="/" onClick={home} className="hidden text-[12px] font-bold sm:block">moyosorejames.com</a>
          <button
            type="button"
            onClick={() => setIndexOpen((v) => !v)}
            aria-expanded={indexOpen}
            className="flex min-h-[44px] items-center gap-2 rounded-full bg-[#f7a9c8] px-4 text-[12px] font-bold text-[#141414]"
          >
            index
            <svg viewBox="0 0 16 10" className="h-2.5 w-4" aria-hidden="true">
              <path d="M0 1h16M0 5h16M0 9h16" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      </header>

      {/* index overlay */}
      {indexOpen && (
        <nav className="fixed inset-0 z-20 overflow-y-auto bg-[#f7f4ee] px-6 pb-12 pt-24 sm:px-16" aria-label="Index">
          <ol className="mx-auto max-w-[900px]">
            {scenes.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => go(s.id)}
                  className="flex w-full items-center gap-4 border-b border-[#141414]/20 py-4 text-left text-[clamp(18px,2.6vw,30px)] font-bold hover:text-[#f4481b]"
                >
                  <span className="h-4 w-4 shrink-0 rounded-full" style={{ background: s.bg }} />
                  {s.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* hero */}
      <section id="top" className="relative flex min-h-screen flex-col overflow-hidden bg-[#1f3fd6] px-6 pb-8 pt-24 text-[#f7f4ee] sm:px-10">
        <h1 className="relative z-10 text-center text-[clamp(72px,15vw,220px)] font-bold leading-[0.9] tracking-[-0.04em]">
          MOYO<span className="text-[#f4481b]">.</span>
          <span className="font-normal tracking-normal" style={serif}>md</span>
        </h1>
        <div className="relative z-10 mx-auto mt-10 flex w-full max-w-[1100px] flex-1 flex-col items-center justify-end gap-10 md:flex-row md:items-end md:justify-between">
          <div className="text-[13px] leading-[1.9] opacity-90 md:mb-[16vh]" style={mono}>
            <p>&gt; a working manifesto for building with machines.</p>
            <p>&gt; not a pitch. not a portfolio. not a thread.</p>
            <p>&gt; last edited [WHERE YOU WROTE IT].</p>
          </div>
          <img
            src="/moy.jpeg"
            alt="Moyosore James"
            className="h-[38vh] w-auto max-w-[260px] rounded-t-full border-[6px] border-[#f7f4ee] object-cover shadow-[0_30px_60px_-20px_rgba(0,0,0,.5)]"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[18vh] bg-[#e9dcc6]" aria-hidden="true" />
        <div className="relative z-10 mt-8 flex justify-between text-[11px] tracking-[0.14em] text-[#141414]" style={mono}>
          <span>MOYOSORE JAMES</span>
          <span>NOV 18, 2026</span>
        </div>
      </section>

      {scenes.map((s) => (
        <Scene key={s.id} s={s} onActive={setActive} />
      ))}

      {/* sign-off */}
      <footer className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#e2412e] px-6 text-center text-[#f7f4ee]">
        <p className="text-[clamp(36px,6vw,88px)] font-bold leading-none tracking-[-0.02em]">
          Now go <span className="font-normal italic" style={serif}>build</span> it.
        </p>
        <p className="max-w-[560px] text-[14px] leading-[1.8]" style={mono}>
          [Your closing thought: one or two lines.]
        </p>
        <p className="text-[14px]" style={mono}>— moyo.</p>
        <a href="mailto:[YOUR EMAIL]" className="text-[14px] underline" style={mono}>[YOUR EMAIL]</a>
      </footer>

      {/* scroll pill */}
      <div
        className="pointer-events-none fixed bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full bg-[#141414] px-4 py-1.5 text-[11px] text-[#f7f4ee] transition-opacity"
        style={{ ...mono, opacity: indexOpen ? 0 : 1 }}
      >
        {scrolled ? 'scroll ↓' : 'scroll'}
      </div>
    </div>
  )
}
