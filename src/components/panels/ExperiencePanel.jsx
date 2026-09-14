import { useState } from 'react'
import { ArrowRight, Briefcase, GraduationCap } from 'lucide-react'
import { PanelHeading } from '@/components/deck/Panel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Drawer from '@/components/Drawer'
import { experience, education } from '@/data/content'

export default function ExperiencePanel() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(0)

  const openAt = (i) => {
    setSelected(i)
    setOpen(true)
  }

  return (
    <div>
      <PanelHeading
        eyebrow="Experience"
        title="Where I've worked"
        description="5+ years shipping full-stack products and leading teams. Click any role to open the full detail."
      />

      {/* Compact role cards — click opens the side drawer */}
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
        {experience.map((job, i) => (
          <button
            key={i}
            onClick={() => openAt(i)}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/70 p-5 text-left backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-semibold">{job.role}</h3>
                {job.current && <Badge className="shrink-0 text-xs">Now</Badge>}
              </div>
              <p className="truncate text-sm text-primary">{job.company}</p>
              <p className="text-xs text-muted-foreground">{job.period}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button onClick={() => openAt(0)} size="lg">
          <Briefcase className="h-4 w-4" /> View full experience
        </Button>
      </div>

      {/* Side drawer with the full timeline + education */}
      <Drawer open={open} onClose={() => setOpen(false)} title="Experience & Education">
        <div className="relative border-l border-border pl-7">
          {experience.map((job, i) => (
            <div
              key={i}
              className={`relative pb-8 last:pb-0 transition-opacity ${
                i === selected ? 'opacity-100' : 'opacity-70'
              }`}
            >
              <span
                className={`absolute -left-[35px] flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  job.current ? 'border-primary bg-primary' : 'border-border bg-background'
                }`}
              >
                {job.current && <span className="h-2 w-2 rounded-full bg-primary-foreground" />}
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-semibold">{job.role}</h3>
                {job.current && <Badge className="text-xs">Current</Badge>}
              </div>
              <p className="text-sm font-medium text-primary">{job.company}</p>
              <p className="mb-2 text-xs text-muted-foreground">
                {job.period} · {job.location}
              </p>
              <ul className="space-y-1.5">
                {job.points.map((p, j) => (
                  <li key={j} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-4 rounded-xl border border-border bg-muted/40 p-5">
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">{education.degree}</h3>
            <p className="text-sm text-primary">{education.honours}</p>
            <p className="text-sm text-muted-foreground">
              {education.school} · {education.period}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{education.extra}</p>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
