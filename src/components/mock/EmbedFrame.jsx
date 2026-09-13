import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Loader2, MousePointerClick } from 'lucide-react'
import { BrowserMock } from '@/components/mock/DeviceMock'
import { UIScene } from '@/components/mock/UIScene'
import { cn } from '@/lib/utils'

/**
 * EmbedFrame — shows the REAL live site inside the browser mockup, with a
 * three-tier fallback so it always looks right:
 *
 *   1. <iframe src={url}> — the live, interactive site.
 *   2. If the iframe doesn't load in time (many sites block framing via
 *      X-Frame-Options / frame-ancestors, which we can't detect cross-origin),
 *      fall back to an auto screenshot via WordPress mShots (free, no key).
 *   3. If the screenshot also fails to load, fall back to the code mockup.
 *
 * When there's no real URL yet, we skip straight to the code mockup. Pass
 * screenshotOnly to skip the live iframe entirely (e.g. small previews where
 * a full interactive page would be illegible and loading N live sites at
 * once is wasteful) — goes straight to the mShots screenshot tier.
 */
export default function EmbedFrame({
  url,
  accent = '#3b82f6',
  fallbackScene = 'dashboard',
  fill = false,
  viewportClassName,
  screenshotOnly = false,
}) {
  // 'iframe' → 'shot' → 'mock'
  const [mode, setMode] = useState('iframe')
  const [iframeLoaded, setIframeLoaded] = useState(false)
  // The embedded page swallows touch/scroll gestures that start inside it
  // (iframes are separate documents — their touch events never bubble to
  // the outer deck), which reads as the whole page "hanging" on mobile when
  // someone tries to scroll over a project preview. Default to a purely
  // visual, non-interactive preview; a tap opts in to the real embedded page.
  const [interactive, setInteractive] = useState(false)
  const timeoutRef = useRef(null)

  const hasRealUrl = url && /^https?:\/\//i.test(url)
  const host = hasRealUrl ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'preview'
  const shotSrc = hasRealUrl
    ? `https://s.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=750`
    : null

  // Reset when the URL changes.
  useEffect(() => {
    setMode(hasRealUrl ? (screenshotOnly ? 'shot' : 'iframe') : 'mock')
    setIframeLoaded(false)
    setInteractive(false)
  }, [url, hasRealUrl, screenshotOnly])

  // If the iframe hasn't loaded shortly, assume framing is blocked → screenshot.
  useEffect(() => {
    if (mode !== 'iframe' || !hasRealUrl) return
    timeoutRef.current = setTimeout(() => {
      if (!iframeLoaded) setMode('shot')
    }, 3500)
    return () => clearTimeout(timeoutRef.current)
  }, [mode, hasRealUrl, iframeLoaded])

  return (
    <BrowserMock
      url={hasRealUrl ? host : `${host}.com`}
      className={fill ? 'flex h-full w-full flex-col' : 'w-full'}
      viewportClassName={
        viewportClassName || (fill ? 'min-h-0 flex-1' : 'h-[62vh] max-h-[720px] min-h-[420px]')
      }
      glow={hasRealUrl ? `radial-gradient(circle, ${accent}55, transparent 70%)` : undefined}
    >
      <div className="relative h-full w-full bg-background">
        {/* Tier 1: live iframe */}
        {mode === 'iframe' && (
          <>
            {!iframeLoaded && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 overflow-hidden">
              <iframe
                src={url}
                title={host}
                loading="lazy"
                onLoad={() => setIframeLoaded(true)}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                referrerPolicy="no-referrer"
                className={cn(
                  'absolute left-0 top-0 origin-top-left border-0',
                  !interactive && 'pointer-events-none'
                )}
                style={{ width: '142.857%', height: '142.857%', transform: 'scale(0.7)' }}
              />
            </div>

            {iframeLoaded && !interactive && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setInteractive(true)
                }}
                className="absolute inset-0 z-10 flex items-end justify-center bg-transparent pb-4"
                aria-label="Enable interacting with the embedded site"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow ring-1 ring-border backdrop-blur">
                  <MousePointerClick className="h-3.5 w-3.5" /> Tap to interact
                </span>
              </button>
            )}
          </>
        )}

        {/* Tier 2: auto screenshot */}
        {mode === 'shot' && shotSrc && (
          <img
            src={shotSrc}
            alt={`${host} preview`}
            loading="lazy"
            onError={() => setMode('mock')}
            className="h-full w-full object-cover object-top"
          />
        )}

        {/* Tier 3: code mockup fallback */}
        {mode === 'mock' && <UIScene variant={fallbackScene} accent={accent} />}

        {/* Persistent open-live affordance */}
        {hasRealUrl && (
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
