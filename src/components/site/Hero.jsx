import { useCallback, useEffect, useRef, useState } from 'react'
import EmergingSkills from '@/components/site/EmergingSkills'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import Laptop from '@/components/site/Laptop'
import Onboarding from '@/components/site/Onboarding'
import { profile } from '@/data/content'
import { usePinnedScroll, scrollToProgress } from '@/hooks/usePinnedScroll'

const clamp = (v) => Math.min(1, Math.max(0, v))
const smooth = (v) => v * v * (3 - 2 * v)
const FIT_W = 820
const FIT_W_SMALL = 700
const SMALL = 1024
const FIT_H = 1120
// Where the screen sits and how big it renders, measured from the laptop's own geometry.
const SCREEN = { width: 581, height: 361, centerY: 192 }
// The timeline: 0 shut, then the lid lifts and the onboarding holds at HOLD. Scrolling stops there;
// only a click on an onboarding action carries on through ENTER_FROM and into the screen.
const HOLD = 0.5
const ENTER_FROM = 0.62

export default function Hero() {
  const laptop = useRef(null)
  const frame = useRef(null)
  const zoom = useRef(null)
  const teaser = useRef(null)
  const intro = useRef(null)
  const aura = useRef(null)
  const lastP = useRef(0)
  const shownP = useRef(0)
  const animating = useRef(false)
  const isPinned = useRef(false)
  const chips = useRef(null)
  const box = useRef(null)
  const [mobile, setMobile] = useState(false)
  const [cvOpen, setCvOpen] = useState(false)
  const [cover, setCover] = useState(false)

  const apply = useCallback((p) => {
    shownP.current = p
    const vw = window.innerWidth
    const vh = window.innerHeight
    const rest = Math.min(1, (frame.current?.clientWidth || vw) / (vw < SMALL ? FIT_W_SMALL : FIT_W), Math.max(vh, 720) / FIT_H)
    const full = Math.max(vw / SCREEN.width, vh / SCREEN.height) * 1.02
    const opening = smooth(clamp(p / 0.35))
    const entering = smooth(clamp((p - ENTER_FROM) / (1 - ENTER_FROM)))
    const scale = rest * (0.86 + 0.14 * opening) * Math.pow(full / rest, entering)
    const baseY = isPinned.current ? vh * (vw < SMALL ? 0.6 : 0.67) : (box.current?.clientHeight || 0) * 0.8
    const fromY = baseY - SCREEN.centerY * rest
    const centerY = fromY + (vh / 2 - fromY) * entering

    laptop.current?.setPose({
      lid: opening * (1 - entering),
      opening,
      tilt: (-34 + 20 * opening) * (1 - entering),
      power: clamp((p - 0.25) / 0.12),
      content: 1 - clamp(entering / 0.35),
    })
    if (zoom.current) zoom.current.style.transform = `translate(0, ${centerY + SCREEN.centerY * scale}px) scale(${scale})`
    if (teaser.current) teaser.current.style.opacity = clamp(1 - p / 0.08)
    if (intro.current) {
      const show = clamp((p - 0.32) / 0.08) * (1 - clamp(entering / 0.25))
      intro.current.style.opacity = show
      intro.current.style.transform = `translateY(${(1 - show) * 10}px)`
    }
    if (aura.current) aura.current.style.opacity = clamp((p - 0.25) / 0.15)
  }, [])

  const distance = useCallback(() => window.innerHeight * 2.4, [])
  const onProgress = useCallback(
    (p) => {
      lastP.current = p * HOLD
      chips.current?.setProgress(p)
      if (!animating.current) apply(lastP.current)
    },
    [apply]
  )
  const { section, pinned } = usePinnedScroll(distance, onProgress, { allSizes: true })
  isPinned.current = pinned

  useEffect(() => {
    const fit = () => {
      setMobile(window.innerWidth < 1024)
      apply(shownP.current)
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [apply])

  // Without pinning (phones, reduced motion) the lid lifts by itself and stops at the onboarding.
  useEffect(() => {
    if (pinned) return
    chips.current?.setProgress(0.75)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return apply(HOLD)
    const cancel = animate(HOLD, 1800, () => (animating.current = false))
    return () => {
      cancel()
      animating.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinned, apply])

  // Moves the camera along the timeline without touching the page's scroll position.
  const animate = (to, ms, done) => {
    animating.current = true
    const from = shownP.current
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = clamp((now - start) / ms)
      apply(from + (to - from) * smooth(t))
      if (t < 1) raf = requestAnimationFrame(tick)
      else done?.()
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }

  // Called when an onboarding action is clicked: go through the screen, then show it.
  const enter = (action) => {
    if (action.href !== 'cv' || window.innerWidth >= SMALL) shownP.current = Math.max(shownP.current, ENTER_FROM)
    if (action.href === 'cv') {
      // Phones can't reliably show a PDF inside the page, so they get their own viewer.
      if (window.innerWidth < SMALL) return void window.open(profile.links.cv, '_blank', 'noreferrer')
      animate(1, 1000, () => setCvOpen(true))
      return
    }
    animate(1, 1000, () => {
      setCover(true)
      document.querySelector(action.href)?.scrollIntoView({ behavior: 'instant' })
      animating.current = false
      apply(lastP.current)
      requestAnimationFrame(() => setTimeout(() => setCover(false), 60))
    })
  }

  const leaveCv = useCallback(() => {
    setCvOpen(false)
    animate(lastP.current, 900, () => {
      animating.current = false
      apply(lastP.current)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apply])

  useEffect(() => {
    if (!cvOpen) return
    const onKey = (e) => e.key === 'Escape' && leaveCv()
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [cvOpen, leaveCv])

  return (
    <section id="top" ref={section} className="relative -mt-[4.25rem]">
      <div ref={frame} className={pinned ? 'sticky top-0 h-screen overflow-hidden' : 'relative overflow-hidden pb-6 pt-24'}>
        <div ref={aura} className="aura opacity-0" aria-hidden="true" />
        <EmergingSkills ref={chips} compact={mobile} />

        <div ref={intro} className={`relative z-10 mx-auto max-w-lg px-5 text-center ${pinned ? 'pt-[5.4rem] opacity-0' : ''}`}>
          <p className="label justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2fa866]" aria-hidden="true" />
            {profile.name}. Open to work.
          </p>
          <h1 className="mt-2 text-balance text-[1.15rem] font-medium !leading-[1.3] sm:text-[1.3rem]">{profile.line}</h1>
        </div>

        <div ref={box} className={pinned ? '' : 'relative h-[285px] sm:h-[440px]'}>
          <div ref={zoom} className="absolute left-1/2 top-0 h-0 w-0" style={{ transformOrigin: '0 0' }}>
            <div className="h-0 w-0" style={{ perspective: 1800, transformStyle: 'preserve-3d' }}>
              <Laptop ref={laptop}><Onboarding size={mobile ? 'small' : 'screen'} onEnter={pinned ? enter : undefined} /></Laptop>
            </div>
          </div>
        </div>

        {pinned && (
          <button
            ref={teaser}
            onClick={() => scrollToProgress(section.current, distance(), 1)}
            className="absolute inset-x-0 bottom-7 z-10 mx-auto flex w-max flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em]">Scroll to open it</span>
            <ChevronDown className="animate-nudge-down h-4 w-4" />
          </button>
        )}

      </div>

      {/* Hides the jump from the screen to the section, then fades away to reveal it */}
      <div
        className={`wallpaper pointer-events-none fixed inset-0 z-[70] ${cover ? 'opacity-100' : 'opacity-0 transition-opacity duration-500'}`}
        aria-hidden="true"
      />

      {cvOpen && (
        <div className="wallpaper fixed inset-0 z-[80] flex flex-col" role="dialog" aria-modal="true" aria-label="My CV">
          <div className="flex shrink-0 items-center justify-between px-4 py-2.5 text-[#f0ece5]">
            <button autoFocus onClick={leaveCv} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium hover:bg-white/10">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#f0ece5]/75">{profile.name}, CV</span>
          </div>
          <iframe title="James Moyosore's CV" src={`${profile.links.cv}#view=FitH`} className="swap-in mx-auto w-full max-w-4xl flex-1 rounded-t-xl bg-white" />
        </div>
      )}
    </section>
  )
}
