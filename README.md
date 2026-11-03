# James Moyosore — Portfolio

A scrolling, interactive portfolio site built with **React + Vite**, **Tailwind CSS**, and **shadcn/ui**-style components, with light/dark theming, a ⌘K search, plus a standalone Supabase-backed **blog** and a password-protected **admin editor** for writing posts.

## Tech stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (design tokens for theming)
- **shadcn/ui** component primitives (Button, Card, Badge) — hand-included in `src/components/ui/`, so you own the code
- **Supabase** — Postgres + Auth, powering the blog and admin editor
- **lucide-react** icons
- Deployed on **Vercel** → `moyosorejames.com`

## Getting started

```bash
npm install
cp .env.example .env   # fill in your Supabase project URL + anon key
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

Without a `.env`, the home page still works — only the blog (`#blog`) and admin editor (`#admin`) need Supabase, and `src/lib/supabase.js` warns in the console if the env vars are missing.

See **[supabase/README.md](./supabase/README.md)** for setting up the `posts` table, RLS policies, and an admin login.

## Project structure

```
src/
├── App.jsx                      # routes between the home page, blog, and admin
├── main.jsx                     # React entry
├── index.css                    # Tailwind + theme tokens (light/dark)
├── data/
│   ├── content.js                # ← everything on the home page, from the CV (edit this)
│   └── posts.js                  # Supabase-backed blog CRUD (fetchPosts, createPost, updatePost, deletePost, ...)
├── hooks/                        # theme, routing, templates drawer, site events
├── lib/
│   ├── site.js                    # lets search and hero links drive the sections
│   ├── utils.js                   # cn() classname helper
│   └── supabase.js                # Supabase client, built from env vars
├── pages/                        # Blog, BlogPost, Admin
└── components/
    ├── ui/                        # shadcn primitives: button, card, badge
    ├── site/                      # Nav, CommandPalette, Hero, Laptop, Onboarding, Work, FileFlow, HowIWork, LlmLab,
    │                                Skills, CvSection, Contact
    ├── Drawer.jsx, TemplatesDrawer.jsx, Markdown.jsx, PageShell.jsx, Reveal.jsx, ThemeToggle.jsx
```

## Customizing content

Everything on the home page is driven from **`src/data/content.js`**, which mirrors the CV in `public/JamesMoyosoreCV.pdf`. To swap the CV, replace the PDF and update `profile.links.cv`.

Blog content is **not** in `content.js` — it lives in Supabase and is written through the admin editor (see `supabase/README.md`).

### Project screenshots

1. Take a 1440×900 screenshot of the live site.
2. Save it as `public/previews/<host>.jpg`.
3. Point that project's `previews` entry in `content.js` at it.

## Deployment

See **[DEPLOY.md](./DEPLOY.md)** for step-by-step Vercel + custom-domain (`moyosorejames.com`) instructions. Vercel also needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set as environment variables for the blog/admin to work in production.
