/** Slow marquee of outlined oversized type, carrying roles and stack. */
export default function Ticker({ items }) {
  const loop = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-border py-3" aria-hidden="true">
      <div className="ticker-track flex whitespace-nowrap">
        {loop.map((item, i) => (
          <span key={item + i} className="inline-flex items-center gap-8 pr-8">
            <span
              className="font-display text-2xl font-extrabold uppercase tracking-tight text-transparent sm:text-3xl"
              style={{ WebkitTextStroke: '1px hsl(var(--foreground) / 0.35)' }}
            >
              {item}
            </span>
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
