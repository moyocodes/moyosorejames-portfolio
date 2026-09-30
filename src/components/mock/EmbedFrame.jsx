import { useEffect, useState } from 'react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { BrowserMock } from '@/components/mock/DeviceMock'
import { UIScene } from '@/components/mock/UIScene'
import { usePreviews, previewSrc } from '@/components/mock/PreviewContext'

/**
 * EmbedFrame — a site preview inside the browser mockup.
 *
 *   1. A screenshot bundled in /public/previews (preloaded in the background
 *      by PreviewProvider, so it is already cached by the time you get here).
 *   2. If there is none, an auto screenshot via WordPress mShots.
 *   3. If that fails, the code mockup.
 *
 * No live iframe: embedding real sites was slow (full page load per slide,
 * often blocked by frame headers). Pass `clickToVisit` to make the whole
 * card open the live site, with an animated arrow hint. Pass `screenshotOnly`
 * for small decorative previews whose parent handles the click.
 */
export default function EmbedFrame({
  url,
  accent = '#d9441f',
  fallbackScene = 'dashboard',
  fill = false,
  viewportClassName,
  clickToVisit = false,
}) {
  const { isReady } = usePreviews()
  const hasRealUrl = url && /^https?:\/\//i.test(url)
  const host = hasRealUrl ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'preview'
  const local = hasRealUrl ? previewSrc(url) : null
  const remote = hasRealUrl
    ? `https://s.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=750`
    : null

  // 'local' → 'remote' → 'mock'
  const [tier, setTier] = useState(hasRealUrl ? 'local' : 'mock')
  useEffect(() => setTier(hasRealUrl ? 'local' : 'mock'), [url, hasRealUrl])

  const src = tier === 'local' ? local : tier === 'remote' ? remote : null
  const next = () => setTier((t) => (t === 'local' ? 'remote' : 'mock'))

  return (
    <BrowserMock
      url={hasRealUrl ? host : `${host}.com`}
      className={fill ? 'flex h-full w-full flex-col' : 'w-full'}
      viewportClassName={
        viewportClassName || (fill ? 'min-h-0 flex-1' : 'h-[62vh] max-h-[720px] min-h-[420px]')
      }
      glow={hasRealUrl ? `radial-gradient(circle, ${accent}55, transparent 70%)` : undefined}
    >
      <div className="group relative h-full w-full bg-background">
        {src ? (
          <img
            src={src}
            alt={`${host} preview`}
            decoding="async"
            onError={next}
            className={
              'h-full w-full object-cover object-top transition-opacity duration-300 ' +
              (tier === 'local' && !isReady(url) ? 'opacity-90' : 'opacity-100')
            }
          />
        ) : (
          <UIScene variant={fallbackScene} accent={accent} />
        )}

        {/* Whole card visits the live site, with an animated nudge */}
        {hasRealUrl && clickToVisit && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${host}`}
            className="absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-black/35 via-transparent to-transparent pb-5 opacity-90 transition-opacity hover:opacity-100"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-background/95 py-2 pl-4 pr-2 text-xs font-semibold text-foreground shadow-lg ring-1 ring-border backdrop-blur">
              Click to visit site
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-white"
                style={{ background: accent }}
              >
                <ArrowUpRight className="h-4 w-4 animate-nudge" />
              </span>
            </span>
          </a>
        )}

        {hasRealUrl && !clickToVisit && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2 right-2 z-20 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-medium text-foreground shadow ring-1 ring-border backdrop-blur transition-colors hover:bg-background"
          >
            Open live <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </BrowserMock>
  )
}
