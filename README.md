# James Moyosore — Portfolio

A full-screen "deck" portfolio site built with **React + Vite**, **Tailwind CSS**, and **shadcn/ui**-style components. Navigate panel-by-panel (Home, About, Skills, Experience, AI Workflow, Work, Templates, Contact) with light/dark theming, plus a standalone Supabase-backed **blog** and a password-protected **admin editor** for writing posts.

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

Without a `.env`, the deck (Home/About/Skills/Experience/Work/etc.) still works — only the blog (`#blog`) and admin editor (`#admin`) need Supabase, and `src/lib/supabase.js` warns in the console if the env vars are missing.

See **[supabase/README.md](./supabase/README.md)** for setting up the `posts` table, RLS policies, and an admin login.

## Project structure

```
src/
├── App.jsx                      # routes between the deck, blog, and admin
├── main.jsx                     # React entry
├── index.css                    # Tailwind + theme tokens (light/dark)
├── data/
│   ├── content.js                # ← profile, skills, experience, projects, templates, AI workflow (edit this)
│   └── posts.js                  # Supabase-backed blog CRUD (fetchPosts, createPost, updatePost, deletePost, ...)
├── hooks/
│   ├── useTheme.js                # light/dark theme logic
│   ├── useHashRoute.js            # hash-based routing (deck panels, #blog, #admin)
│   ├── useAutoRotate.js           # auto-advance between deck panels
│   └── useRequestedProject.js
├── lib/
│   ├── utils.js                   # cn() classname helper
│   └── supabase.js                # Supabase client, built from env vars
├── pages/
│   ├── Blog.jsx                   # published-posts list (#blog)
│   ├── BlogPost.jsx                # single post view (#blog/:slug)
│   └── Admin.jsx                   # password-protected post editor (#admin)
└── components/
    ├── ui/                        # shadcn primitives: button, card, badge
    ├── deck/Deck.jsx, Panel.jsx    # full-screen panel carousel engine
    ├── panels/                     # HeroPanel, AboutPanel, SkillsPanel, ExperiencePanel,
    │                                 AiWorkflowPanel, ProjectsPanel, TemplatesPanel, ContactPanel
    ├── mock/                       # device/UI mockups used in panels
    ├── DeckNavbar.jsx, Drawer.jsx, Markdown.jsx, PageShell.jsx, Reveal.jsx, ThemeToggle.jsx
```

## Customizing content

Everything about the deck panels is driven from **`src/data/content.js`**: `profile`, `whatICanDo`, `skills`, `experience`, `projects`, `templates`, `aiWorkflow`, and `education`. Search that file for `TODO` to find values you should replace:

- **Social links** — GitHub, LinkedIn, design portfolio URLs (`profile.links`)
- **Project links** — each project's `liveUrl`
- **Project previews** — set a project's `previewUrl` to a screenshot to replace the generated gradient graphic (see below)

Blog content is **not** in `content.js` — it lives in Supabase and is written through the `#admin` editor (see `supabase/README.md`).

### Adding real project screenshots

1. Take a screenshot of the live site (e.g. 1600×1000).
2. Drop it in `public/` — e.g. `public/previews/fantasy-showdown.png`.
3. In `content.js`, set that project's `previewUrl: '/previews/fantasy-showdown.png'`.

Until you do, each card shows a clean generated gradient graphic, so the site looks complete right away.

## Deployment

See **[DEPLOY.md](./DEPLOY.md)** for step-by-step Vercel + custom-domain (`moyosorejames.com`) instructions. Vercel also needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set as environment variables for the blog/admin to work in production.
