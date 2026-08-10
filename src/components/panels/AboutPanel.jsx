import * as Icons from 'lucide-react'
import { PanelHeading } from '@/components/deck/Panel'
import { profile, whatICanDo } from '@/data/content'

export default function AboutPanel() {
  return (
    <div>
      <PanelHeading
        eyebrow="About"
        title="I ship products end to end"
        description={profile.summary}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whatICanDo.map((item, i) => {
          const Icon = Icons[item.icon] || Icons.Code
          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-border bg-card/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1.5 font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          )
        })}

        {/* Signature card */}
        <div className="flex flex-col justify-between rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-5">
          <p className="text-sm text-muted-foreground">{profile.summaryLong}</p>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
            <Icons.MapPin className="h-4 w-4" /> {profile.location}
          </div>
        </div>
      </div>
    </div>
  )
}
