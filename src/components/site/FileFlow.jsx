import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, ChevronRight, FileImage, RotateCcw } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { fileflow } from '@/data/content'
import { cn } from '@/lib/utils'

export default function FileFlow() {
  return (
    <section id="fileflow" className="section site">
      <p className="label">
        <span className="label-num">02</span>
        <span className="label-line" aria-hidden="true" />
        Now building
      </p>
      <h2 className="mt-4 text-[1.9rem] !leading-[1.12] sm:text-[2.6rem]">
        <span className="font-light">Your files stay put. </span>
        <span className="font-semibold">The work comes to them.</span>
      </h2>
      <p className="mt-4 max-w-xl text-pretty text-muted-foreground">{fileflow.intro}</p>

      <DropDemo />

      <div className="mt-12">
        <video
          controls
          muted
          playsInline
          // Browsers only allow playback without a click when muted; the controls can turn sound on.
          onPointerEnter={(e) => e.pointerType === 'mouse' && e.currentTarget.play().catch(() => {})}
          onPointerLeave={(e) => e.pointerType === 'mouse' && e.currentTarget.pause()}
          preload="none"
          poster={fileflow.video.poster}
          width="1280"
          height="720"
          aria-label={fileflow.video.title}
          className="aspect-video w-full rounded-3xl bg-black"
        >
          <source src={fileflow.video.src} type="video/mp4" />
        </video>
        <h3 className="mt-3 text-[1.1rem] tracking-tight">{fileflow.video.title}</h3>
        <p className="mt-0.5 text-pretty text-sm text-muted-foreground">{fileflow.video.body}</p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {fileflow.products.map((p) => (
          <div key={p.name}>
            <a href={p.url} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-3xl p-[6%]" style={{ background: `linear-gradient(135deg, ${p.grad[0]}, ${p.grad[1]})` }}>
              <span className="float-panel block overflow-hidden transition-transform duration-300 group-hover:-translate-y-1.5">
                <img src={p.src} alt={`Screenshot of ${p.name}`} width="1440" height="900" loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
              </span>
              <span className="float-chip absolute bottom-3 right-3">{p.chip}</span>
            </a>
            <h3 className="mt-3 text-[1.1rem] tracking-tight">{p.name}</h3>
            <p className="mt-0.5 text-pretty text-sm text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>

      <AnalyticsReveal />

      <div className="mt-8 flex flex-wrap gap-2">
        {fileflow.links.map((l, i) => (
          <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className={buttonVariants({ variant: i === 0 ? 'default' : 'outline' })}>
            {l.label} <ArrowUpRight className="h-4 w-4" />
          </a>
        ))}
      </div>
    </section>
  )
}

const smooth = (v) => v * v * (3 - 2 * v)
const clamp = (v) => Math.min(1, Math.max(0, v))

/** The analytics stay shut until you scroll to them, open as you pass, and close again as you leave. */
function AnalyticsReveal() {
  const card = useRef(null)
  const slot = useRef(null)
  const { analytics } = fileflow

  const show = useCallback((open) => {
    const el = card.current
    if (!el) return
    const inset = 50 * (1 - open)
    el.style.clipPath = `inset(${inset}% ${inset / 3}% round 24px)`
    el.style.opacity = clamp(open * 3)
    el.style.transform = `scale(${0.96 + 0.04 * open})`
  }, [])

  // Driven by where the card's middle sits on screen, so the page never stops or goes blank.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return show(1)
    let raf
    const update = () => {
      raf = null
      const r = slot.current.getBoundingClientRect()
      const c = (r.top + r.height / 2) / window.innerHeight
      show(smooth(clamp((1.05 - c) / 0.3)) * smooth(clamp((c + 0.05) / 0.3)))
    }
    const onScroll = () => (raf ||= requestAnimationFrame(update))
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [show])

  return (
    <div className="mx-auto mt-12 max-w-3xl" data-analytics>
      <h3 className="text-[1.1rem] tracking-tight">{analytics.name}</h3>
      <p className="mb-4 mt-0.5 max-w-2xl text-pretty text-sm text-muted-foreground">{analytics.body}</p>
      <div ref={slot}>
        <div
          ref={card}
          className="relative overflow-hidden rounded-3xl p-[4%]"
          style={{ background: `linear-gradient(135deg, ${analytics.grad[0]}, ${analytics.grad[1]})`, clipPath: 'inset(50% 16.6% round 24px)', opacity: 0 }}
        >
          <div className="float-panel overflow-hidden">
            <img src={analytics.src} alt="FileFlowHQ's private analytics dashboard" width="1600" height="622" loading="lazy" className="w-full" />
            <img src="/previews/fileflow-audience.jpg" alt="Countries, traffic sources and devices in the same dashboard" width="1600" height="694" loading="lazy" className="w-full" />
          </div>
          <span className="float-chip absolute bottom-3 right-3">{analytics.chip}</span>
        </div>
      </div>
    </div>
  )
}

/** Drag the file into the browser. It converts there, and the upload counter never moves. An illustration, not the real tool. */
function DropDemo() {
  const [stage, setStage] = useState('idle') // idle -> working -> done
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false })
  const start = useRef(null)
  const card = useRef(null)
  const target = useRef(null)
  const moved = useRef(false)

  useEffect(() => {
    if (stage === 'idle') moved.current = false
    if (stage !== 'working') return
    const id = setTimeout(() => setStage('done'), 1300)
    return () => clearTimeout(id)
  }, [stage])

  const drop = () => {
    setDrag({ x: 0, y: 0, active: false })
    setStage('working')
  }

  const onPointerDown = (e) => {
    if (stage !== 'idle') return
    e.currentTarget.setPointerCapture(e.pointerId)
    start.current = { x: e.clientX, y: e.clientY }
    moved.current = false
  }
  const onPointerMove = (e) => {
    if (!start.current) return
    const x = e.clientX - start.current.x
    const y = e.clientY - start.current.y
    if (Math.hypot(x, y) > 5) moved.current = true
    setDrag({ x, y, active: true })
  }
  const onPointerUp = () => {
    if (!start.current) return
    start.current = null
    const a = card.current.getBoundingClientRect()
    const b = target.current.getBoundingClientRect()
    const cx = a.left + a.width / 2
    const cy = a.top + a.height / 2
    const hit = cx > b.left - 30 && cx < b.right + 30 && cy > b.top - 30 && cy < b.bottom + 30
    if (hit) drop()
    else setDrag({ x: 0, y: 0, active: false })
  }

  return (
    <div className="mt-9 flex flex-col items-center gap-6 sm:flex-row sm:gap-0">
      <button
        ref={card}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={() => {
          // A tap or the Enter key does the same as a drag.
          if (stage === 'idle' && !moved.current) drop()
          moved.current = false
        }}
        disabled={stage !== 'idle'}
        aria-label="Drop photo.heic into the browser"
        data-file-card
        className={cn(
          'relative z-10 w-60 shrink-0 touch-none select-none rounded-2xl p-5 text-left text-[#261f1c] shadow-[0_24px_50px_-22px_rgba(0,0,0,0.7)]',
          stage === 'idle' ? 'cursor-grab active:cursor-grabbing' : 'opacity-0',
          !drag.active && 'transition-[transform,opacity] duration-300'
        )}
        style={{
          background: 'linear-gradient(135deg, #d3efe6, #7fc2b0)',
          transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.active ? 2 : -3}deg)`,
        }}
      >
        <FileImage className="h-6 w-6" />
        <span className="mt-6 block font-mono text-[0.7rem] uppercase tracking-[0.14em] opacity-75">Your file</span>
        <span className="mt-0.5 block font-display font-semibold">photo.heic</span>
      </button>

      <div className="hidden flex-1 items-center justify-end gap-2 border-t-2 border-dashed border-input sm:flex" aria-hidden="true">
        {[0, 1, 2].map((i) => <ChevronRight key={i} className="-mt-7 h-4 w-4 text-muted-foreground" />)}
      </div>

      <div ref={target} className="panel w-full max-w-sm shrink-0 overflow-hidden sm:w-80">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-input" />
          <span className="h-2 w-2 rounded-full bg-input" />
          <span className="h-2 w-2 rounded-full bg-input" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">fileflowhq.com</span>
        </div>
        <div className="flex h-40 flex-col items-center justify-center p-4 text-center" aria-live="polite">
          {stage === 'idle' && <p className="text-sm text-muted-foreground">Drag the file in here</p>}
          {stage === 'working' && (
            <div key="w" className="swap-in w-full">
              <p className="text-sm font-medium">Converting in your browser</p>
              <div className="mx-auto mt-3 h-1 w-40 overflow-hidden rounded-full bg-muted">
                <div className="fill-bar h-full rounded-full bg-pop" />
              </div>
            </div>
          )}
          {stage === 'done' && (
            <div key="d" className="swap-in">
              <p className="inline-flex items-center gap-1.5 font-display font-semibold"><Check className="h-4 w-4 text-[#2fa866]" /> photo.jpg is ready</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">Uploaded to a server: nothing</p>
              <button onClick={() => setStage('idle')} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4">
                <RotateCcw className="h-3.5 w-3.5" /> Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
