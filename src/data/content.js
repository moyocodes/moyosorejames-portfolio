// ============================================================================
//  PORTFOLIO CONTENT — James Moyosore
//  Facts come from the CV (public/JamesMoyosoreCV.pdf). Work history and details
//  of employer systems stay out of the site: it links to the CV instead.
//  Edit this file to update text, links, projects and skills.
// ============================================================================

export const profile = {
  name: 'James Moyosore',
  title: 'Technical founder and lead software developer',
  email: 'moyosorejames@gmail.com',
  phone: '+234 8061953109',
  // The one line beside the laptop. Keep it specific.
  line: 'I build and ship products, with AI where it earns its place.',
  links: {
    portfolio: 'https://moyosorejames.com',
    designPortfolio: 'https://www.canva.com/design/DAGgYoX5Hm0/bPtKpGVvsUrAqcGDQZK81A/view',
    github: 'https://github.com/moyocodes',
    linkedin: 'https://www.linkedin.com/in/james-moyosore-1aa550196',
    cv: '/JamesMoyosoreCV.pdf',
  },
}

// What the laptop's screen asks when it wakes up. An action's href of 'cv' opens the CV.
export const onboarding = [
  {
    key: 'hiring',
    label: 'I’m hiring',
    title: 'Good. Here’s the short version.',
    body: 'Technical founder and lead software developer. 5+ years shipping production systems, and a team of 6 led across 3 countries.',
    actions: [
      { label: 'View CV', href: 'cv' },
      { label: 'See what I’ve shipped', href: '#work' },
    ],
  },
  {
    key: 'project',
    label: 'I have a project',
    title: 'Tell me what you’re building.',
    body: 'Look through what I’ve built for other people, then send me yours.',
    actions: [
      { label: 'See the work', href: '#work' },
      { label: 'Get in touch', href: '#contact' },
    ],
  },
  {
    key: 'looking',
    label: 'Just looking around',
    title: 'Start with the fun part.',
    body: 'There’s a demo where you play an AI agent and my server refuses you.',
    actions: [
      { label: 'Try the demos', href: '#ai' },
      { label: 'See the work', href: '#work' },
    ],
  },
]

export const fileflow = {
  intro: 'That’s FileFlowHQ, the privacy-first suite I founded and build alone. Everything runs in your browser, so files never leave your device and server costs stay near zero. Try it: drag the file across.',
  products: [
    {
      name: 'The free tools',
      chip: '17 tools, free',
      body: 'Convert images and HEIC, shrink to a target size, merge and split PDFs, swap PDF and Word, scan documents. On the web, as a PWA and in Chrome.',
      src: '/previews/fileflowhq.com.jpg',
      url: 'https://fileflowhq.com',
      grad: ['#d3efe6', '#7fc2b0'],
    },
    {
      name: 'FileFlowHQ Studio',
      chip: 'Rust + WebAssembly',
      body: 'In-browser editors for PDFs, photos, video, documents, slides and spreadsheets. Free for now.',
      src: '/previews/studio.fileflowhq.com.jpg',
      url: 'https://studio.fileflowhq.com',
      grad: ['#d9e4f2', '#7f9bd6'],
    },
    {
      name: 'The Chrome extension',
      chip: 'In the Web Store',
      body: 'The file tools, one click away in your browser.',
      src: '/previews/chrome-extension.jpg',
      url: 'https://chromewebstore.google.com/detail/gjfjbeejnohhebifklghhhmdgjgbcbmf',
      grad: ['#f6d9cc', '#e39f85'],
    },
  ],
  video: {
    src: '/launch-720.mp4',
    poster: '/previews/launch-poster.jpg',
    title: 'The launch film',
    body: '38 seconds on what it does and why your files never leave.',
  },
  analytics: {
    name: 'The analytics I built for it',
    chip: 'Cookie-free',
    body: 'No third-party tracker. My own dashboard counts views, files and downloads without cookies or stored IPs, on a handful of serverless functions.',
    src: '/previews/fileflow-analytics.jpg',
    grad: ['#f5ead0', '#dba94f'],
  },
  links: [
    { label: 'Open FileFlowHQ', url: 'https://fileflowhq.com' },
    { label: 'Open Studio', url: 'https://studio.fileflowhq.com' },
    { label: 'Add to Chrome', url: 'https://chromewebstore.google.com/detail/gjfjbeejnohhebifklghhhmdgjgbcbmf' },
    { label: 'npm package', url: 'https://www.npmjs.com/package/@fileflowhq/tools' },
  ],
}

// The pinned "How I work" section. `rows` fill the floating panel beside each step.
export const workSteps = [
  {
    title: 'Map it first.',
    body: 'I sit with stakeholders and draw the workflow out, with flowcharts, system diagrams and ER models, before anyone writes code.',
    chip: 'Before any code',
    grad: ['#d8ece4', '#9fb8d8'],
    rows: ['Map the workflow together', 'Draw the system and ER model', 'Then write the first line'],
  },
  {
    title: 'Build all of it.',
    body: 'One person, one feature, every layer. I design the API, handle auth and payments, and finish the screen people actually use.',
    chip: 'End to end',
    grad: ['#f6dcc9', '#d6bfe0'],
    rows: ['API and database', 'Auth and role-based access', 'Paystack and Flutterwave', 'The UI people touch'],
  },
  {
    title: 'Put models to work.',
    body: 'Claude tool use, self-hosted fine-tuned models and hybrid routing, inside real products. And the server always checks what they say.',
    chip: 'LLMs in production',
    grad: ['#d3dcf5', '#7f9bd6'],
    rows: ['Self-hosted Ollama for the easy ones', 'Claude for anything risky', 'Server checks before anything saves'],
  },
  {
    title: 'Ship it and keep it fast.',
    body: 'CI/CD on AWS, Vercel, Render and DigitalOcean, then the slow work of making it quicker. Caching and query tuning cut load times by 30%.',
    chip: '30% faster',
    grad: ['#f3e6d3', '#dba94f'],
    rows: ['CI/CD pipelines', 'Caching and query tuning', 'Load times down 30%'],
  },
]

export const projects = [
  {
    name: 'Nudgy',
    meta: 'Built in 10 days',
    grad: ['#dcebd9', '#8fb8a0'],
    summary: 'Say everything on your mind, out loud or typed. Nudgy sorts it into reminders and pesters you until they’re done.',
    role: 'Founder and only engineer. Ten days from empty repo to live, after being selected for the Meta Global AI Developer Hackathon (Cerebral Valley, remote, Oct–Nov 2026).',
    highlights: [
      'A whole cast of Meta models, with a switch and a backup: Muse Spark, open-weights Muse Spark Open on Baseten or Modal, and Muse Voice Transcribe. SAM 3.1 handles photo proof. Muse Wonder and Muse Image draw the badges.',
      '“Plan my day” is an agent that takes one tool per step. Offer a past, sleep-hour or clashing time and the server refuses, so it has to try again. Undo reverses the whole run.',
      'Nudgy can’t brag about a reminder it never made, because every confirmation is built from what was really saved.',
    ],
    stack: ['React 19', 'Express', 'Postgres', 'Render', 'Meta Model API'],
    url: 'https://getnudged.chat',
    previews: [{ label: 'Nudgy', src: '/previews/getnudged.chat.jpg', host: 'getnudged.chat' }],
  },
  {
    name: 'linqsafe',
    meta: 'Paid in naira',
    grad: ['#f6d9cc', '#e39f85'],
    summary: 'One link for your whole online life, with 8 templates, 5 themes and analytics built in.',
    role: 'Founder and builder.',
    highlights: [
      'Pay in naira, through Paystack, for only the features you want. AI can write your bio too.',
      'Behind the scenes, my admin console tracks growth, revenue, traffic, and fraud and risk.',
      'GitHub Actions ships every release.',
    ],
    stack: ['React', 'Vite', 'Tailwind', 'Node / Express', 'MySQL', 'GitHub Actions'],
    url: 'https://linqsafe.com',
    previews: [{ label: 'linqsafe', src: '/previews/linqsafe.com.jpg', host: 'linqsafe.com' }],
  },
  {
    name: 'TourFinderApp',
    meta: 'Two models, one chat',
    grad: ['#d9e4f2', '#7f9bd6'],
    summary: 'Ask it where to eat, what to see, how to get around, where to stay and what’s safe.',
    role: 'Builder. It started life as “Mobot”, my final-year project at Bowen University, and I rebuilt it from there.',
    highlights: [
      'Two models, one chat. A self-hosted, fine-tuned Ollama model takes the simple questions. Claude takes anything safety-critical, time-sensitive or about finding a place.',
      'To find places, Claude loops through tools: OpenStreetMap, optionally Google Places, with web search to fall back on.',
      'It knows roughly where you are from your IP, remembers your sessions and meters free-plan usage.',
    ],
    stack: ['Python / FastAPI', 'Claude API', 'Ollama', 'OpenStreetMap'],
    url: 'https://tourfinder.app',
    previews: [{ label: 'TourFinderApp', src: '/previews/tourfinder.app.jpg', host: 'tourfinder.app' }],
  },
  {
    name: 'FileFlowHQ',
    meta: '17 free tools',
    grad: ['#d3efe6', '#7fc2b0'],
    summary: 'File tools that never see your files. All the work happens inside your own browser.',
    role: 'Founder and only engineer.',
    highlights: [
      '17 tools, all free: convert images and HEIC, shrink to a target size, merge, split and compress PDFs, swap PDF and Word, hear a PDF read aloud, scan documents and QR codes, tidy CSV and JSON. Use them on the web, as a PWA or from the Chrome extension.',
      'Studio adds PDF, photo, video, document, slide and spreadsheet editors that run in the browser on Rust and WebAssembly. It’s free for now.',
      'Server costs stay near zero. The backend is a few Vercel functions (Paystack, Resend, Upstash Redis) and my own cookie-free analytics.',
      'Send a photo to the WhatsApp bot and a PDF comes back. It runs on the Meta Cloud API with signature-verified webhooks.',
      'The core is open source as @fileflowhq/tools (MIT). Its CLI drops ready-made React components into your project.',
    ],
    stack: ['Rust / WebAssembly', 'React', 'Vercel Serverless', 'Paystack', 'Resend', 'Upstash Redis', 'WhatsApp Cloud API'],
    url: 'https://fileflowhq.com',
    links: [
      { label: 'Studio', url: 'https://studio.fileflowhq.com' },
      { label: 'npm package', url: 'https://www.npmjs.com/package/@fileflowhq/tools' },
    ],
    previews: [
      { label: 'Free tools', src: '/previews/fileflowhq.com.jpg', host: 'fileflowhq.com' },
      { label: 'Studio', src: '/previews/studio.fileflowhq.com.jpg', host: 'studio.fileflowhq.com' },
    ],
  },
  {
    name: 'MAD — Mindfully Articulated Design',
    meta: 'Live-edit CMS',
    grad: ['#f5ead0', '#dba94f'],
    shortName: 'MAD',
    summary: 'A custom CMS and content platform for a product, marketing and design firm.',
    role: 'Built in Node.js. It also runs their agency site.',
    highlights: [
      'The team edits pages live, from a custom admin and CMS panel behind session login.',
      'Images go straight to DigitalOcean Spaces.',
      'Bitbucket Pipelines deploys it to DigitalOcean App Platform.',
    ],
    stack: ['Node.js', 'Custom CMS', 'DigitalOcean', 'Bitbucket Pipelines'],
    url: 'https://mad-peach.vercel.app',
    previews: [{ label: 'MAD', src: '/previews/mad-peach.vercel.app.jpg', host: 'mad-peach.vercel.app' }],
  },
  {
    name: 'Volasec',
    meta: 'SOC 2 and ISO 27001',
    grad: ['#e9e6dd', '#a9a595'],
    summary: 'A multi-page website that turns visitors into enquiries for a security and compliance consultancy.',
    role: 'Their services include SOC 2, ISO 27001, cloud security architecture and risk assessments.',
    highlights: ['Each service gets clear, structured messaging.', 'It works on any screen and carries proper SEO metadata.'],
    stack: ['Responsive UI', 'SEO metadata', 'Conversion design'],
    url: 'https://volasec.com',
    previews: [{ label: 'Volasec', src: '/previews/volasec.com.jpg', host: 'volasec.com' }],
  },
  {
    name: 'Abánítúnráse',
    meta: 'Shop and bookings',
    grad: ['#f6dbe3', '#d9a0c0'],
    summary: 'Shop and book a styling house online, from bridal and occasion looks to Kájáyelo travel wardrobes.',
    role: 'The full store and booking system, plus a custom dashboard to run it.',
    highlights: [
      'Every Paystack payment gets verified on the server.',
      'Uploads to Cloudinary are signed, and Resend sends the email.',
      'New activity also pings over the WhatsApp Cloud API.',
    ],
    stack: ['Paystack', 'Cloudinary', 'Resend', 'WhatsApp Cloud API'],
    url: 'https://abanitunrase.com',
    previews: [{ label: 'Abánítúnráse', src: '/previews/abanitunrase.com.jpg', host: 'abanitunrase.com' }],
  },
  {
    name: 'Chi Farms',
    meta: 'Poultry and aquaculture',
    grad: ['#e4efd0', '#9dbb6d'],
    summary: 'A corporate site for a vertically integrated poultry and aquaculture company, built to show the scale of its operation.',
    role: 'Landing page, built from modular components.',
    highlights: [
      'Modular UI that puts the company’s operational scale up front.',
      'Resend handles email, and the build carries proper SEO.',
    ],
    stack: ['React', 'Node.js', 'Tailwind CSS', 'Resend', 'SEO'],
    url: 'https://chi-farms.com',
    previews: [{ label: 'Chi Farms', src: '/previews/chi-farms.com.jpg', host: 'chi-farms.com' }],
  },
]

// Sample inputs for the two demos in the AI section. They illustrate rules stated
// in the CV; the demos don't call any model.
export const routerSamples = [
  {
    question: 'What are the best local dishes to try?',
    kind: 'Simple',
    target: 'ollama',
    why: 'An easy one, so it stays on my own fine-tuned model.',
  },
  {
    question: 'Is this area safe to walk through at night?',
    kind: 'Safety',
    target: 'claude',
    why: 'A wrong answer could hurt someone, so Claude takes it.',
  },
  {
    question: 'Is the museum open right now?',
    kind: 'Time-sensitive',
    target: 'claude',
    why: 'The answer depends on the moment, so Claude takes it.',
  },
  {
    question: 'Find me a pharmacy near here.',
    kind: 'Place lookup',
    target: 'claude',
    tool: true,
    why: 'Claude goes looking, with OpenStreetMap tools first and web search as the fallback.',
  },
]

export const agentAttempts = [
  { time: 'Yesterday, 4:00 pm', ok: false, rule: 'in the past', reason: 'That moment has gone.' },
  { time: 'Tonight, 3:00 am', ok: false, rule: 'sleep hours', reason: 'Nobody should get nudged then.' },
  { time: 'Today, 2:00 pm', ok: false, rule: 'clash', reason: '“Team call” already has that slot.' },
  { time: 'Tomorrow, 10:00 am', ok: true },
]

export const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Material UI', 'Framer Motion', 'Rust / WebAssembly'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'Laravel', 'PHP', 'Python (FastAPI)', 'REST', 'GraphQL', 'MySQL', 'Postgres', 'Firebase', 'Supabase'] },
  { category: 'AI and LLMs', items: ['Claude API and tool use', 'Self-hosted, fine-tuned Ollama', 'Hybrid routing', 'OpenAI API', 'Meta Model API', 'Dialogflow'] },
  { category: 'DevOps', items: ['AWS', 'Vercel', 'Render', 'DigitalOcean', 'Cloudflare', 'Nginx', 'Docker', 'CI/CD', 'Bitbucket Pipelines', 'GitHub Actions'] },
  { category: 'Mobile and testing', items: ['Capacitor', 'Flutter', 'Jest', 'Vitest', 'React Testing Library'] },
  { category: 'Integrations', items: ['Paystack', 'Flutterwave', 'WhatsApp Cloud API', 'Cloudinary', 'Resend', 'Mailgun', 'Google Maps', 'MapLibre GL', 'OpenStreetMap'] },
  { category: 'Business systems', items: ['Custom ERP', 'Procurement', 'Inventory and assets', 'HR and leave', 'Approval chains', 'Invoicing'] },
  { category: 'Content and SEO', items: ['Custom CMS and admin panels', 'WordPress', 'On-page SEO', 'JSON-LD', 'Prerendering', 'Google Analytics'] },
  { category: 'Design', items: ['UI / UX', 'Brand design', 'Google Stitch', 'v0', 'Canva'] },
]

export const education = {
  degree: 'B.Sc. Computer Science & Information Technology',
  honours: 'Second Class Upper Honours',
  school: 'Bowen University, Iwo',
  period: '2016 – 2020',
  extras: [
    'Social Director of the Computer Science Department (2019 – 2020)',
    'Built Mobot, a tourist guide chatbot for Ibadan, in Flutter and Dialogflow for my final-year project',
  ],
}

export const certifications = [
  { name: 'Google AI Professional Certificate (8 courses)', by: 'Google | Coursera, October 2026' },
  { name: 'Meta Full Stack Developer: Front-End & Back-End from Scratch Specialization', by: 'Meta | Coursera, 2026' },
  { name: 'Introduction to Front-End Development', by: 'Meta | Coursera, 2026' },
  { name: 'Institute of Personal Development and Customer Relationship Management (IPCDRM)', by: 'Qatar, 2025' },
  { name: 'National Youth Service Corps (NYSC)', by: 'Service completed March 2022' },
  { name: 'Cisco Certified Network Associate', by: 'Online training certificate of completion, August 2020' },
]

// ============================================================================
//  TEMPLATES FOR SALE — links go to your Selar / Gumroad product pages.
// ============================================================================
export const templates = [
  {
    name: 'Lumen — Photography Landing',
    tagline: 'A landing page that helps photographers and studios win bookings.',
    price: '$29',
    priceNote: 'one-time',
    store: 'Gumroad',
    buyUrl: 'https://moyosore45.gumroad.com/l/lumenphotographylanding',
    previewUrl: 'https://moyosore45.gumroad.com/l/lumenphotographylanding',
    featured: true,
    features: [
      'A gallery that fits any screen',
      'A contact section ready for bookings',
      'Quick to load and set up for SEO',
      'Colours and content you can change easily',
    ],
  },
  {
    name: 'LUMEN — Photography Portfolio & Booking Site',
    tagline: 'A full portfolio and booking site for freelance photographers who take bookings on WhatsApp.',
    description:
      'You get the same site twice. One is React 19, Vite and Tailwind CSS v4, for developers who want components. The other is plain HTML, CSS and JavaScript with no dependencies or build step, so you can just open it.',
    price: 'View',
    priceNote: 'on Selar',
    store: 'Selar',
    buyUrl: 'https://selar.com/2fq8zr41q6',
    previewUrl: 'https://selar.com/2fq8zr41q6',
    features: [
      'A scroll-driven hero with a rotating photo collage',
      'A film-strip gallery that moves as you scroll',
      'Light and dark modes, with a prompt inviting visitors to switch',
      'Packages with WhatsApp booking links already filled in',
      'A booking policy and fold-out FAQ',
      'Testimonials with star ratings',
      'A WhatsApp chat button and rate card that stay in reach',
      'Works on any screen, with a custom cursor and smooth reveals',
      'Rebrand in minutes, since each version keeps business details in one config file',
      'Full source for both versions, sample content, free stock photos and a README',
    ],
    requirements: 'The React version needs Node.js and npm. The HTML version just needs a browser.',
  },
]

// Admin access to the blog editor (/admin) is handled by Supabase Auth —
// see src/pages/Admin.jsx and supabase/schema.sql.
