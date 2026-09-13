# Blog backend (Supabase)

The blog reads/writes from a single `posts` table in Supabase, protected by
row-level security: anyone can read published posts, only a signed-in user
can create, edit, delete, or read drafts.

## Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** → **New query**, paste the contents of
   [`schema.sql`](./schema.sql), and run it. This creates the `posts` table,
   its RLS policies, and seeds the two starter posts.
3. Go to **Authentication → Users → Add user** and create your admin login
   (email + password). This is the account you'll sign in with at `/admin`.
4. Go to **Project Settings → API** and copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`
5. Locally, copy `.env.example` to `.env` and fill in those two values.
   On Vercel, add them under **Project Settings → Environment Variables**.

## How it works

- `src/lib/supabase.js` creates the Supabase client from the env vars above.
- `src/data/posts.js` has the read/write helpers (`fetchPosts`,
  `fetchPostBySlug`, `createPost`, `updatePost`, `deletePost`).
- `/blog` and `/blog/:slug` only ever fetch `published = true` posts (allowed
  for anonymous visitors by RLS).
- `/admin` requires a Supabase Auth session. Once signed in, you get a full
  list/create/edit/delete UI backed directly by the `posts` table — no more
  copy-pasting objects into source and redeploying.

The anon key is safe to ship to the browser — it only grants what the RLS
policies in `schema.sql` allow (public read of published posts; writes
require `authenticated`).
