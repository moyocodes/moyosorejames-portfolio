import { cn } from '@/lib/utils'

/**
 * Panel — a full-screen deck slide. Centers its content, applies the shared
 * immersive background layers, and animates content in when `active` is true.
 */
export default function Panel({ id, active, children, className, bg = true, tint, wide = false }) {
  return (
    <section
      id={id}
      className={cn(
        'grain relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-24',
        className
      )}
    >
      {bg && (
        <>
          <div
            className="pointer-events-none absolute inset-0 -z-10 mesh opacity-70"
            style={tint ? { background: tint } : undefined}
          />
          <div className="dotgrid pointer-events-none absolute inset-0 -z-10 opacity-40" />
        </>
      )}
      <div
        className={cn(
          'relative z-10 mx-auto w-full transition-all duration-700',
          wide ? 'max-w-[1400px]' : 'max-w-6xl',
          active ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        )}
      >
        {children}
      </div>
    </section>
  )
}

/** PanelHeading — consistent eyebrow + title + description block. */
export function PanelHeading({ eyebrow, title, description, align = 'center' }) {
  return (
    <div
      className={cn(
        'mb-8 max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left'
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-4 text-balance text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
