import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'
import {
  SiBootstrap,
  SiClaude,
  SiFirebase,
  SiGit,
  SiGithubcopilot,
  SiGraphql,
  SiJavascript,
  SiLaravel,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiReactquery,
  SiRedux,
  SiRender,
  SiTailwindcss,
  SiTypescript,
  SiV0,
  SiVercel,
  SiVuedotjs,
} from 'react-icons/si'
import { PanelHeading } from '@/components/deck/Panel'
import { skills } from '@/data/content'
import { cn } from '@/lib/utils'

const SI_ICONS = {
  SiBootstrap,
  SiClaude,
  SiFirebase,
  SiGit,
  SiGithubcopilot,
  SiGraphql,
  SiJavascript,
  SiLaravel,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiReactquery,
  SiRedux,
  SiRender,
  SiTailwindcss,
  SiTypescript,
  SiV0,
  SiVercel,
  SiVuedotjs,
}

function SkillIcon({ icon, className }) {
  const [lib, name] = icon
  const Icon = lib === 'si' ? SI_ICONS[name] : Icons[name]
  if (!Icon) return null
  return <Icon className={className} />
}

// Deterministic pseudo-random in [0,1), seeded by index — stable across renders.
function rand(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const ROTATE_MS = 3200

export default function SkillsPanel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % skills.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <PanelHeading
        eyebrow="Skills"
        title="A full-stack toolkit"
        description="Frontend, backend, AI integration, and DevOps — the whole pipeline, owned end to end."
      />

      {/* Category tabs */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {skills.map((group, i) => {
          const Icon = Icons[group.icon] || Icons.Code
          return (
            <button
              key={group.category}
              onClick={() => setActive(i)}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                i === active
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {group.category}
            </button>
          )
        })}
      </div>

      {/* Active category's icon cloud */}
      <div className="min-h-[220px] sm:min-h-[180px]">
        <div
          key={skills[active].category}
          className="fade-in flex flex-wrap items-start justify-center gap-x-6 gap-y-6"
        >
          {skills[active].items.map((item, ii) => {
            const seed = active * 11 + ii
            const duration = 4 + rand(seed + 0.75) * 3
            const delay = rand(seed + 0.9) * 3
            const drift = rand(seed + 0.4) > 0.5 ? 'float' : 'float-slow'

            return (
              <div key={item.name} className="flex flex-col items-center gap-1.5">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card/80 text-foreground/70 shadow-md backdrop-blur transition-colors duration-300 hover:border-primary/40 hover:text-primary sm:h-16 sm:w-16"
                  style={{
                    animation: `${drift} ${duration}s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                  }}
                >
                  <SkillIcon icon={item.icon} className="h-[45%] w-[45%]" />
                </div>
                <span className="whitespace-nowrap text-[11px] font-medium text-muted-foreground">
                  {item.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
