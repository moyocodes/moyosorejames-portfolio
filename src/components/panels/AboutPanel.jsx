import * as Icons from 'lucide-react'
import { PanelHeading } from '@/components/deck/Panel'
import { profile, whatICanDo, experience } from '@/data/content'
import { cn } from '@/lib/utils'

const leadershipPoints = whatICanDo.filter((item) => item.icon === 'Users' || item.icon === 'Sparkles')
const currentRole = experience.find((e) => e.current) || experience[0]
const teamsLed = experience.reduce((max, e) => {
  const m = e.points?.join(' ').match(/team of (\w+)/i)
  const n = m ? { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8 }[m[1].toLowerCase()] : null
  return n && n > max ? n : max
}, 0)

export default function AboutPanel({ active }) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-center">
      {/* Portrait */}
      <div className="mx-auto w-full max-w-[260px] lg:mx-0">
        <div className="relative aspect-square w-full">
          {/* Orbiting accent rings */}
          <div
            className={cn(
              'absolute -inset-4 rounded-full border border-primary/20 transition-opacity duration-700',
              active ? 'opacity-100' : 'opacity-0'
            )}
            style={{ animation: active ? 'spin-slow 18s linear infinite' : 'none' }}
          />
          <div
            className={cn(
              'absolute -inset-8 rounded-full border border-dashed border-primary/10 transition-opacity duration-700 delay-100',
              active ? 'opacity-100' : 'opacity-0'
            )}
            style={{ animation: active ? 'spin-slow 26s linear infinite reverse' : 'none' }}
          />
          <div
            className="pointer-events-none absolute -inset-8 -z-10 rounded-full opacity-70 blur-2xl"
            style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 70%)' }}
          />

          {/* Portrait frame — entrance scale/fade keyed on `active` */}
          <div
            className={cn(
              'relative h-full w-full overflow-hidden rounded-full border-4 border-background shadow-2xl ring-1 ring-primary/20 transition-all duration-700 ease-out',
              active ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            )}
          >
            <img
              src="/moy.jpeg"
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Orbiting role badge */}
          <div
            className={cn(
              'absolute bottom-1 right-1 flex items-center gap-1.5 rounded-full border border-border bg-card/95 px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur transition-all duration-700 delay-300',
              active ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            )}
          >
            <Icons.Users className="h-3.5 w-3.5 text-primary" />
            {currentRole?.role || 'Lead Software Developer'}
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="text-center lg:text-left">
        <PanelHeading eyebrow="About" title="Leading products from idea to production" align="left" />

        <p className="text-balance text-muted-foreground">
          <span className="font-semibold text-foreground">5+ years</span> shipping full-stack
          products, currently leading a team of {teamsLed || 6} across three countries — AI
          integration, architecture, and CI/CD, end to end.
        </p>

        <div className="mt-5 flex flex-col gap-2.5">
          {leadershipPoints.map((item) => {
            const Icon = Icons[item.icon] || Icons.Code
            return (
              <div key={item.title} className="flex items-center justify-center gap-2.5 lg:justify-start">
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                <p className="text-left text-sm text-muted-foreground">{item.title}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-primary lg:justify-start">
          <Icons.MapPin className="h-4 w-4" /> {profile.location}
        </div>
      </div>
    </div>
  )
}
