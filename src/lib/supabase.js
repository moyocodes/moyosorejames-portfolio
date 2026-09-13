import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// createClient throws synchronously on a missing/empty URL, which — run at
// module load — would crash the entire app before React mounts. Missing env
// vars means the blog/admin features are unavailable, not that the whole
// portfolio should go down, so fall back to a null client and let callers
// (Blog.jsx, Admin.jsx) handle the "not configured" case.
if (!url || !anonKey) {
  console.warn(
    'Supabase env vars are missing — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see .env.example). Blog/admin features are disabled until then.'
  )
}

export const supabase = url && anonKey ? createClient(url, anonKey) : null
