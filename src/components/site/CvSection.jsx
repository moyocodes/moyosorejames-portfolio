import { ArrowUpRight } from 'lucide-react'
import SectionHead from '@/components/site/SectionHead'
import { buttonVariants } from '@/components/ui/button'
import { certifications, education, profile } from '@/data/content'

export default function CvSection() {
  return (
    <section id="cv" className="section site grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)]">
      <div>
        <SectionHead number="06" label="CV" title="The full story" accent="lives in my CV.">
          Every role and date is in there.
        </SectionHead>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <a href={profile.links.cv} target="_blank" rel="noreferrer" className={buttonVariants()}>
            View CV <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="divide-y divide-border border-y border-border">
        <div className="py-5">
          <p className="label">Education</p>
          <h3 className="mt-2 font-semibold">{education.degree}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{education.honours}. {education.school}, {education.period}</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {education.extras.map((e) => <li key={e}>{e}</li>)}
          </ul>
        </div>
        <div className="py-5">
          <p className="label">Certifications</p>
          <ul className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {certifications.map((c) => (
              <li key={c.name}>
                <span className="block text-sm font-medium leading-snug">{c.name}</span>
                <span className="text-sm text-muted-foreground">{c.by}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
