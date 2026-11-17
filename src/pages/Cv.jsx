import { ArrowUpRight, Download } from 'lucide-react'
import PageShell from '@/components/PageShell'
import { buttonVariants } from '@/components/ui/button'
import { cvs } from '@/data/content'

// The CV shown at /cv. The other role CVs are linked below it.
const featured = cvs[0]

export default function Cv() {
  const others = cvs.filter((c) => c.file !== featured.file)

  return (
    <PageShell title="CV">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label">CV</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight">{featured.title}</h1>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a href={featured.file} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline' })}>
              Open PDF <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href={featured.file} download className={buttonVariants()}>
              Download <Download className="h-4 w-4" />
            </a>
          </div>
        </div>

        <object
          data={`${featured.file}#view=FitH`}
          type="application/pdf"
          className="h-[80vh] w-full rounded-2xl border border-border bg-card"
          aria-label={`${featured.title} CV`}
        >
          <p className="p-6 text-sm text-muted-foreground">
            Your browser can’t show the PDF here.{' '}
            <a href={featured.file} target="_blank" rel="noreferrer" className="underline">Open it instead.</a>
          </p>
        </object>

        {others.length > 0 && (
          <div className="mt-8">
            <p className="label">Other CVs by role</p>
            <ul className="mt-3 space-y-2">
              {others.map((c) => (
                <li key={c.file}>
                  <a href={c.file} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-medium hover:underline">
                    {c.title} <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </PageShell>
  )
}
