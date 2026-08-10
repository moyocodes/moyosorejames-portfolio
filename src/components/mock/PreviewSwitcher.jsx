import { useState } from 'react'
import { MonitorPlay, MousePointerClick } from 'lucide-react'
import EmbedFrame from '@/components/mock/EmbedFrame'
import InteractiveMock from '@/components/mock/InteractiveMock'
import { cn } from '@/lib/utils'

/**
 * PreviewSwitcher — offers two ways to preview a system:
 *   • "Live"        → EmbedFrame (real site via iframe → screenshot → mockup)
 *   • "Interactive" → InteractiveMock (code scenes you can click through)
 *
 * Defaults to Live when a real URL exists, otherwise Interactive.
 */
export default function PreviewSwitcher({ url, accent, screens, fallbackScene, fill = false }) {
  const hasRealUrl = url && /^https?:\/\//i.test(url)
  const [mode, setMode] = useState(hasRealUrl ? 'live' : 'interactive')

  return (
    <div className={cn('w-full', fill && 'flex h-full flex-col')}>
      <div className="mb-4 flex shrink-0 justify-center">
        <div className="flex gap-1 rounded-full border border-border bg-card/70 p-1 backdrop-blur">
          {hasRealUrl && (
            <Tab active={mode === 'live'} onClick={() => setMode('live')} accent={accent} icon={MonitorPlay}>
              Live
            </Tab>
          )}
          <Tab
            active={mode === 'interactive'}
            onClick={() => setMode('interactive')}
            accent={accent}
            icon={MousePointerClick}
          >
            Interactive
          </Tab>
        </div>
      </div>

      {mode === 'live' && hasRealUrl ? (
        <div
          className={cn(
            'flex justify-center animate-fade-in',
            fill ? 'min-h-0 flex-1 items-stretch' : 'items-center'
          )}
        >
          <EmbedFrame url={url} accent={accent} fallbackScene={fallbackScene} fill={fill} />
        </div>
      ) : (
        <InteractiveMock
          key="interactive"
          url={hostFor(url, fallbackScene)}
          accent={accent}
          screens={screens}
          fill={fill}
          className={cn('animate-fade-in', fill && 'min-h-0 flex-1')}
        />
      )}
    </div>
  )
}

function Tab({ active, onClick, accent, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
        active ? 'text-white shadow' : 'text-muted-foreground hover:text-foreground'
      )}
      style={active ? { background: accent } : {}}
    >
      <Icon className="h-3.5 w-3.5" /> {children}
    </button>
  )
}

function hostFor(url, fallback) {
  if (url && /^https?:\/\//i.test(url)) {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  }
  return `${(fallback || 'preview').toString()}.com`
}
