import { useEffect, useMemo, useState } from 'react'
import { profile } from '@/data/content'

const USER = 'moyocodes'
const LEVELS = ['bg-muted', 'bg-[#2fa866]/35', 'bg-[#2fa866]/55', 'bg-[#2fa866]/80', 'bg-[#2fa866]']

const describe = (d) =>
  `${d.count === 0 ? 'No' : d.count} contribution${d.count === 1 ? '' : 's'} on ${new Date(`${d.date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`

/** Public GitHub activity, fetched live. If the data can't load, the block simply isn't shown. */
export default function Activity() {
  const [days, setDays] = useState(null)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setDays(d.contributions))
      .catch(() => {})
    return () => controller.abort()
  }, [])

  const total = useMemo(() => days?.reduce((n, d) => n + d.count, 0) ?? 0, [days])
  if (!days?.length) return null

  // The first column starts on the right weekday, so weeks line up.
  const offset = new Date(`${days[0].date}T00:00:00`).getDay()

  return (
    <div className="panel mt-8 p-5 sm:p-6">
      <h3 className="text-lg font-semibold">My public GitHub, last 12 months</h3>
      <div className="mt-4 overflow-x-auto pb-1" ref={(el) => el && (el.scrollLeft = el.scrollWidth)}>
        <div
          role="img"
          aria-label={`${total} public contributions in the last year`}
          className="grid grid-flow-col gap-[3px]"
          style={{ gridTemplateRows: 'repeat(7, auto)', gridTemplateColumns: `repeat(${Math.ceil((offset + days.length) / 7)}, minmax(11px, 1fr))` }}
          onMouseLeave={() => setHovered(null)}
        >
          {Array.from({ length: offset }, (_, i) => <span key={`pad-${i}`} />)}
          {days.map((d) => (
            <span
              key={d.date}
              title={describe(d)}
              onMouseEnter={() => setHovered(d)}
              onClick={() => setHovered(d)}
              className={`aspect-square rounded-[3px] ${LEVELS[d.level]}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="min-h-[1.65em] text-sm font-medium" aria-live="polite">{hovered ? describe(hovered) : `${total} public contributions`}</p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground" aria-hidden="true">
          Less
          {LEVELS.map((l) => <span key={l} className={`mx-px h-3 w-3 rounded-[3px] ${l}`} />)}
          More
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Most of my work sits in private repos on CodeCommit and Bitbucket, so this is the small, public part. <a className="font-medium underline underline-offset-4" href={profile.links.github} target="_blank" rel="noreferrer">See my GitHub</a>
      </p>
    </div>
  )
}
