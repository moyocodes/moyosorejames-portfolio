import { useState } from 'react'
import { Monitor, Smartphone } from 'lucide-react'
import { BrowserMock, PhoneMock } from '@/components/mock/DeviceMock'
import { UIScene } from '@/components/mock/UIScene'
import { cn } from '@/lib/utils'

/**
 * InteractiveMock — lets a visitor "operate" a system: tabs switch the scene
 * shown inside the device, and a desktop/mobile toggle swaps the frame. Each
 * `screen` is { key, label, variant }. Fully self-contained (no images).
 */
export default function InteractiveMock({ url, accent = '#3b82f6', screens, className, fill = false }) {
  const [active, setActive] = useState(0)
  const [device, setDevice] = useState('desktop')
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
        <div className="flex gap-1 rounded-full border border-border bg-card/70 p-1 backdrop-blur">
          <button
            onClick={() => setDevice('desktop')}
            className={cn(
              'flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
              device === 'desktop' ? 'bg-foreground text-background' : 'text-muted-foreground'
            )}
            aria-label="Desktop view"
          >
            <Monitor className="h-3.5 w-3.5" /> Desktop
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={cn(
              'flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
              device === 'mobile' ? 'bg-foreground text-background' : 'text-muted-foreground'
            )}
            aria-label="Mobile view"
          >
            <Smartphone className="h-3.5 w-3.5" /> Mobile
          </button>
        </div>
      </div>

      {/* Device */}
      <div
        className={cn(
          'flex justify-center',
          fill ? 'min-h-0 flex-1 items-stretch' : 'items-center'
        )}
      >
        {device === 'desktop' ? (
          <BrowserMock
            url={url}
            className={fill ? 'flex h-full w-full flex-col' : 'w-full'}
            viewportClassName={fill ? 'min-h-0 flex-1' : 'h-[58vh] max-h-[680px] min-h-[380px]'}
            glow={`radial-gradient(circle, ${accent}55, transparent 70%)`}
          >
            <SceneSwap keyName={scene.key} variant={scene.variant} accent={accent} />
          </BrowserMock>
        ) : (
          <PhoneMock className={fill ? 'h-full w-auto' : 'w-[220px]'}>
            <SceneSwap keyName={scene.key} variant={scene.variant} accent={accent} />
          </PhoneMock>
        )}
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
