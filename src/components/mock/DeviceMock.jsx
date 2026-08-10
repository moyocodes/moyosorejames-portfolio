import { cn } from '@/lib/utils'

/**
 * BrowserMock — a realistic browser window frame wrapping arbitrary children
 * (usually a <UIScene />). Purely CSS/SVG, theme-aware, no external images.
 */
export function BrowserMock({
  url = 'moyosorejames.com',
  children,
  className,
  glow,
  viewportClassName = 'aspect-[16/10]',
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl',
        className
      )}
    >
      {glow && (
        <div
          className="pointer-events-none absolute -inset-px -z-10 rounded-xl opacity-60 blur-2xl"
          style={{ background: glow }}
        />
      )}
      {/* Toolbar */}
      <div className="flex h-9 items-center gap-2 border-b border-border bg-muted/60 px-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div className="mx-auto flex w-1/2 items-center justify-center gap-1.5 rounded-md bg-background/70 px-3 py-1 text-[10px] text-muted-foreground">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          {url}
        </div>
      </div>
      {/* Viewport */}
      <div className={cn('relative w-full overflow-hidden bg-background', viewportClassName)}>
        {children}
      </div>
    </div>
  )
}

/**
 * PhoneMock — a phone frame wrapping children. Used to layer a mobile view on
 * top of the browser mock for an immersive, "responsive showcase" look.
 */
export function PhoneMock({ children, className }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[1.8rem] border-[6px] border-foreground/90 bg-background shadow-2xl',
        className
      )}
    >
      <div className="absolute left-1/2 top-0 z-10 h-4 w-1/3 -translate-x-1/2 rounded-b-xl bg-foreground/90" />
      <div className="relative aspect-[9/19] w-full overflow-hidden">{children}</div>
    </div>
  )
}
