import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Drawer from '@/components/Drawer'
import SectionHead from '@/components/site/SectionHead'
import { buttonVariants } from '@/components/ui/button'
import { projects } from '@/data/content'
import { usePinnedScroll } from '@/hooks/usePinnedScroll'
import { useSiteEvent } from '@/hooks/useSiteEvent'
import { cn } from '@/lib/utils'

export default function Work() {
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)
  const track = useRef(null)
  const bar = useRef(null)

  const openProject = useCallback((name) => {
    setSelected(projects.find((p) => p.name === name))
    setOpen(true)
  }, [])
  useSiteEvent('site:project', openProject)

  // Scrolling down the page slides the cards sideways.
  const distance = useCallback(() => (track.current ? Math.max(0, track.current.scrollWidth - window.innerWidth) : 0), [])
  const onProgress = useCallback(
    (p) => {
      if (track.current) track.current.style.transform = `translateX(${-p * distance()}px)`
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    },
    [distance]
  )
  const { section, pinned } = usePinnedScroll(distance, onProgress)

  useEffect(() => {
    if (pinned || !track.current) return
    track.current.style.transform = ''
  }, [pinned])

  // Tabbing to a card brings it into view by scrolling the page, not the pinned frame.
  const onFocusCard = (e) => {
    if (!pinned) return
    const cards = [...track.current.children]
    const index = cards.indexOf(e.currentTarget)
    const top = section.current.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + distance() * (index / Math.max(1, cards.length - 1)) })
  }

  return (
    <section id="work" ref={section} className="relative scroll-mt-[-5.5rem] border-t border-border">
      <div className={cn('flex flex-col justify-center', pinned ? 'sticky top-0 h-screen overflow-hidden pt-16' : 'py-20')}>
        <div className="site mb-7">
          <SectionHead number="01" label="The work" title="Eight projects," accent="all live." />
        </div>

        <div className={cn(!pinned && 'scrollbar-none snap-x snap-mandatory overflow-x-auto')}>
          <ul ref={track} className="flex w-max gap-6 will-change-transform" style={{ paddingInline: 'max(1.25rem, calc((100vw - 1080px) / 2 + 1.25rem))' }}>
            {projects.map((p) => (
              <li key={p.name} onFocus={onFocusCard} className="w-[84vw] max-w-[28rem] shrink-0 snap-center lg:w-[28rem]">
                <button onClick={() => openProject(p.name)} className="group block w-full text-left">
                  <span className="relative block overflow-hidden rounded-3xl p-[6%]" style={{ background: `linear-gradient(135deg, ${p.grad[0]}, ${p.grad[1]})` }}>
                    <span className="float-panel block overflow-hidden transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.01]">
                      <img src={p.previews[0].src} alt={`Screenshot of ${p.previews[0].host}`} width="1440" height="900" loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
                    </span>
                    <span className="float-chip absolute bottom-3 right-3">{p.meta}</span>
                  </span>
                  <span className="mt-3 block font-display text-[1.1rem] font-semibold tracking-tight">{p.shortName || p.name}</span>
                  <span className="mt-0.5 line-clamp-2 block text-pretty text-sm text-muted-foreground">{p.summary}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {pinned && (
          <div className="site mt-6">
            <div className="h-0.5 w-40 overflow-hidden rounded-full bg-border" aria-hidden="true">
              <div ref={bar} className="h-full origin-left scale-x-0" style={{ background: 'linear-gradient(90deg, #7f9bd6, #e8a27c, #7fc2b0)' }} />
            </div>
          </div>
        )}
      </div>

      <Drawer open={open} onClose={() => setOpen(false)} title={selected?.shortName || selected?.name || 'Project'} width="max-w-2xl">
        {selected && <ProjectDetail key={selected.name} project={selected} />}
      </Drawer>
    </section>
  )
}

function ProjectDetail({ project }) {
  const [view, setView] = useState(0)
  const preview = project.previews[view]

  return (
    <article>
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="border-b border-border px-3 py-2 font-mono text-xs text-muted-foreground">{preview.host}</div>
        <img key={preview.src} src={preview.src} alt={`Screenshot of ${preview.host}`} width="1440" height="900" className="swap-in aspect-[16/10] w-full object-cover object-top" />
      </div>

      {project.previews.length > 1 && (
        <div className="mt-3 flex gap-1.5" role="group" aria-label="Choose screenshot">
          {project.previews.map((v, i) => (
            <button
              key={v.label}
              onClick={() => setView(i)}
              aria-pressed={i === view}
              className={cn('rounded-full border px-3 py-0.5 text-sm font-medium', i === view ? 'border-primary bg-primary text-primary-foreground' : 'border-input hover:border-foreground/60')}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      <p className="mt-5 text-pretty">{project.summary}</p>
      <p className="mt-1.5 text-pretty text-sm text-muted-foreground">{project.role}</p>
      <ul className="mt-4 space-y-2.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2.5">
            <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-pop" aria-hidden="true" />
            <span className="text-pretty text-sm">{h}</span>
          </li>
        ))}
      </ul>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.stack.map((s) => (
          <li key={s} className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs leading-5">{s}</li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-2">
        <a href={project.url} target="_blank" rel="noreferrer" className={buttonVariants()}>
          Visit {project.shortName || project.name} <ArrowUpRight className="h-4 w-4" />
        </a>
        {project.links?.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline' })}>
            {l.label} <ArrowUpRight className="h-4 w-4" />
          </a>
        ))}
      </div>
    </article>
  )
}
