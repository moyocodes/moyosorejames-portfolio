# James Moyosore — Portfolio

A fast, modern portfolio site built with **React + Vite**, **Tailwind CSS**, and **shadcn/ui**-style components. Features a light/dark theme toggle, animated hero, project showcase with live links and previews, an experience timeline, and a working (mailto-based) contact form.

## Tech stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (design tokens for theming)
- **shadcn/ui** component primitives (Button, Card, Badge) — hand-included in `src/components/ui/`, so you own the code
- **lucide-react** icons
- Deployed on **Vercel** → `moyosorejames.com`

## Getting started

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
├── App.jsx                 # assembles all sections
├── main.jsx                # React entry
├── index.css               # Tailwind + theme tokens (light/dark)
├── data/content.js         # ← ALL your content lives here (edit this)
├── hooks/useTheme.js       # light/dark theme logic
├── lib/utils.js            # cn() classname helper
└── components/
    ├── ui/                 # shadcn primitives: button, card, badge
    ├── Navbar.jsx
    ├── Hero.jsx
    ├── About.jsx
    ├── Skills.jsx
    ├── Experience.jsx
    ├── Projects.jsx        # cards + live links + preview lightbox
    ├── ProjectPreview.jsx  # generated graphic / screenshot preview
    ├── Contact.jsx
    ├── Footer.jsx
    ├── Section.jsx         # shared section wrapper
    └── ThemeToggle.jsx
```

## Customizing content

Everything is driven from **`src/data/content.js`**. Search that file for `TODO` to find values you should replace:

- **Social links** — GitHub, LinkedIn, design portfolio URLs (`profile.links`)
- **Project links** — each project's `liveUrl` (currently `#` placeholders)
- **Project previews** — set a project's `previewUrl` to a screenshot to replace the generated gradient graphic (see below)

### Adding real project screenshots

1. Take a screenshot of the live site (e.g. 1600×1000).
2. Drop it in `public/` — e.g. `public/previews/fantasy-showdown.png`.
3. In `content.js`, set that project's `previewUrl: '/previews/fantasy-showdown.png'`.

Until you do, each card shows a clean generated gradient graphic, so the site looks complete right away.

## Deployment

See **[DEPLOY.md](./DEPLOY.md)** for step-by-step Vercel + custom-domain (`moyosorejames.com`) instructions.
