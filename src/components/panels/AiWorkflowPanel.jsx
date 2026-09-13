import { useState } from 'react'
import * as Icons from 'lucide-react'
import { PanelHeading } from '@/components/deck/Panel'
import { Badge } from '@/components/ui/badge'
import { aiWorkflow } from '@/data/content'
import { cn } from '@/lib/utils'

export default function AiWorkflowPanel() {
  const [selected, setSelected] = useState(0)
  const active = aiWorkflow.cases[selected]
  const ActiveIcon = Icons[active.icon] || Icons.Bot

  return (
    <div>
      <PanelHeading
        eyebrow="AI Workflow"
        title="How I work with AI agents"
        description={aiWorkflow.intro}
      />

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Case list */}
        <div className="flex flex-col gap-2">
          {aiWorkflow.cases.map((c, i) => {
            const Icon = Icons[c.icon] || Icons.Bot
            return (
              <button
                key={c.title}
                onClick={() => setSelected(i)}
                className={cn(
                  'group flex items-start gap-3 rounded-2xl border p-4 text-left transition-all',
                  i === selected
                    ? 'border-primary/40 bg-primary/10'
                    : 'border-border bg-card/70 backdrop-blur hover:-translate-y-0.5 hover:border-primary/40'
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                    i === selected ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                    {c.competency}
                  </p>
                  <p className="truncate text-sm font-medium">{c.title}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Detail */}
        <div
          key={active.title}
          className="fade-in flex flex-col rounded-2xl border border-border bg-card/80 p-6 backdrop-blur"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ActiveIcon className="h-5 w-5" />
            </span>
            <div>
              <Badge className="mb-1 text-[10px]">{active.competency}</Badge>
              <h3 className="font-semibold leading-tight">{active.title}</h3>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{active.body}</p>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-3xl text-balance text-center text-xs text-muted-foreground">
        {aiWorkflow.splitNote}
      </p>
    </div>
  )
}
