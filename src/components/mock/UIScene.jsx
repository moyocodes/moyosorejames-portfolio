/**
 * UIScene — a library of self-contained fake UI "screenshots" rendered with
 * divs + Tailwind, keyed by variant. These fill the device mockups so every
 * project/template looks like a real product without any external images.
 * Each scene is tuned to a color theme passed via `hue` (Tailwind-ish inline).
 */

function Bar({ w = 'w-full', h = 'h-2', c = 'bg-foreground/10', className = '' }) {
  return <div className={`${w} ${h} ${c} rounded-full ${className}`} />
}

export function UIScene({ variant = 'dashboard', accent = '#3b82f6', dark }) {
  const scenes = {
    // Analytics / SaaS dashboard
    dashboard: (
      <div className="flex h-full w-full text-[7px]">
        <div className="hidden w-1/5 flex-col gap-2 border-r border-border/60 bg-muted/40 p-2 sm:flex">
          <div className="mb-1 h-3 w-3 rounded" style={{ background: accent }} />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-sm bg-foreground/20" />
              <Bar w="w-3/4" h="h-1" />
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-2.5">
          <div className="flex items-center justify-between">
            <Bar w="w-16" h="h-2" c="bg-foreground/20" />
            <div className="h-3 w-10 rounded" style={{ background: accent }} />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md border border-border/60 bg-card p-1.5">
                <Bar w="w-1/2" h="h-1" />
                <div className="mt-1 h-2 w-3/4 rounded" style={{ background: `${accent}55` }} />
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-1 rounded-md border border-border/60 bg-card p-2">
            {[40, 65, 45, 80, 55, 90, 70, 60].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t"
                style={{ height: `${h}%`, background: i % 2 ? accent : `${accent}66` }}
              />
            ))}
          </div>
        </div>
      </div>
    ),

    // Marketing / landing hero
    landing: (
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="h-2 w-10 rounded" style={{ background: accent }} />
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <Bar key={i} w="w-4" h="h-1" />
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
          <div className="h-2.5 w-2/3 rounded-full bg-foreground/20" />
          <div className="h-2.5 w-1/2 rounded-full bg-foreground/15" />
          <Bar w="w-3/4" h="h-1" />
          <Bar w="w-2/3" h="h-1" />
          <div className="mt-1 flex gap-1.5">
            <div className="h-3.5 w-12 rounded-full" style={{ background: accent }} />
            <div className="h-3.5 w-12 rounded-full border border-border" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-6 rounded-md border border-border/60 bg-card" />
          ))}
        </div>
      </div>
    ),

    // E-commerce grid
    shop: (
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center justify-between border-b border-border/60 px-3 py-2">
          <div className="h-2 w-12 rounded" style={{ background: accent }} />
          <div className="flex gap-1">
            <div className="h-3 w-3 rounded-full bg-foreground/15" />
            <div className="h-3 w-3 rounded-full bg-foreground/15" />
          </div>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-1.5 p-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-md border border-border/60 bg-card">
              <div
                className="h-6 w-full"
                style={{ background: `linear-gradient(135deg, ${accent}55, ${accent}22)` }}
              />
              <div className="space-y-1 p-1">
                <Bar w="w-full" h="h-1" />
                <div className="flex items-center justify-between">
                  <Bar w="w-1/3" h="h-1" c="bg-foreground/25" />
                  <div className="h-2 w-4 rounded-sm" style={{ background: accent }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    // Content / blog / CMS
    content: (
      <div className="flex h-full w-full">
        <div className="flex flex-1 flex-col gap-2 p-3">
          <div className="h-2.5 w-3/4 rounded-full bg-foreground/20" />
          <div className="flex gap-1">
            <div className="h-2 w-8 rounded-full" style={{ background: `${accent}44` }} />
            <div className="h-2 w-6 rounded-full bg-foreground/10" />
          </div>
          <div className="mt-1 space-y-1">
            {['w-full', 'w-full', 'w-5/6', 'w-full', 'w-2/3'].map((w, i) => (
              <Bar key={i} w={w} h="h-1" />
            ))}
          </div>
          <div
            className="my-1 h-10 w-full rounded-md"
            style={{ background: `linear-gradient(135deg, ${accent}44, ${accent}11)` }}
          />
          <div className="space-y-1">
            {['w-full', 'w-4/5', 'w-full'].map((w, i) => (
              <Bar key={i} w={w} h="h-1" />
            ))}
          </div>
        </div>
        <div className="hidden w-1/4 flex-col gap-1.5 border-l border-border/60 bg-muted/30 p-2 sm:flex">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded border border-border/50 bg-card p-1">
              <Bar w="w-full" h="h-1" />
              <Bar w="w-1/2" h="h-1" className="mt-1" />
            </div>
          ))}
        </div>
      </div>
    ),

    // Photography / portfolio gallery (for Lumen template)
    gallery: (
      <div className="flex h-full w-full flex-col bg-foreground/5">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="text-[8px] font-semibold tracking-widest" style={{ color: accent }}>
            LUMEN
          </div>
          <div className="flex gap-2">
            {['w-4', 'w-4', 'w-4'].map((w, i) => (
              <Bar key={i} w={w} h="h-1" c="bg-foreground/30" />
            ))}
          </div>
        </div>
        <div className="grid flex-1 grid-cols-4 grid-rows-3 gap-1 p-2">
          {[
            'col-span-2 row-span-2',
            '',
            '',
            'row-span-2',
            '',
            'col-span-2',
            '',
          ].map((span, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded ${span}`}
              style={{
                background: `linear-gradient(${i * 45}deg, ${accent}, ${accent}33)`,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      </div>
    ),

    // Booking / scheduling
    booking: (
      <div className="flex h-full w-full flex-col p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="h-2.5 w-16 rounded-full bg-foreground/20" />
          <div className="h-3 w-3 rounded" style={{ background: accent }} />
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-sm text-[6px] font-medium"
              style={{
                background: [10, 14, 21].includes(i) ? accent : 'transparent',
                color: [10, 14, 21].includes(i) ? '#fff' : undefined,
                border: '1px solid hsl(var(--border) / 0.6)',
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-1">
          {['9:00', '11:30', '14:00'].map((t, i) => (
            <div
              key={i}
              className="flex-1 rounded border border-border/60 py-1 text-center text-[6px]"
              style={i === 1 ? { background: accent, color: '#fff', borderColor: accent } : {}}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
  }

  return (
    <div className="h-full w-full" style={{ colorScheme: dark ? 'dark' : 'light' }}>
      {scenes[variant] || scenes.dashboard}
    </div>
  )
}
