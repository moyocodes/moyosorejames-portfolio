-- Blog backend schema for Supabase.
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  tags text[] not null default '{}',
  reading_minutes integer not null default 4,
  published boolean not null default true,
  date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_date_idx on public.posts (date desc);

-- Keep updated_at current on every write.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

alter table public.posts enable row level security;

-- Anyone (including anonymous visitors) can read published posts.
drop policy if exists "Published posts are publicly readable" on public.posts;
create policy "Published posts are publicly readable"
  on public.posts for select
  using (published = true);

-- Signed-in users (the admin account you create) can read every post, including drafts.
drop policy if exists "Authenticated users can read all posts" on public.posts;
create policy "Authenticated users can read all posts"
  on public.posts for select
  to authenticated
  using (true);

-- Signed-in users can create, edit, and delete posts.
drop policy if exists "Authenticated users can insert posts" on public.posts;
create policy "Authenticated users can insert posts"
  on public.posts for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update posts" on public.posts;
create policy "Authenticated users can update posts"
  on public.posts for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete posts" on public.posts;
create policy "Authenticated users can delete posts"
  on public.posts for delete
  to authenticated
  using (true);

-- Seed with the two posts that used to live in src/data/posts.js.
insert into public.posts (slug, title, excerpt, body, tags, reading_minutes, date)
values
  (
    'building-ai-into-production',
    'Building AI Features Into Production Systems',
    'How I approach integrating LLMs into real products without giving up ownership of architecture and code quality.',
    $body$Integrating AI into a product is less about the model and more about the seams around it.

## Start with the workflow, not the model

The best AI features I've shipped began as a boring question: where is a human doing repetitive judgment work? That's where an LLM earns its place — drafting content, structuring messy input, summarizing long threads for an admin.

## Keep ownership of the system

Tools like Claude and Copilot make me faster, but the architecture is still mine. I use AI to scaffold endpoints and work through infra decisions, then review every line like I would a teammate's PR.

- Design the API contract first
- Let the model draft the implementation
- Verify, test, and own the result

## Ship, measure, iterate

AI features are probabilistic. Log inputs and outputs, watch the edges, and tighten prompts against real usage. That feedback loop is where a demo becomes a product.$body$,
    array['AI', 'Engineering', 'LLMs'],
    5,
    '2026-07-15'
  ),
  (
    'shipping-full-stack-end-to-end',
    'Shipping Full-Stack Products End to End',
    'Notes from owning delivery across frontend, backend, and DevOps — and keeping the contracts consistent.',
    $body$Owning a product end to end means the frontend and backend can never drift apart.

## One contract, both sides

When I build a feature, I design the API contract before writing either side. The frontend and backend then implement against the same shape, which kills a whole category of integration bugs.

## DevOps is part of the feature

A feature isn't done when it works on my machine — it's done when it deploys cleanly through CI/CD to AWS, Vercel, or Render. Treating deployment as part of the work, not an afterthought, is what makes shipping fast and boring in the best way.

## Reuse compounds

Modular components and reusable hooks aren't just tidy — they cut load times and issue rates. Small, well-factored pieces are what let a small team move like a big one.$body$,
    array['Full-Stack', 'DevOps', 'Architecture'],
    4,
    '2026-06-28'
  )
on conflict (slug) do nothing;
