import { useCallback, useState } from 'react'
import { Check } from 'lucide-react'
import { workSteps } from '@/data/content'
import { usePinnedScroll, scrollToProgress } from '@/hooks/usePinnedScroll'
import { cn } from '@/lib/utils'

const PER_STEP = () => window.innerHeight * 0.8

export default function HowIWork() {
  const [step, setStep] = useState(0)
  const distance = useCallback(() => PER_STEP() * (workSteps.length - 1), [])
  const onProgress = useCallback((p) => setStep(Math.min(workSteps.length - 1, Math.floor(p * workSteps.length))), [])
  const { section, pinned } = usePinnedScroll(distance, onProgress)
  const current = workSteps[step]

  const Label = (
    <p className="label">
      <span className="label-num">03</span>
      <span className="label-line" aria-hidden="true" />
      How I work, {step + 1} of {workSteps.length}
    </p>
  )

  if (!pinned) {
    return (
      <section id="how" ref={section} className="section site space-y-14">
        {workSteps.map((s, i) => (
          <div key={s.title}>
            <p className="label">
              <span className="label-num">03</span>
              <span className="label-line" aria-hidden="true" />
              How I work, {i + 1} of {workSteps.length}
            </p>
            <h2 className="mt-3 text-[1.7rem] !leading-[1.15]">{s.title}</h2>
            <p className="mt-2 text-pretty text-muted-foreground">{s.body}</p>
            <StepVisual step={s} className="mt-6" />
          </div>
        ))}
      </section>
    )
  }

  return (
    <section id="how" ref={section} className="relative scroll-mt-[-5.5rem] border-t border-border">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="aura opacity-70" aria-hidden="true" />
        <div className="site relative grid w-full items-center gap-14 lg:grid-cols-2">
          <div>
            {Label}
            <div key={step} className="swap-in">
              <h2 className="mt-4 text-[2.4rem] !leading-[1.1]">{current.title}</h2>
              <p className="mt-4 max-w-md text-pretty text-muted-foreground">{current.body}</p>
            </div>
            <div className="mt-7 flex items-center gap-0.5" role="group" aria-label="Jump to a step">
              {workSteps.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => scrollToProgress(section.current, distance(), (i + 0.5) / workSteps.length)}
                  aria-label={s.title}
                  aria-current={i === step}
                  className="group flex h-6 items-center px-[3px]"
                >
                  <span className={cn('block h-1 rounded-full transition-all', i === step ? 'w-8 bg-foreground' : 'w-2 bg-input group-hover:bg-foreground/60')} />
                </button>
              ))}
            </div>
          </div>
          <StepVisual key={step} step={current} className="swap-in" />
        </div>
      </div>
    </section>
  )
}

function StepVisual({ step, className }) {
  return (
    <div className={cn('relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-3xl p-6', className)} style={{ background: `linear-gradient(135deg, ${step.grad[0]}, ${step.grad[1]})` }}>
      <ol className="float-panel w-full max-w-sm space-y-2 p-4">
        {step.rows.map((row, i) => (
          <li key={row} className="pop-in flex items-center gap-3 rounded-xl bg-[#f0ebe3] px-3 py-2 text-sm font-medium" style={{ animationDelay: `${i * 90}ms` }}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#261f1c] text-sm text-[#fbfaf7]">
              {i === step.rows.length - 1 ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            {row}
          </li>
        ))}
      </ol>
      <span className="float-chip absolute bottom-4 right-4">{step.chip}</span>
    </div>
  )
}
