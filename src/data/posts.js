import { supabase } from '@/lib/supabase'

// Blog posts now live in Supabase (table: public.posts — see supabase/schema.sql).
// These helpers map DB rows to the shape the UI uses and back.

function requireSupabase() {
  if (!supabase) {
    throw new Error('Blog is not configured — Supabase env vars are missing.')
  }
  return supabase
}

function fromRow(row) {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date,
    tags: row.tags ?? [],
    readingMinutes: row.reading_minutes,
    body: row.body,
    published: row.published,
  }
}

export async function fetchPosts() {
  const { data, error } = await requireSupabase()
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false })

  if (error) throw error
  return (data ?? []).map(fromRow)
}

export async function fetchAllPosts() {
  const { data, error } = await requireSupabase()
    .from('posts')
    .select('*')
    .order('date', { ascending: false })

  if (error) throw error
  return (data ?? []).map(fromRow)
}

export async function fetchPostBySlug(slug) {
  const { data, error } = await requireSupabase()
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error) throw error
  return data ? fromRow(data) : null
}

export async function createPost(post) {
  const { data, error } = await requireSupabase()
    .from('posts')
    .insert({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      body: post.body,
      tags: post.tags,
      reading_minutes: post.readingMinutes,
      date: post.date,
      published: post.published ?? true,
    })
    .select('*')
    .single()

  if (error) throw error
  return fromRow(data)
}

export async function updatePost(slug, patch) {
  const { data, error } = await requireSupabase()
    .from('posts')
    .update({
      title: patch.title,
      excerpt: patch.excerpt,
      body: patch.body,
      tags: patch.tags,
      reading_minutes: patch.readingMinutes,
      date: patch.date,
      published: patch.published,
    })
    .eq('slug', slug)
    .select('*')
    .single()

  if (error) throw error
  return fromRow(data)
}

export async function deletePost(slug) {
  const { error } = await requireSupabase().from('posts').delete().eq('slug', slug)
  if (error) throw error
}
