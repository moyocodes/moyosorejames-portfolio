// ============================================================================
//  PORTFOLIO CONTENT — James Moyosore
//  Edit this file to update text, links, projects, skills, and experience.
//  TODO markers indicate values you should replace with real URLs/assets.
// ============================================================================

export const profile = {
  name: 'James Moyosore',
  title: 'Full-Stack Software Developer',
  tagline: 'Backend, DevOps & CMS · ERP & Business Systems · AI-Integrated Engineering',
  location: 'Lagos, Nigeria',
  email: 'moyosorejames@gmail.com',
  phone: '(+234) 8061953109',
  summary:
    'Full-stack software developer with 5+ years of experience building and shipping production web systems across backend, frontend, DevOps and CMS. Lead Software Developer at Tizeti Network Limited, leading development of Tizeti OS — an in-house ERP spanning 18 departments across a multi-country operation — and owning full-stack delivery across Hotspot / Express Wi-Fi, WiFiCall, Free Fiber Africa and Tizeti Cloud.',
  summaryLong:
    'Works across React, Next.js, Vue.js and TypeScript on the front end and Node.js, PHP (including Laravel), Python (FastAPI) and MySQL on the back end, with CI/CD on AWS, Vercel, Render and DigitalOcean. Has led a team of 6 developers across 3 countries. Also integrates LLMs (Claude API with tool use, self-hosted Ollama models, OpenAI) into real products and ships own products such as FileFlowHQ and TourFinderApp.',
  links: {
    portfolio: 'https://moyosorejames.com',
    designPortfolio: 'https://www.canva.com/design/DAGgYoX5Hm0/bPtKpGVvsUrAqcGDQZK81A/view',
    github: 'https://github.com/moyocodes',
    linkedin: 'https://www.linkedin.com/in/james-moyosore-1aa550196',
    cv: '/James_Moyosore_CV.pdf',
  },
}

export const whatICanDo = [
  {
    title: 'Ship full-stack products end to end',
    description:
      'API design, database/ER modeling, authentication, payment integrations, role-based access, and responsive UI.',
    icon: 'Layers',
  },
  {
    title: 'Build ERP & business systems',
    description:
      'Procurement and requisition workflows, inventory and asset management, HR/leave, field-operations scheduling, and multi-level approval chains up to executive level.',
    icon: 'Briefcase',
  },
  {
    title: 'Integrate AI / LLM capabilities',
    description:
      'Claude API with tool use, self-hosted Ollama models, hybrid LLM routing, and AI-assisted workflows to speed up backend, frontend, and DevOps work.',
    icon: 'Sparkles',
  },
  {
    title: 'Build CMS & content systems',
    description:
      'CMS-style admin and content-management systems, including structured content modeling and editorial workflows.',
    icon: 'FileText',
  },
  {
    title: 'Own DevOps end to end',
    description:
      'CI/CD pipelines, deployments across AWS, Vercel, and Render, environment/config management, and performance/caching optimization.',
    icon: 'Server',
  },
  {
    title: 'Lead teams',
    description:
      'Mentor developers, run code reviews, and drive architecture and system-design decisions across multi-country, multi-product teams.',
    icon: 'Users',
  },
]

// icon: [library, iconName] — library is 'si' (react-icons/si, real brand logo)
// or 'lucide' (generic shape, used when no brand logo exists for the item).
export const skills = [
  {
    category: 'Frontend',
    icon: 'MonitorSmartphone',
    items: [
      { name: 'React.js', icon: ['si', 'SiReact'] },
      { name: 'Next.js', icon: ['si', 'SiNextdotjs'] },
      { name: 'Vue.js', icon: ['si', 'SiVuedotjs'] },
      { name: 'TypeScript', icon: ['si', 'SiTypescript'] },
      { name: 'JavaScript', icon: ['si', 'SiJavascript'] },
      { name: 'Tailwind CSS', icon: ['si', 'SiTailwindcss'] },
      { name: 'Bootstrap', icon: ['si', 'SiBootstrap'] },
      { name: 'Framer Motion', icon: ['si', 'SiFramer'] },
    ],
  },
  {
    category: 'Backend',
    icon: 'Server',
    items: [
      { name: 'Node.js', icon: ['si', 'SiNodedotjs'] },
      { name: 'Express', icon: ['si', 'SiExpress'] },
      { name: 'Laravel (PHP)', icon: ['si', 'SiLaravel'] },
      { name: 'Python (FastAPI)', icon: ['si', 'SiFastapi'] },
      { name: 'NestJS', icon: ['si', 'SiNestjs'] },
      { name: 'REST APIs', icon: ['lucide', 'Webhook'] },
      { name: 'GraphQL', icon: ['si', 'SiGraphql'] },
      { name: 'MySQL', icon: ['si', 'SiMysql'] },
      { name: 'Firebase', icon: ['si', 'SiFirebase'] },
      { name: 'Supabase', icon: ['si', 'SiSupabase'] },
    ],
  },
  {
    category: 'AI / LLM Integration',
    icon: 'Sparkles',
    items: [
      { name: 'Claude API & Tool Use', icon: ['si', 'SiClaude'] },
      { name: 'Ollama (self-hosted)', icon: ['si', 'SiOllama'] },
      { name: 'OpenAI API', icon: ['lucide', 'Bot'] },
      { name: 'Hybrid LLM Routing', icon: ['lucide', 'GitFork'] },
      { name: 'AI-Assisted Scaffolding', icon: ['lucide', 'Wand2'] },
      { name: 'GitHub Copilot', icon: ['si', 'SiGithubcopilot'] },
      { name: 'v0', icon: ['si', 'SiV0'] },
    ],
  },
  {
    category: 'DevOps & Deployment',
    icon: 'Cloud',
    items: [
      { name: 'AWS', icon: ['lucide', 'Cloud'] },
      { name: 'Vercel', icon: ['si', 'SiVercel'] },
      { name: 'Render', icon: ['si', 'SiRender'] },
      { name: 'DigitalOcean', icon: ['si', 'SiDigitalocean'] },
      { name: 'Nginx & SSL', icon: ['si', 'SiNginx'] },
      { name: 'Cloudflare', icon: ['si', 'SiCloudflare'] },
      { name: 'CI/CD', icon: ['lucide', 'GitPullRequest'] },
      { name: 'Git', icon: ['si', 'SiGit'] },
      { name: 'Performance & Caching', icon: ['lucide', 'Gauge'] },
    ],
  },
  {
    category: 'ERP & Business Systems',
    icon: 'Briefcase',
    items: [
      { name: 'Procurement & Requisitions', icon: ['lucide', 'ClipboardList'] },
      { name: 'Inventory & Assets', icon: ['lucide', 'Boxes'] },
      { name: 'HR / Leave Systems', icon: ['lucide', 'Users'] },
      { name: 'Field-Ops Scheduling', icon: ['lucide', 'CalendarClock'] },
      { name: 'Approval Chains', icon: ['lucide', 'GitMerge'] },
      { name: 'Invoicing', icon: ['lucide', 'Receipt'] },
    ],
  },
  {
    category: 'CMS & Workflows',
    icon: 'FileText',
    items: [
      { name: 'WordPress', icon: ['si', 'SiWordpress'] },
      { name: 'Content Modeling', icon: ['lucide', 'FileStack'] },
      { name: 'Admin Panels', icon: ['lucide', 'LayoutDashboard'] },
      { name: 'CMS Integration', icon: ['lucide', 'FileText'] },
    ],
  },
  {
    category: 'State, Mobile & Testing',
    icon: 'GitBranch',
    items: [
      { name: 'React Query', icon: ['si', 'SiReactquery'] },
      { name: 'Redux', icon: ['si', 'SiRedux'] },
      { name: 'Context API', icon: ['lucide', 'Boxes'] },
      { name: 'Capacitor (iOS/Android)', icon: ['si', 'SiCapacitor'] },
      { name: 'Flutter', icon: ['si', 'SiFlutter'] },
      { name: 'Jest', icon: ['si', 'SiJest'] },
      { name: 'Vitest', icon: ['si', 'SiVitest'] },
    ],
  },
]

export const experience = [
  {
    role: 'Lead Software Developer',
    company: 'Tizeti Network Limited',
    location: 'Lagos, Nigeria',
    period: '02/2025 – Present',
    current: true,
    points: [
      'Lead development of Tizeti OS, the in-house ERP spanning 18 departments across a multi-country operation; top contributor to the platform.',
      'Digitised procurement, requisition and leave approval workflows with multi-level approval chains up to executive level (CIO / COO).',
      'Built field-operations tooling (engineer scheduling, installation SLA tracking, automated PDF reports) and the fiber operations suite: customer management, wireless-to-fiber migration, splitter assignment and network mapping.',
      'Own full-stack delivery across Hotspot / Express Wi-Fi, WiFiCall and Free Fiber Africa, and built the Tizeti Cloud customer portal with live Paystack billing.',
      'Manage CI/CD and source control on AWS / Vercel / Render, with AI-assisted workflows for config, debugging and release checks.',
      'Mentor junior and mid-level developers; lead code reviews and architecture / ER-model discussions.',
      'Reduced load times by 30% through caching, reusable components and query optimisation.',
    ],
  },
  {
    role: 'Lead Frontend Developer',
    company: 'Tizeti Network Limited',
    location: 'Lagos, Nigeria',
    period: '12/2023 – 02/2025',
    points: [
      'Led a team of 6 developers digitalising departmental workflows on Tizeti OS across 3 countries (React, Vue, PHP, Tailwind CSS, Material UI).',
      'Built role-based access and KYC compliance workflows, secure authentication systems and payment gateways.',
      'Code reviews cut issue rates by 50%; ran the team’s Git workflow on AWS CodeCommit.',
      'Started the procurement module and built the leave-request flow with executive approvals.',
      'Took over freefiber.africa: signup flow, country-specific KYC and referral programme.',
      'Led product demos, technical documentation, and design / architecture discussions.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Tizeti Network Limited',
    location: 'Remote',
    period: '03/2022 – 12/2023',
    points: [
      'Built responsive web applications with React.js, Bootstrap, JavaScript, TypeScript and Tailwind CSS.',
      'Designed and implemented end-to-end secure payment gateways and user-facing dashboards; integrated Paystack with server-side verification.',
      'Maintained wifi.com.ng on WordPress and built its React signup and regional pricing flows.',
      'Partnered with designers and backend engineers on UI / UX consistency and API integration.',
      'Debugged and optimised applications, reducing issue rates by 30%.',
    ],
  },
  {
    role: 'NYSC Frontend Developer',
    company: 'Tizeti Network Limited',
    location: 'Remote',
    period: '03/2021 – 02/2022',
    points: [
      'Developed responsive applications using React.js, Redux, PHP and TypeScript.',
      'Implemented secure payment gateways and integrated REST APIs.',
      'Optimised debugging processes, reducing issue rates by 30%.',
      'Designed responsive email templates for bulk messaging.',
    ],
  },
  {
    role: 'Intern',
    company: 'Safe Complex Multi-Biz Limited',
    location: 'Ibadan, Nigeria (Remote)',
    period: '03/2019 – 09/2020',
    points: [
      'Developed and maintained responsive web applications using HTML, CSS and JavaScript.',
      'Built product showcase pages and digital branding assets.',
    ],
  },
]

// For each project:
//   liveUrl → the live/production site (TODO: fill in real URLs)
//   blurb   → one-line "what this system is" summary shown in the deck
//   screens → the switchable views a visitor can flip through in the mockup
export const projects = [
  {
    name: 'Mindfully Articulated',
    subtitle: 'CMS-Driven Content Platform',
    blurb: 'A content platform with a custom admin panel for structured publishing.',
    description:
      'Design-led website for MAD, a product, marketing and design firm. A Node.js content platform with a custom admin panel, live-edit CMS panel, session authentication and image uploads to DigitalOcean Spaces; deploys via Bitbucket Pipelines to DigitalOcean App Platform.',
    skills: ['React.js', 'Node.js', 'CMS Architecture', 'Admin Panel', 'Content Modeling'],
    liveUrl: 'https://mindfullyarticulated.com',
    scene: 'content',
    accent: '#7c3aed',
    featured: true,
    screens: [
      { key: 'read', label: 'Article', variant: 'content' },
      { key: 'admin', label: 'Admin', variant: 'dashboard' },
    ],
  },
  {
    name: 'FileFlowHQ',
    subtitle: 'Free Online File Converter',
    blurb: 'A free web utility that converts images, PDFs, and CSV/JSON right in the browser.',
    description:
      'Cross-platform file conversion suite, solo-built for web, iOS and Android, with 11 tools (image/PDF conversion and compression, merge/split PDF, PDF to Word, document scanner, QR/barcode scanner, CSV/JSON). Most processing is client-side for privacy and near-zero server cost; Vercel serverless functions for Adobe PDF Services and Mailjet.',
    skills: ['React.js', 'Capacitor', 'Vercel Serverless', 'Client-Side Processing', 'Adobe PDF Services'],
    liveUrl: 'https://fileflowhq.com',
    scene: 'dashboard',
    accent: '#0d9488',
    featured: true,
    screens: [
      { key: 'convert', label: 'Convert', variant: 'dashboard' },
      { key: 'home', label: 'Home', variant: 'landing' },
    ],
  },
  {
    name: 'Volasec',
    subtitle: 'Conversion-Focused Consulting Platform',
    blurb: 'A multi-page consulting site engineered to build authority and drive enquiries.',
    description:
      'Conversion-focused multi-page website for a security and compliance consultancy (SOC 2, ISO 27001, cloud security architecture, risk assessments), with structured service messaging, responsive layout and SEO metadata.',
    skills: ['React.js', 'Tailwind CSS', 'UI/UX Strategy', 'Conversion Architecture', 'Brand System'],
    liveUrl: 'https://volasec.com',
    scene: 'landing',
    accent: '#0ea5e9',
    screens: [
      { key: 'home', label: 'Landing', variant: 'landing' },
      { key: 'book', label: 'Booking', variant: 'booking' },
    ],
  },
  {
    name: 'Chi Farms',
    subtitle: 'Agro-Industrial Corporate Website',
    blurb: 'A corporate site for a poultry & aquaculture group, built on modular UI.',
    description:
      'Landing page for a vertically integrated poultry & aquaculture company, emphasizing operational scale and modular UI.',
    skills: ['React.js', 'Node.js', 'Tailwind CSS', 'Resend API', 'SEO', 'Modular Components'],
    liveUrl: 'https://chi-farms.com',
    scene: 'landing',
    accent: '#ea580c',
    screens: [
      { key: 'home', label: 'Home', variant: 'landing' },
      { key: 'story', label: 'Story', variant: 'content' },
    ],
  },
  {
    name: 'Abánítúnráse',
    subtitle: 'E-Commerce & Booking Platform',
    blurb: 'A styling-house store with product sales and appointment scheduling.',
    description:
      'E-commerce and booking platform for a styling house (bridal styling, occasion looks, Kájáyelo travel wardrobe curation): Paystack with server-side verification, Cloudinary signed uploads, Resend email, WhatsApp Cloud API notifications, a custom admin dashboard, online product sales and appointment scheduling.',
    skills: ['React.js', 'Tailwind CSS', 'Paystack', 'Cloudinary', 'WhatsApp Cloud API', 'Booking System'],
    liveUrl: 'https://abanitunrase.com',
    scene: 'shop',
    accent: '#db2777',
    screens: [
      { key: 'shop', label: 'Shop', variant: 'shop' },
      { key: 'book', label: 'Booking', variant: 'booking' },
    ],
  },
  {
    name: 'TourFinderApp',
    subtitle: 'AI Travel Guide',
    blurb: 'A conversational travel guide for any destination worldwide, backed by real place data.',
    description:
      'Conversational AI travel guide (food, landmarks, transport, safety, places to stay). Hybrid LLM routing on a Python / FastAPI backend: a self-hosted fine-tuned Ollama model for simple questions, Claude for safety-critical, time-sensitive and place-lookup queries. Claude tool-use loop for place search (OpenStreetMap, optionally Google Places) with web-search fallback, IP-based location, persistent sessions and free-plan usage metering. A rebuild of \u201cMobot\u201d, the Bowen University final-year project.',
    skills: ['React.js', 'FastAPI (Python)', 'Claude Tool Use', 'Ollama', 'Hybrid LLM Routing', 'OpenStreetMap'],
    liveUrl: 'https://tourfinderapp-eight.vercel.app',
    scene: 'content',
    accent: '#2563eb',
    featured: true,
    screens: [
      { key: 'chat', label: 'Chat', variant: 'content' },
      { key: 'places', label: 'Places', variant: 'dashboard' },
    ],
  },
  {
    name: 'Free Fiber Africa',
    subtitle: 'Customer Portal & Landing Page',
    blurb: 'A multilingual portal for fiber subscriptions, payments, and coverage maps.',
    description:
      'Multilingual platform for subscriptions, payments, Google Maps fiber coverage, wallet renewals, account switching, and subscription management.',
    skills: ['React.js', 'Tailwind CSS', 'Authentication', 'API Integration', 'i18n'],
    liveUrl: '', // TODO
    scene: 'dashboard',
    accent: '#2563eb',
    screens: [
      { key: 'portal', label: 'Portal', variant: 'dashboard' },
      { key: 'plans', label: 'Plans', variant: 'shop' },
    ],
  },
  {
    name: 'Neuro-app',
    subtitle: 'Proof-of-Completion Habit Tracker',
    blurb: 'A habit and task app where completion requires proof, not just a checkbox.',
    description:
      'A personal habit and task app that goes beyond a simple checklist — tasks require proof of completion (photo, GPS, or checklist) rather than a self-reported checkbox. Includes AI-assisted goal suggestions and an optional manager/team mode for assigning and verifying tasks across a team. Scheduled push reminders run on a low-overhead serverless architecture.',
    skills: ['React.js', 'Vite PWA', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'Push Notifications'],
    liveUrl: '', // TODO
    scene: 'dashboard',
    accent: '#f59e0b',
    screens: [
      { key: 'today', label: 'Today', variant: 'dashboard' },
      { key: 'task', label: 'Proof', variant: 'content' },
    ],
  },
]

// ============================================================================
//  TEMPLATES FOR SALE — links go to your Selar / Gumroad product pages.
// ============================================================================
export const templates = [
  {
    name: 'Lumen — Photography Landing',
    tagline: 'Elegant, conversion-focused landing page for photographers & studios.',
    price: '$29',
    priceNote: 'one-time',
    store: 'Gumroad',
    buyUrl: 'https://moyosore45.gumroad.com/l/lumenphotographylanding',
    previewUrl: 'https://moyosore45.gumroad.com/l/lumenphotographylanding',
    scene: 'gallery',
    accent: '#d97706',
    featured: true,
    features: [
      'Fully responsive gallery layout',
      'Booking-ready contact section',
      'Fast, SEO-optimized build',
      'Easy color & content customization',
    ],
    tags: ['React', 'Tailwind CSS', 'Landing Page'],
    screens: [
      { key: 'hero', label: 'Home', variant: 'gallery' },
      { key: 'grid', label: 'Portfolio', variant: 'shop' },
      { key: 'book', label: 'Contact', variant: 'booking' },
    ],
  },
  {
    name: 'Premium Template',
    tagline: 'A polished, production-ready template — grab it on Selar.',
    price: 'View',
    priceNote: 'on Selar',
    store: 'Selar',
    buyUrl: 'https://selar.com/2fq8zr41q6',
    previewUrl: 'https://selar.com/2fq8zr41q6',
    scene: 'landing',
    accent: '#4f46e5',
    features: [
      'Modern, responsive design',
      'Clean, reusable components',
      'Well-structured, documented code',
      'Deploy-ready in minutes',
    ],
    tags: ['React', 'Tailwind CSS'],
    screens: [
      { key: 'home', label: 'Landing', variant: 'landing' },
      { key: 'dash', label: 'Sections', variant: 'dashboard' },
    ],
  },
]

// Admin access to the blog editor (#/admin) is handled by Supabase Auth —
// see src/pages/Admin.jsx and supabase/schema.sql.

// ============================================================================
//  AI WORKFLOW — how I actually work with AI coding agents on production code.
//  Each entry: a real task, what the agent got wrong, and how I caught it.
// ============================================================================
export const aiWorkflow = {
  intro:
    'I use AI coding agents daily on production systems — but as a force multiplier, not an authority. The pattern is always the same: give it a documented spec, verify its output against reality, and push back when the "done" report does not match live testing.',
  splitNote:
    'Copilot for research and direction (competitor analysis, UI/UX — colours, layout, flow). Claude for build-out from documented specs. Recurring friction: agents default to a stack (e.g. TypeScript) without asking — so I verify the codebase itself rather than trusting the summary.',
  cases: [
    {
      competency: 'Hands-on use of AI coding agents',
      title: 'Tizeti Hotspot — slow Nigeria-tab load',
      icon: 'Gauge',
      body:
        'Diagnosed via the network tab that the API was fast but rendering was slow. Asked Claude to investigate; it found a hardcoded records-per-page limit (1000) but fixed only one of two occurrences. Live testing showed the fix had not worked — pushed back, it found the second hardcoded instance. Fixed and verified in under 30 minutes.',
    },
    {
      competency: 'Remote, async collaboration',
      title: 'Architecture handoff — monolith vs. decoupled',
      icon: 'Users',
      body:
        'Client wanted a decoupled architecture; a Laravel teammate leaned monolith for convenience. Built the frontend UX flow first, then had Claude generate a DB schema from it — including business-logic constraints (a "next" step can’t proceed without a save). Its first schema missed foreign-key relationships across the full flow; corrected it by giving explicit step order. Verified against real user scenarios, then handed the schema to the teammate, who built the backend from it with no back-and-forth calls.',
    },
    {
      competency: 'Workflow & tooling literacy + critique',
      title: 'Copilot vs. Claude — division of labour',
      icon: 'GitCompare',
      body:
        'Copilot for research and direction; Claude for build-out from specs. Recurring frustration: Claude defaults to TypeScript without asking, though I work in plain JS/JSX — so I correct it explicitly each time and verify by grepping for leftover .tsx files rather than trusting its "done" report. The critique: tools should ask about stack preferences upfront instead of assuming.',
    },
  ],
}

export const heroStats = [
  { value: '18', label: 'departments on Tizeti OS' },
  { value: '6', label: 'developers led' },
  { value: '3', label: 'countries' },
  { value: '30%', label: 'faster load times' },
]

// Private/internal systems — no public link, so shown as a write-up.
export const flagshipWork = [
  {
    name: 'Tizeti OS',
    blurb: 'In-house ERP spanning 18 departments across a multi-country operation: procurement, requisitions, inventory, HR/leave, field scheduling and KYC, with approval chains up to CIO / COO.',
  },
  {
    name: 'Installation & scheduling system',
    blurb: 'Built the sales, scheduler and field-engineer (FSE) flows — from customer sign-up and payment through installation, failed installs and refunds.',
  },
  {
    name: 'Tizeti Cloud',
    blurb: 'Customer portal with marketing site, plans, registration with live Paystack billing, and a customer dashboard.',
  },
  {
    name: 'Hotspot / Express Wi-Fi',
    blurb: 'Vue.js / PHP platform: redesigned the retailer / RDE interface and fixed a slow country view caused by a hardcoded pagination limit.',
  },
]

export const certifications = [
  'Meta Full Stack Developer Specialization — Coursera, 2026',
  'Meta Introduction to Front-End Development — Coursera, 2026',
  'Cisco Certified Network Associate (CCNA) — 2020',
  'Institute of Personal Development and Customer Relationship Management (IPCDRM), Qatar — 2025',
]

export const education = {
  degree: 'B.Sc. Computer Science & Information Technology',
  honours: 'Second Class Upper Honours',
  school: 'Bowen University, Iwo',
  period: '2016 – 2020',
  extra: 'Social Director, Computer Science Department (2019–2020)',
}
