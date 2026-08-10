// ============================================================================
//  BLOG POSTS — real content, committed to the repo (so it's live for everyone).
//
//  To publish a new post:
//    1. Write it in the admin editor at #/admin (password-gated) and click
//       "Export post" — or just add an object to the array below by hand.
//    2. Paste the exported object into this array.
//    3. Commit & push. Vercel redeploys and the post goes live.
//
//  `body` is Markdown-ish: blank lines separate paragraphs, lines starting
//  with "## " become subheadings, and "- " lines become bullet points.
// ============================================================================

export const posts = [
  {
    slug: 'building-ai-into-production',
    title: 'Building AI Features Into Production Systems',
    excerpt:
      'How I approach integrating LLMs into real products without giving up ownership of architecture and code quality.',
    date: '2026-07-15',
    tags: ['AI', 'Engineering', 'LLMs'],
    readingMinutes: 5,
    body: `Integrating AI into a product is less about the model and more about the seams around it.

## Start with the workflow, not the model

The best AI features I've shipped began as a boring question: where is a human doing repetitive judgment work? That's where an LLM earns its place — drafting content, structuring messy input, summarizing long threads for an admin.

## Keep ownership of the system

Tools like Claude and Copilot make me faster, but the architecture is still mine. I use AI to scaffold endpoints and work through infra decisions, then review every line like I would a teammate's PR.

- Design the API contract first
- Let the model draft the implementation
- Verify, test, and own the result

## Ship, measure, iterate

AI features are probabilistic. Log inputs and outputs, watch the edges, and tighten prompts against real usage. That feedback loop is where a demo becomes a product.`,
  },
  {
    slug: 'shipping-full-stack-end-to-end',
    title: 'Shipping Full-Stack Products End to End',
    excerpt:
      'Notes from owning delivery across frontend, backend, and DevOps — and keeping the contracts consistent.',
    date: '2026-06-28',
    tags: ['Full-Stack', 'DevOps', 'Architecture'],
    readingMinutes: 4,
    body: `Owning a product end to end means the frontend and backend can never drift apart.

## One contract, both sides

When I build a feature, I design the API contract before writing either side. The frontend and backend then implement against the same shape, which kills a whole category of integration bugs.

## DevOps is part of the feature

A feature isn't done when it works on my machine — it's done when it deploys cleanly through CI/CD to AWS, Vercel, or Render. Treating deployment as part of the work, not an afterthought, is what makes shipping fast and boring in the best way.

## Reuse compounds

Modular components and reusable hooks aren't just tidy — they cut load times and issue rates. Small, well-factored pieces are what let a small team move like a big one.`,
  },
]
