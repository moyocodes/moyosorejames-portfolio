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

const flat = skills.flatMap((group, gi) =>
  group.items.map((item, ii) => ({
    ...item,
    category: group.category,
    key: `${group.category}-${item.name}`,
    seed: gi * 11 + ii,
  }))
)

export default function SkillsPanel() {
  return (
    <div>
      <PanelHeading
        eyebrow="Skills"
        title="A full-stack toolkit"
        description="Frontend, backend, AI integration, and DevOps — the whole pipeline, owned end to end."
      />

      <div className="relative min-h-[420px] w-full sm:min-h-[480px]">
        {flat.map((item) => {
          const top = 8 + rand(item.seed) * 82
          const left = 4 + rand(item.seed + 0.5) * 90
          const size = 40 + Math.round(rand(item.seed + 0.25) * 18)
          const duration = 4 + rand(item.seed + 0.75) * 3
          const delay = rand(item.seed + 0.9) * 3

          return (
            <div
              key={item.key}
              className="group absolute flex flex-col items-center gap-1.5"
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              <div
                className="flex items-center justify-center rounded-2xl border border-border bg-card/80 text-foreground/70 shadow-md backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-lg"
                style={{
                  width: size,
                  height: size,
                  animation: `float ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
                title={item.name}
              >
                <SkillIcon icon={item.icon} className="h-[45%] w-[45%]" />
              </div>
              <span
                className={cn(
                  'pointer-events-none whitespace-nowrap rounded-md bg-popover px-2 py-0.5 text-[11px] font-medium text-popover-foreground opacity-0 shadow-md transition-opacity duration-200',
                  'group-hover:opacity-100'
                )}
              >
                {item.name}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {skills.map((group) => {
          const Icon = Icons[group.icon] || Icons.Code
          return (
            <div key={group.category} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className="h-3.5 w-3.5 text-primary" />
              {group.category}
            </div>
          )
        })}
      </div>
    </div>
  )
}
