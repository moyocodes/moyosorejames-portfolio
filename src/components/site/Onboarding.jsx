import { useState } from 'react'
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react'
import { onboarding, profile } from '@/data/content'
import { cn } from '@/lib/utils'

/**
 * What the laptop's screen asks when it wakes up: who are you, then where to go.
 * With `onEnter`, an action takes the camera into the screen instead of plain navigation.
 */
export default function Onboarding({ size = 'screen', onEnter }) {
  const [choice, setChoice] = useState(null)
  const path = onboarding.find((o) => o.key === choice)
  // The small size is for phones, where the laptop renders at about half scale.
  const small = size === 'small'

  return (
    <div className={cn('flex h-full flex-col', small ? 'p-6' : 'p-9')}>
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="h-1 flex-1 rounded-full bg-[#f0ece5]" />
        <span className={cn('h-1 flex-1 rounded-full transition-colors', path ? 'bg-[#f0ece5]' : 'bg-white/20')} />
      </div>

      <div key={choice} className="swap-in flex flex-1 flex-col justify-center text-[#f0ece5]">
        <h2 className={cn('font-medium', small ? 'text-[2.3rem] !leading-[1.1]' : 'text-[1.75rem]')}>{path ? path.title : 'Hi, I’m James. What brings you here?'}</h2>
        {path && <p className={cn('text-pretty text-[#f0ece5]/80', small ? 'mt-1 text-[1.55rem] !leading-[1.25]' : 'mt-2 text-[1.05rem]')}>{path.body}</p>}

        <div className={cn('flex flex-col gap-2', small ? 'mt-3' : 'mt-5')}>
          {!path &&
            onboarding.map((o) => (
              <button key={o.key} onClick={() => setChoice(o.key)} className={cn('flex items-center justify-between rounded-xl border border-white/20 px-4 text-left font-medium transition-colors hover:bg-white/10', small ? 'py-2.5 text-[1.7rem]' : 'py-3')}>
                {o.label} <ArrowRight className="h-4 w-4" />
              </button>
            ))}
          {path &&
            path.actions.map((a, i) => {
              const isCv = a.href === 'cv'
              return (
                <a
                  key={a.label}
                  href={isCv ? profile.links.cv : a.href}
                  target={isCv && !onEnter ? '_blank' : undefined}
                  rel={isCv ? 'noreferrer' : undefined}
                  onClick={(e) => {
                    if (!onEnter) return
                    e.preventDefault()
                    onEnter(a)
                  }}
                  className={cn('flex items-center justify-between rounded-xl px-4 font-medium transition-colors', small ? 'py-2 text-[1.7rem]' : 'py-3', i === 0 ? 'bg-[#f0ece5] text-[#171312] hover:bg-white' : 'border border-white/20 hover:bg-white/10')}
                >
                  {a.label} {isCv ? <FileText className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </a>
              )
            })}
        </div>
      </div>

      {path && (
        <button onClick={() => setChoice(null)} className={cn('inline-flex items-center gap-1.5 self-start text-[#f0ece5]/80 hover:text-[#f0ece5]', small ? 'text-[1.5rem]' : 'text-sm')}>
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
      )}
    </div>
  )
}
