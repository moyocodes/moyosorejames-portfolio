import EmbedFrame from '@/components/mock/EmbedFrame'
import InteractiveMock from '@/components/mock/InteractiveMock'
import { cn } from '@/lib/utils'

/**
 * PreviewSwitcher — shows the real live site (EmbedFrame: iframe → screenshot
 * → mockup fallback) when a URL exists, otherwise the clickable code mockup.
 */
export default function PreviewSwitcher({ url, accent, screens, fallbackScene, fill = false }) {
  const hasRealUrl = url && /^https?:\/\//i.test(url)

  return (
    <div className={cn('w-full', fill && 'flex h-full flex-col')}>
      {hasRealUrl ? (
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

function hostFor(url, fallback) {
  if (url && /^https?:\/\//i.test(url)) {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  }
  return `${(fallback || 'preview').toString()}.com`
}
