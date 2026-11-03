import SectionHead from '@/components/site/SectionHead'
import Activity from '@/components/site/Activity'
import { skills } from '@/data/content'

export default function Skills() {
  return (
    <section id="skills" className="section site">
      <SectionHead number="05" label="Skills" title="What I" accent="work with." />

      <dl className="mt-10 border-t border-border">
        {skills.map((g) => (
          <div key={g.category} className="grid gap-x-8 gap-y-1 border-b border-border py-4 transition-colors hover:bg-muted/40 md:grid-cols-[12rem_minmax(0,1fr)]">
            <dt className="font-display text-sm font-semibold">{g.category}</dt>
            <dd className="text-pretty text-sm text-muted-foreground">{g.items.join(', ')}</dd>
          </div>
        ))}
      </dl>

      <Activity />
    </section>
  )
}
