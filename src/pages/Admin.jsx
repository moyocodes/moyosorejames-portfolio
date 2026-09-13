import { useEffect, useState } from 'react'
import { LogOut, PenLine, Plus, ShieldAlert, Trash2 } from 'lucide-react'
import PageShell from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Markdown from '@/components/Markdown'
import { supabase } from '@/lib/supabase'
import { createPost, deletePost, fetchAllPosts, updatePost } from '@/data/posts'

/**
 * Admin — password-protected blog editor backed by Supabase. Sign-in uses
 * Supabase Auth (email/password); writes go straight to the `posts` table and
 * are enforced by row-level security (see supabase/schema.sql) so only a
 * signed-in user can create, edit, or delete posts.
 */
export default function Admin() {
  const [session, setSession] = useState(undefined) // undefined = loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <PageShell title="Admin">
        <p className="text-muted-foreground">Loading…</p>
      </PageShell>
    )
  }

  if (!session) return <SignIn />

  return <Editor onSignOut={() => supabase.auth.signOut()} />
}

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setSubmitting(false)
  }

  return (
    <PageShell title="Admin">
      <div className="mx-auto max-w-sm pt-10">
        <div className="rounded-2xl border border-border bg-card/70 p-8 backdrop-blur">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <PenLine className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold">Admin sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in with your Supabase admin account to open the writing editor.
          </p>
          <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Access is controlled by Supabase Auth and row-level security — create your admin
              user in the Supabase dashboard (Authentication → Users).
            </span>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

const emptyDraft = {
  slug: '',
  title: '',
  excerpt: '',
  tags: '',
  minutes: 4,
  body: 'Write your post here.\n\n## A subheading\n\nUse blank lines between paragraphs, "## " for subheadings, and "- " lines for bullet points. **Bold** works too.',
  date: new Date().toISOString().slice(0, 10),
  published: true,
}

function Editor({ onSignOut }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingSlug, setEditingSlug] = useState(null) // null = new post
  const [draft, setDraft] = useState(emptyDraft)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    fetchAllPosts()
      .then(setPosts)
      .catch((err) => setError(err.message ?? 'Failed to load posts.'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const startNew = () => {
    setEditingSlug(null)
    setDraft(emptyDraft)
  }

  const startEdit = (post) => {
    setEditingSlug(post.slug)
    setDraft({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      tags: (post.tags ?? []).join(', '),
      minutes: post.readingMinutes,
      body: post.body,
      date: post.date,
      published: post.published,
    })
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const tags = draft.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    const payload = {
      title: draft.title || 'Untitled post',
      excerpt: draft.excerpt,
      tags,
      readingMinutes: Number(draft.minutes) || 4,
      body: draft.body,
      date: draft.date,
      published: draft.published,
    }

    try {
      if (editingSlug) {
        await updatePost(editingSlug, payload)
      } else {
        const slug = slugify(draft.slug || draft.title || 'untitled-post')
        await createPost({ ...payload, slug })
      }
      load()
      startNew()
    } catch (err) {
      setError(err.message ?? 'Failed to save post.')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (slug) => {
    if (!confirm(`Delete "${slug}"? This can't be undone.`)) return
    setError('')
    try {
      await deletePost(slug)
      if (editingSlug === slug) startNew()
      load()
    } catch (err) {
      setError(err.message ?? 'Failed to delete post.')
    }
  }

  return (
    <PageShell title="Admin · Write">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog admin</h1>
        <Button variant="ghost" size="sm" onClick={onSignOut}>
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-[280px_1fr_1fr]">
        {/* Post list */}
        <div className="flex flex-col gap-2">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-muted-foreground">Posts</h2>
            <Button size="sm" variant="outline" onClick={startNew}>
              <Plus className="h-4 w-4" /> New
            </Button>
          </div>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.slug}
                className={`group flex items-start justify-between gap-2 rounded-lg border p-3 text-sm transition-colors ${
                  editingSlug === post.slug
                    ? 'border-primary/50 bg-primary/5'
                    : 'border-border bg-card/50 hover:border-primary/30'
                }`}
              >
                <button className="min-w-0 flex-1 text-left" onClick={() => startEdit(post)}>
                  <p className="truncate font-medium">{post.title}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    {post.date}
                    {!post.published && (
                      <Badge variant="secondary" className="font-normal">
                        Draft
                      </Badge>
                    )}
                  </p>
                </button>
                <button
                  onClick={() => remove(post.slug)}
                  className="shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                  aria-label={`Delete ${post.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Editor */}
        <form onSubmit={save} className="flex flex-col gap-3">
          <Field label="Title" value={draft.title} onChange={(v) => setDraft((d) => ({ ...d, title: v }))} placeholder="Post title" />
          {!editingSlug && (
            <Field
              label="Slug (optional — derived from title if blank)"
              value={draft.slug}
              onChange={(v) => setDraft((d) => ({ ...d, slug: v }))}
              placeholder="my-post-slug"
            />
          )}
          <Field label="Excerpt" value={draft.excerpt} onChange={(v) => setDraft((d) => ({ ...d, excerpt: v }))} placeholder="One-line summary" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tags (comma-separated)" value={draft.tags} onChange={(v) => setDraft((d) => ({ ...d, tags: v }))} placeholder="AI, Engineering" />
            <Field label="Reading minutes" type="number" value={draft.minutes} onChange={(v) => setDraft((d) => ({ ...d, minutes: v }))} />
          </div>
          <Field label="Date" type="date" value={draft.date} onChange={(v) => setDraft((d) => ({ ...d, date: v }))} />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(e) => setDraft((d) => ({ ...d, published: e.target.checked }))}
            />
            Published (visible on the public blog)
          </label>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Body (Markdown-ish)</label>
            <textarea
              value={draft.body}
              onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))}
              rows={16}
              className="rounded-md border border-input bg-background px-3 py-2 font-mono text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : editingSlug ? 'Save changes' : 'Publish post'}
            </Button>
            {editingSlug && (
              <Button type="button" variant="outline" onClick={startNew}>
                Cancel
              </Button>
            )}
          </div>
        </form>

        {/* Live preview */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-2 text-sm font-medium text-muted-foreground">Live preview</div>
          <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur">
            <h2 className="text-2xl font-extrabold tracking-tight">{draft.title || 'Untitled post'}</h2>
            {draft.excerpt && <p className="mt-2 text-muted-foreground">{draft.excerpt}</p>}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {draft.tags
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
            <Markdown content={draft.body} className="text-[15px]" />
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
