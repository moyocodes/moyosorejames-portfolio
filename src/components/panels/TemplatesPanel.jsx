import { ChevronLeft, ChevronRight, ExternalLink, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import PreviewSwitcher from '@/components/mock/PreviewSwitcher'
import { useAutoRotate } from '@/hooks/useAutoRotate'
import { templates } from '@/data/content'
import { cn } from '@/lib/utils'

/**
 * TemplatesPanel — clean presentation-slide carousel (chromeless) that
 * auto-rotates while active (pauses on hover/focus/touch).
 */
export default function TemplatesPanel({ active }) {
  const { index: i, setIndex: setI, go, pauseHandlers } = useAutoRotate(templates.length, {
    interval: 7000,
    enabled: active,
    captureDeckNav: true,
  })
  const t = templates[i]

  return (
    <div className="flex h-[100dvh] w-full flex-col px-6 pb-6 pt-14 sm:px-16" {...pauseHandlers}>
      {/* Stage */}
      <div className="relative min-h-0 flex-1">
        <NavArrow side="left" onClick={() => go(-1)} label="Previous template" />
        <NavArrow side="right" onClick={() => go(1)} label="Next template" />

        <div className="mx-auto h-full max-w-6xl">
          <PreviewSwitcher
            key={t.name}
            url={t.previewUrl || t.buyUrl}
            accent={t.accent}
            screens={t.screens}
            fallbackScene={t.scene}
            fill
          />
        </div>
      </div>

      {/* Minimal caption */}
      <div className="mx-auto mt-5 flex w-full max-w-3xl shrink-0 flex-col items-center gap-3 text-center">
        <div className="flex flex-wrap items-baseline justify-center gap-x-3">
          {t.featured && (
            <Badge style={{ background: t.accent }} className="text-white">
              Best seller
            </Badge>
          )}
          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{t.name}</h3>
          <span className="text-lg font-extrabold" style={{ color: t.accent }}>
            {t.price}
            <span className="ml-1 text-xs font-normal text-muted-foreground">{t.priceNote}</span>
          </span>
        </div>
        <p className="max-w-xl text-sm text-muted-foreground line-clamp-1">{t.tagline}</p>

        <div className="flex items-center gap-2">
          <Button size="sm" className="text-white" style={{ background: t.accent }} asChild>
            <a href={t.buyUrl} target="_blank" rel="noreferrer">
              <ShoppingBag className="h-4 w-4" /> Buy on {t.store}
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={t.previewUrl} target="_blank" rel="noreferrer">
              View <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Progress dots */}
        <div className="mt-1 flex items-center gap-2">
          {templates.map((tp, idx) => (
            <button
              key={tp.name}
              onClick={() => setI(idx)}
              aria-label={`Go to ${tp.name}`}
              className={cn(
                'h-1.5 rounded-full transition-all',
                idx === i ? 'w-6' : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'
              )}
              style={idx === i ? { background: tp.accent } : {}}
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
