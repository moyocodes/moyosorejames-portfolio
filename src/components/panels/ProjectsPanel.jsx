import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PreviewSwitcher from '@/components/mock/PreviewSwitcher'
import { useAutoRotate } from '@/hooks/useAutoRotate'
import { projects } from '@/data/content'
import { cn } from '@/lib/utils'

/**
 * ProjectsPanel — a clean, presentation-slide carousel that auto-rotates while
 * the panel is active (pauses on hover/focus/touch). Chrome is hidden by the
 * deck (chromeless), so this owns the whole screen.
 */
export default function ProjectsPanel({ active }) {
  const { index: i, setIndex: setI, go, pauseHandlers } = useAutoRotate(projects.length, {
    interval: 7000,
    enabled: active,
    captureDeckNav: true,
  })
  const p = projects[i]

  return (
    <div className="flex h-[100dvh] w-full flex-col px-6 pb-6 pt-14 sm:px-16" {...pauseHandlers}>
      {/* Stage */}
      <div className="relative min-h-0 flex-1">
        <NavArrow side="left" onClick={() => go(-1)} label="Previous project" />
        <NavArrow side="right" onClick={() => go(1)} label="Next project" />

        <div className="mx-auto h-full max-w-6xl">
          <PreviewSwitcher
            key={p.name}
            url={p.liveUrl}
            accent={p.accent}
            screens={p.screens}
            fallbackScene={p.scene}
            fill
          />
        </div>
      </div>

      {/* Minimal caption */}
      <div className="mx-auto mt-5 flex w-full max-w-3xl shrink-0 flex-col items-center gap-3 text-center">
        <div className="flex flex-wrap items-baseline justify-center gap-x-3">
          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{p.name}</h3>
          <span className="text-sm font-medium text-muted-foreground">{p.subtitle}</span>
        </div>
        <p className="max-w-xl text-sm text-muted-foreground line-clamp-1">{p.blurb || p.description}</p>

        {p.liveUrl && (
          <Button size="sm" asChild style={{ background: p.accent }} className="text-white">
            <a href={p.liveUrl} target="_blank" rel="noreferrer">
              Visit Live Site <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}

        {/* Progress dots */}
        <div className="mt-1 flex items-center gap-2">
          {projects.map((pr, idx) => (
            <button
              key={pr.name}
              onClick={() => setI(idx)}
              aria-label={`Go to ${pr.name}`}
              className={cn(
                'h-1.5 rounded-full transition-all',
                idx === i ? 'w-6' : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'
              )}
              style={idx === i ? { background: pr.accent } : {}}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function NavArrow({ side, onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        'absolute top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-background/70 hover:text-foreground hover:shadow-lg hover:backdrop-blur',
        side === 'left' ? 'left-0 sm:-left-4' : 'right-0 sm:-right-4'
      )}
    >
      {side === 'left' ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
    </button>
  )
}
