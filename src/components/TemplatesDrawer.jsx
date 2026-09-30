import { ExternalLink, ShoppingBag } from 'lucide-react'
import Drawer from '@/components/Drawer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { closeTemplates, useTemplatesDrawer } from '@/hooks/useTemplatesDrawer'
import { templates } from '@/data/content'

/** Templates for sale — a plain list in a side drawer, no previews. */
export default function TemplatesDrawer() {
  const open = useTemplatesDrawer()

  return (
    <Drawer open={open} onClose={closeTemplates} title="Templates for sale">
      <ul className="space-y-4">
        {templates.map((t) => (
          <li key={t.name} className="rounded-2xl border border-border bg-background/60 p-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h4 className="font-display text-lg font-extrabold tracking-tight">{t.name}</h4>
              {t.featured && <Badge>Best seller</Badge>}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{t.tagline}</p>
            {t.description && <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>}

            <p className="mt-3 text-xl font-extrabold text-primary">
              {t.price}
              <span className="ml-1.5 text-xs font-normal text-muted-foreground">{t.priceNote}</span>
            </p>

            <ul className="mt-3 space-y-1">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  {f}
                </li>
              ))}
            </ul>

            {t.requirements && (
              <p className="mt-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Requirements:</span> {t.requirements}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" asChild>
                <a href={t.buyUrl} target="_blank" rel="noreferrer">
                  <ShoppingBag className="h-4 w-4" /> Buy on {t.store}
                </a>
              </Button>
              {t.previewUrl && t.previewUrl !== t.buyUrl && (
                <Button size="sm" variant="outline" asChild>
                  <a href={t.previewUrl} target="_blank" rel="noreferrer">
                    View <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Drawer>
  )
}
