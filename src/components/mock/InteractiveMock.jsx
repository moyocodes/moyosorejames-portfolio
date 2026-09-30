import { useState } from 'react'
import { BrowserMock } from '@/components/mock/DeviceMock'
import { UIScene } from '@/components/mock/UIScene'
import { cn } from '@/lib/utils'

/**
 * InteractiveMock — lets a visitor "operate" a system: tabs switch the scene
 * shown inside the browser frame. Each
 * `screen` is { key, label, variant }. Fully self-contained (no images).
 */
export default function InteractiveMock({ url, accent = '#3b82f6', screens, className, fill = false }) {
  const [active, setActive] = useState(0)
  const scene = screens[active]

  return (
    <div className={cn('w-full', fill && 'flex h-full flex-col', className)}>
      {/* Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        <div className="flex gap-1 rounded-full border border-border bg-card/70 p-1 backdrop-blur">
          {screens.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setActive(i)}
              className={cn(
                'rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                i === active
                  ? 'text-white shadow'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              style={i === active ? { background: accent } : {}}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Device */}
      <div
        className={cn(
          'flex justify-center',
          fill ? 'min-h-0 flex-1 items-stretch' : 'items-center'
        )}
      >
        <BrowserMock
          url={url}
          className={fill ? 'flex h-full w-full flex-col' : 'w-full'}
          viewportClassName={fill ? 'min-h-0 flex-1' : 'h-[58vh] max-h-[680px] min-h-[380px]'}
          glow={`radial-gradient(circle, ${accent}55, transparent 70%)`}
        >
          <SceneSwap keyName={scene.key} variant={scene.variant} accent={accent} />
        </BrowserMock>
      </div>
    </div>
  )
}

// Small fade between scenes when the tab changes.
function SceneSwap({ keyName, variant, accent }) {
  return (
    <div key={keyName} className="h-full w-full animate-fade-in">
      <UIScene variant={variant} accent={accent} />
    </div>
  )
}
