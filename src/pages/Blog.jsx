import { CalendarDays, Clock, PenLine } from 'lucide-react'
import PageShell from '@/components/PageShell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { navigate } from '@/hooks/useHashRoute'
import { posts } from '@/data/posts'

export default function Blog() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <PageShell title="Blog">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Writing</h1>
            <p className="mt-2 text-muted-foreground">
              Notes on full-stack engineering, AI integration, and shipping products.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('admin')}>
            <PenLine className="h-4 w-4" /> Write
          </Button>
        </div>

        {sorted.length === 0 ? (
          <p className="text-muted-foreground">No posts yet — check back soon.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {sorted.map((post) => (
              <button
                key={post.slug}
                onClick={() => navigate(`blog/${post.slug}`)}
                className="group rounded-2xl border border-border bg-card/70 p-6 text-left backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min read
                  </span>
                </div>
                <h2 className="text-xl font-bold transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags?.map((t) => (
                    <Badge key={t} variant="secondary" className="font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  )
}

export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}
