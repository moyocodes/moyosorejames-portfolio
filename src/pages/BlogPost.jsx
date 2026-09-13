import { useEffect, useState } from 'react'
import { CalendarDays, Clock } from 'lucide-react'
import PageShell, { BackLink } from '@/components/PageShell'
import { Badge } from '@/components/ui/badge'
import Markdown from '@/components/Markdown'
import { fetchPostBySlug } from '@/data/posts'
import { formatDate } from '@/pages/Blog'

export default function BlogPost({ slug }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchPostBySlug(slug)
      .then((data) => {
        if (!cancelled) setPost(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? 'Failed to load post.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading) {
    return (
      <PageShell title="Blog">
        <div className="mx-auto max-w-2xl">
          <BackLink to="blog" label="Back to blog" />
          <p className="text-muted-foreground">Loading post…</p>
        </div>
      </PageShell>
    )
  }

  if (error || !post) {
    return (
      <PageShell title="Blog">
        <div className="mx-auto max-w-2xl">
          <BackLink to="blog" label="Back to blog" />
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p className="mt-2 text-muted-foreground">
            {error || "That post doesn't exist. It may have been moved or not published yet."}
          </p>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell title="Blog">
      <article className="mx-auto max-w-2xl">
        <BackLink to="blog" label="Back to blog" />

        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min read
          </span>
        </div>

        <h1 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags?.map((t) => (
            <Badge key={t} variant="secondary" className="font-normal">
              {t}
            </Badge>
          ))}
        </div>

        <div className="my-6 h-px bg-border" />

        <Markdown content={post.body} className="text-[15px] leading-relaxed" />
      </article>
    </PageShell>
  )
}
