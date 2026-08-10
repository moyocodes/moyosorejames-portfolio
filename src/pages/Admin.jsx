import { useState } from 'react'
import { Copy, Download, Eye, LogOut, PenLine, ShieldAlert } from 'lucide-react'
import PageShell from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Markdown from '@/components/Markdown'
import { adminConfig } from '@/data/content'

/**
 * Admin — a LOCAL writing aid for the repo/Markdown blog. The password gate is
 * convenience only (this is a static site; the value ships to the browser and
 * can be bypassed — it is NOT security). "Export post" produces the object to
 * paste into src/data/posts.js, commit, and push — that's what publishes it.
 */
export default function Admin() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('admin-ok') === '1'
  )
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (pw === adminConfig.password) {
      sessionStorage.setItem('admin-ok', '1')
      setAuthed(true)
      setError('')
    } else {
      setError('Incorrect password.')
    }
  }

  if (!authed) {
    return (
      <PageShell title="Admin">
        <div className="mx-auto max-w-sm pt-10">
          <div className="rounded-2xl border border-border bg-card/70 p-8 backdrop-blur">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <PenLine className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold">Admin sign in</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your password to open the writing editor.
            </p>
            <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
              <input
                type="password"
                autoFocus
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Password"
                className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit">Sign in</Button>
            </form>
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                This gate is for convenience only. On a static site the password is visible in the
                code and is not real security — don't rely on it to protect anything sensitive.
              </span>
            </div>
          </div>
        </div>
      </PageShell>
    )
  }

  return <Editor onSignOut={() => {
    sessionStorage.removeItem('admin-ok')
    setAuthed(false)
  }} />
}

function Editor({ onSignOut }) {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [tags, setTags] = useState('')
  const [minutes, setMinutes] = useState(4)
  const [body, setBody] = useState(
    'Write your post here.\n\n## A subheading\n\nUse blank lines between paragraphs, "## " for subheadings, and "- " for bullet points. **Bold** works too.'
  )
  const [copied, setCopied] = useState(false)

  const slug = slugify(title || 'untitled-post')
  const today = new Date().toISOString().slice(0, 10)

  const postObject = `  {
    slug: '${slug}',
    title: ${JSON.stringify(title || 'Untitled post')},
    excerpt: ${JSON.stringify(excerpt || '')},
    date: '${today}',
    tags: [${tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => JSON.stringify(t))
      .join(', ')}],
    readingMinutes: ${Number(minutes) || 4},
    body: \`${body.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\`,
  },`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(postObject)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const download = () => {
    const blob = new Blob([postObject], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${slug}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <PageShell title="Admin · Write">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">New post</h1>
        <Button variant="ghost" size="sm" onClick={onSignOut}>
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editor */}
        <div className="flex flex-col gap-3">
          <Field label="Title" value={title} onChange={setTitle} placeholder="Post title" />
          <Field label="Excerpt" value={excerpt} onChange={setExcerpt} placeholder="One-line summary" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tags (comma-separated)" value={tags} onChange={setTags} placeholder="AI, Engineering" />
            <Field label="Reading minutes" type="number" value={minutes} onChange={setMinutes} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Body (Markdown-ish)</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={16}
              className="rounded-md border border-input bg-background px-3 py-2 font-mono text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <p className="mb-2 text-sm font-medium">Publish this post</p>
            <ol className="mb-3 list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
              <li>Copy or download the generated post object below.</li>
              <li>
                Paste it into the <code className="rounded bg-background px-1">posts</code> array in{' '}
                <code className="rounded bg-background px-1">src/data/posts.js</code>.
              </li>
              <li>Commit &amp; push — Vercel redeploys and it goes live for everyone.</li>
            </ol>
            <div className="flex gap-2">
              <Button size="sm" onClick={copy}>
                <Copy className="h-4 w-4" /> {copied ? 'Copied!' : 'Copy post object'}
              </Button>
              <Button size="sm" variant="outline" onClick={download}>
                <Download className="h-4 w-4" /> Download .txt
              </Button>
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Eye className="h-4 w-4" /> Live preview
          </div>
          <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur">
            <h2 className="text-2xl font-extrabold tracking-tight">{title || 'Untitled post'}</h2>
            {excerpt && <p className="mt-2 text-muted-foreground">{excerpt}</p>}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)
                .map((t) => (
                  <Badge key={t} variant="secondary" className="font-normal">
                    {t}
                  </Badge>
                ))}
            </div>
            <div className="my-4 h-px bg-border" />
            <Markdown content={body} className="text-[15px]" />
          </div>
        </div>
      </div>
    </PageShell>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  )
}

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
