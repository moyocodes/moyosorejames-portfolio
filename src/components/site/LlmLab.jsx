import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import SectionHead from '@/components/site/SectionHead'
import { agentAttempts, routerSamples } from '@/data/content'
import { cn } from '@/lib/utils'

const option = 'rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors'
const idle = 'bg-[#f0ebe3] hover:bg-[#e6dfd4]'

export default function LlmLab() {
  return (
    <section id="ai" className="section site">
      <SectionHead number="04" label="AI in production" title="Models get things wrong." accent="I build for that.">
        Two ideas from products I’ve shipped. Try them. Sample inputs, no live model.
      </SectionHead>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <RouterDemo />
        <AgentDemo />
      </div>
    </section>
  )
}

function DemoCard({ grad, chip, title, body, children }) {
  return (
    <div>
      <div className="relative flex min-h-[24.5rem] items-center justify-center rounded-3xl p-5 pb-16 sm:p-8 sm:pb-16" style={{ background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}>
        <div className="float-panel w-full max-w-md p-3">{children}</div>
        <span key={chip} className="float-chip pop-in absolute bottom-4 right-4" aria-live="polite">{chip}</span>
      </div>
      <h3 className="mt-3 text-[1.1rem] tracking-tight">{title}</h3>
      <p className="mt-0.5 text-pretty text-sm text-muted-foreground">{body}</p>
    </div>
  )
}

/** TourFinderApp's rule: self-hosted model by default, Claude when being wrong costs more. */
function RouterDemo() {
  const [i, setI] = useState(0)
  const sample = routerSamples[i]

  return (
    <DemoCard
      grad={['#d9e4f2', '#7f9bd6']}
      chip={sample.target === 'claude' ? 'Sent to Claude' : 'Sent to Ollama'}
      title="The right model for the question"
      body="TourFinderApp keeps easy questions on a self-hosted model. Riskier ones go to Claude."
    >
      <div className="flex flex-col gap-1.5" role="group" aria-label="Choose a sample question">
        {routerSamples.map((s, n) => (
          <button key={s.question} onClick={() => setI(n)} aria-pressed={n === i} className={cn(option, n === i ? 'bg-[#261f1c] text-[#fbfaf7]' : idle)}>
            {s.question}
          </button>
        ))}
      </div>
      <p key={i} className="swap-in min-h-[4.5rem] px-2 pb-1 pt-3 text-sm text-pretty text-[#5c534c]">
        <span className="font-semibold text-[#261f1c]">{sample.kind}.</span> {sample.why}
      </p>
    </DemoCard>
  )
}

/** Nudgy's rule: the server checks the agent, and confirmations come from what was saved. */
function AgentDemo() {
  const [log, setLog] = useState([])
  const saved = log.some((a) => a.ok)
  const last = log[log.length - 1]

  return (
    <DemoCard
      grad={['#f6d9cc', '#e39f85']}
      chip={!last ? 'Your move' : last.ok ? 'Saved' : 'Refused'}
      title="Let the server say no"
      body="In Nudgy the agent proposes and the server decides. Be the agent: pick a time for “Send the invoice”."
    >
      <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="Choose a time to propose">
        {agentAttempts.map((a) => {
          const tried = log.includes(a)
          return (
            <button
              key={a.time}
              onClick={() => setLog((l) => [...l, a])}
              disabled={tried || saved}
              className={cn(option, tried ? 'bg-[#f0ebe3] text-[#5c534c] line-through' : saved ? 'bg-[#f0ebe3] text-[#5c534c]' : idle)}
            >
              {a.time}
            </button>
          )
        })}
      </div>
      <div className="min-h-[7.25rem] px-2 pb-1 pt-3 text-sm text-[#5c534c]">
        {!last && <p>The server answers here, one step at a time.</p>}
        {last && (
          <p key={log.length} className="swap-in text-pretty">
            <span className="font-semibold text-[#261f1c]">Step {log.length}: {last.ok ? 'Saved.' : `Refused: ${last.rule}.`}</span>{' '}
            {last.ok ? `The confirmation comes from the saved record: “Send the invoice”, ${last.time.toLowerCase()}.` : `${last.reason} Try again.`}
          </p>
        )}
        {log.length > 0 && (
          <button onClick={() => setLog([])} className="mt-2 inline-flex items-center gap-1.5 font-medium text-[#261f1c] underline underline-offset-4">
            <RotateCcw className="h-3.5 w-3.5" /> Undo everything
          </button>
        )}
      </div>
    </DemoCard>
  )
}
