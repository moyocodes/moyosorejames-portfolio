import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { Cloud } from 'lucide-react'
import {
  SiBitbucket, SiCapacitor, SiClaude, SiCloudflare, SiCloudinary, SiDialogflow, SiDigitalocean, SiDocker, SiExpress, SiFastapi,
  SiFirebase, SiFlutter, SiFramer, SiGithubactions, SiGraphql, SiJest, SiLaravel, SiMeta, SiMui, SiMysql, SiNextdotjs, SiNginx,
  SiNodedotjs, SiOllama, SiOpenstreetmap, SiPhp, SiPostgresql, SiReact, SiRender, SiRust, SiShadcnui, SiSupabase, SiTailwindcss,
  SiTypescript, SiV0, SiVercel, SiVitest, SiVuedotjs, SiWebassembly, SiWhatsapp, SiWordpress,
} from 'react-icons/si'

const ITEMS = [
  ['React', SiReact], ['Claude', SiClaude], ['Node.js', SiNodedotjs], ['TypeScript', SiTypescript], ['Ollama', SiOllama],
  ['Next.js', SiNextdotjs], ['Rust', SiRust], ['Postgres', SiPostgresql], ['Vue.js', SiVuedotjs], ['Meta Models', SiMeta],
  ['Laravel', SiLaravel], ['FastAPI', SiFastapi], ['Docker', SiDocker], ['Tailwind', SiTailwindcss], ['AWS', Cloud],
  ['WebAssembly', SiWebassembly], ['Vercel', SiVercel], ['MySQL', SiMysql], ['GraphQL', SiGraphql], ['Supabase', SiSupabase],
  ['PHP', SiPhp], ['Express', SiExpress], ['Cloudflare', SiCloudflare], ['Flutter', SiFlutter], ['Firebase', SiFirebase],
  ['DigitalOcean', SiDigitalocean], ['Render', SiRender], ['Nginx', SiNginx], ['GitHub Actions', SiGithubactions], ['Bitbucket', SiBitbucket],
  ['WhatsApp API', SiWhatsapp], ['Cloudinary', SiCloudinary], ['OpenStreetMap', SiOpenstreetmap], ['shadcn/ui', SiShadcnui], ['Material UI', SiMui],
  ['Framer Motion', SiFramer], ['Capacitor', SiCapacitor], ['Jest', SiJest], ['Vitest', SiVitest], ['WordPress', SiWordpress],
  ['Dialogflow', SiDialogflow], ['v0', SiV0],
]

const clamp = (v) => Math.min(1, Math.max(0, v))
const smooth = (v) => v * v * (3 - 2 * v)
// Stable pseudo-random numbers, so the layout never jumps between renders.
const rand = (seed) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}
// Where they all come from: roughly the middle of the laptop's screen.
const ORIGIN = { x: 50, y: 45 }

function layout(compact) {
  const items = compact ? ITEMS.slice(0, 18) : ITEMS
  return spread(items.map(([name, Icon], i) => {
    const r = rand(i + 1)
    if (compact) {
      // Phones: the laptop fills the width, so skills sit above and below it.
      const above = i % 3 === 0
      return { name, Icon, x: 12 + rand(i + 40) * 76, y: above ? 20 + r * 6 : 70 + r * 26 }
    }
    const angle = i * 2.39996
    const reach = 0.78 + r * 0.22
    let x = 50 + Math.cos(angle) * reach * 46
    let y = 52 + Math.sin(angle) * reach * 42
    // Keep clear of the laptop and the line of text above it.
    if (Math.abs(x - 50) < 27 && y > 8 && y < 76) x = 50 + Math.sign(x - 50 || 1) * (27 + r * 14)
    return { name, Icon, x, y: Math.max(11, y) }
  }), compact)
}

// Nudges overlapping labels apart vertically, in percent of the hero.
function spread(items, compact) {
  const gapX = compact ? 24 : 9
  const gapY = compact ? 3.4 : 4
  for (let pass = 0; pass < 12; pass++) {
    items.forEach((a, i) => {
      items.slice(i + 1).forEach((b) => {
        if (Math.abs(a.x - b.x) >= gapX || Math.abs(a.y - b.y) >= gapY) return
        const push = (gapY - Math.abs(a.y - b.y)) / 2 + 0.1
        const dir = a.y <= b.y ? 1 : -1
        a.y = Math.max(10, a.y - push * dir)
        b.y = Math.min(96, b.y + push * dir)
      })
    })
  }
  return items
}

/** Small skill badges that fly out of the laptop as you scroll, then slide back in. */
const EmergingSkills = forwardRef(function EmergingSkills({ compact }, ref) {
  const nodes = useRef([])
  const items = useMemo(() => layout(compact), [compact])

  useImperativeHandle(
    ref,
    () => ({
      setProgress(s) {
        const box = nodes.current[0]?.offsetParent
        if (!box) return
        const w = box.clientWidth
        const h = box.clientHeight
        items.forEach((item, i) => {
          const el = nodes.current[i]
          if (!el) return
          const stagger = rand(i + 90)
          const out = smooth(clamp((s - 0.36 - stagger * 0.16) / 0.2))
          const back = smooth(clamp((s - 0.84 - stagger * 0.06) / 0.1))
          const v = out * (1 - back)
          const dx = ((ORIGIN.x - item.x) / 100) * w * (1 - v)
          const dy = ((ORIGIN.y - item.y) / 100) * h * (1 - v)
          el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${0.35 + 0.65 * v})`
          el.style.opacity = clamp(v * 1.4) * 0.62
        })
      },
    }),
    [items]
  )

  return (
    <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
      {items.map(({ name, Icon, x, y }, i) => (
        <span
          key={name}
          ref={(el) => (nodes.current[i] = el)}
          data-skill-chip
          className="absolute"
          style={{ left: `${x}%`, top: `${y}%`, opacity: 0, transform: 'translate(-50%, -50%) scale(0.35)' }}
        >
          <span className="float-skill inline-flex items-center gap-1.5 whitespace-nowrap text-[0.72rem] font-medium text-foreground" style={{ animationDelay: `${rand(i + 7) * -6}s` }}>
            <Icon className="h-3 w-3 shrink-0" />
            {name}
          </span>
        </span>
      ))}
    </div>
  )
})

export default EmergingSkills
