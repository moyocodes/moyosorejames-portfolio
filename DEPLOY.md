# Deploying to Vercel → moyosorejames.com

This guide takes you from local code to a live site at **moyosorejames.com**.

## 1. Push the code to GitHub

```bash
git add -A
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/moyoportfolio.git
git push -u origin main
```

## 2. Import into Vercel

1. Go to **https://vercel.com/new** and sign in with GitHub.
2. Select the `moyoportfolio` repository → **Import**.
3. Vercel auto-detects Vite. Confirm the settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` — from Supabase → Project Settings → API
   - `VITE_SUPABASE_ANON_KEY` — the `anon`/`public` key from the same page
5. Click **Deploy**. You'll get a `*.vercel.app` URL in ~1 minute.

The included `vercel.json` rewrites all routes to `/` so the single-page app works on refresh/deep links.

See [supabase/README.md](supabase/README.md) for setting up the blog database.

## 3. Connect the custom domain

You need to own **moyosorejames.com** (via Namecheap, GoDaddy, Google Domains, etc.).

1. In your Vercel project → **Settings → Domains**.
2. Add `moyosorejames.com` **and** `www.moyosorejames.com`.
3. Vercel shows the DNS records to add. Choose one:

   **Option A — Point DNS at Vercel (keep your registrar):**
   At your domain registrar's DNS settings, add:

   | Type  | Name  | Value                   |
   |-------|-------|-------------------------|
   | A     | `@`   | `76.76.21.21`           |
   | CNAME | `www` | `cname.vercel-dns.com`  |

   **Option B — Use Vercel nameservers:**
   Set your registrar's nameservers to the ones Vercel lists (fully delegates DNS to Vercel).

4. Wait for DNS to propagate (minutes to a few hours). Vercel auto-issues an SSL certificate.
5. Set `moyosorejames.com` as the **Primary Domain** (redirect `www` → apex, or vice-versa).

## 4. Verify

- Visit **https://moyosorejames.com** — HTTPS padlock should be present.
- Test the theme toggle, project previews, and the contact form.
- Every push to `main` now auto-deploys.

## Alternative: deploy from the CLI

```bash
npm i -g vercel
vercel            # first run: links/creates the project, deploys a preview
vercel --prod     # deploy to production
vercel domains add moyosorejames.com
```

---

**Note:** The exact A/CNAME values shown in the Vercel dashboard are authoritative — if they differ from the table above, use the dashboard's values.
