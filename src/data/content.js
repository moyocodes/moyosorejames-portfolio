// ============================================================================
//  PORTFOLIO CONTENT — James Moyosore
//  Edit this file to update text, links, projects, skills, and experience.
//  TODO markers indicate values you should replace with real URLs/assets.
// ============================================================================

export const profile = {
  name: 'James Moyosore',
  title: 'Full-Stack Software Developer',
  tagline: 'AI-Integrated Engineering · Backend · DevOps · CMS',
  location: 'Lagos, Nigeria',
  email: 'moyosorejames@gmail.com',
  phone: '(+234) 8061953109',
  summary:
    'Full-stack software developer with 5+ years of experience across frontend architecture, backend engineering, and DevOps. Currently focused on building and integrating AI-powered features into production systems — shipping products end to end, from API design and CMS-driven content workflows to CI/CD pipelines on AWS, Vercel, and Render.',
  summaryLong:
    'Comfortable with React.js, Next.js, TypeScript, and Tailwind CSS on the frontend, and Node.js and Laravel/PHP on the backend. Hands-on experience integrating LLMs (Claude, OpenAI/ChatGPT) into application workflows — including prompt design and AI-assisted code generation — while keeping full ownership of architecture, code quality, and system design.',
  links: {
    // TODO: confirm these URLs
    portfolio: 'https://moyosorejames.com',
    designPortfolio: '', // TODO: add design portfolio URL
    github: 'https://github.com/', // TODO: add GitHub username
    linkedin: 'https://www.linkedin.com/', // TODO: add LinkedIn URL
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
    title: 'Integrate AI / LLM capabilities',
    description:
      'Prompt-driven features, AI-assisted content and admin workflows, and using AI tools to speed up backend, frontend, and DevOps work.',
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
    ],
  },
  {
    category: 'Backend',
    icon: 'Server',
    items: [
      { name: 'Node.js', icon: ['si', 'SiNodedotjs'] },
      { name: 'Laravel (PHP)', icon: ['si', 'SiLaravel'] },
      { name: 'REST APIs', icon: ['lucide', 'Webhook'] },
      { name: 'GraphQL', icon: ['si', 'SiGraphql'] },
      { name: 'Firebase', icon: ['si', 'SiFirebase'] },
    ],
  },
  {
    category: 'AI / LLM Integration',
    icon: 'Sparkles',
    items: [
      { name: 'Claude', icon: ['si', 'SiClaude'] },
      { name: 'OpenAI API', icon: ['lucide', 'Bot'] },
      { name: 'Prompt Design', icon: ['lucide', 'MessageSquareText'] },
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
      { name: 'CI/CD', icon: ['lucide', 'GitPullRequest'] },
      { name: 'Git', icon: ['si', 'SiGit'] },
      { name: 'Performance & Caching', icon: ['lucide', 'Gauge'] },
    ],
  },
  {
    category: 'State Management',
    icon: 'GitBranch',
    items: [
      { name: 'React Query', icon: ['si', 'SiReactquery'] },
      { name: 'Redux', icon: ['si', 'SiRedux'] },
      { name: 'Context API', icon: ['lucide', 'Boxes'] },
    ],
  },
  {
    category: 'CMS & Workflows',
    icon: 'FileText',
    items: [
      { name: 'Content Modeling', icon: ['lucide', 'FileStack'] },
      { name: 'Admin Panels', icon: ['lucide', 'LayoutDashboard'] },
      { name: 'CMS Integration', icon: ['lucide', 'FileText'] },
      { name: 'Editorial Workflows', icon: ['lucide', 'PenLine'] },
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
      'Own full-stack delivery across Hotspot, WiFiCall, and Free Fiber Africa, building both React/TypeScript/Vue frontends and Node.js/Laravel backend services for the same products.',
      'Design and deploy backend APIs and services alongside modular, reusable frontend components, keeping frontend and backend contracts consistent.',
      'Manage production deployments and CI/CD pipelines on AWS, Vercel, and Render, using AI-assisted workflows to speed up config, debugging, and release checks.',
      'Set and enforce UI/UX and system-design standards across products, including CMS-style admin and content-management interfaces.',
      'Mentor junior and mid-level developers; lead code reviews and architecture/ER-model discussions.',
      'Reduced load times by 30% through caching, reusable components, and backend query optimization.',
    ],
  },
  {
    role: 'Lead Frontend Developer',
    company: 'Tizeti Network Limited',
    location: 'Lagos, Nigeria',
    period: '12/2023 – 02/2025',
    points: [
      'Led a team of six developers in digitalizing departmental workflows across three countries, working across React, Vue, PHP, and Tailwind CSS.',
      'Built secure authentication systems and payment gateways spanning frontend and backend.',
      'Ran code reviews and streamlined debugging workflows, cutting issue rates by 50%.',
      'Led product demos, technical documentation, and design/architecture discussions.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Tizeti Network Limited',
    location: 'Remote',
    period: '03/2022 – 12/2023',
    points: [
      'Built responsive web applications with React.js, Bootstrap, JavaScript, TypeScript, and Tailwind CSS.',
      'Designed and implemented end-to-end secure payment gateways and user-facing dashboards.',
      'Partnered with designers and backend engineers on UI/UX consistency and API integration.',
      'Debugged and optimized applications, reducing issue rates by 30%.',
    ],
  },
  {
    role: 'NYSC Frontend Developer',
    company: 'Tizeti Network Limited',
    location: 'Remote',
    period: '03/2021 – 02/2022',
    points: [
      'Developed responsive applications using React.js, Redux, PHP, and TypeScript.',
      'Implemented secure payment gateways and integrated REST APIs.',
      'Optimized debugging processes, reducing issue rates by 30%.',
    ],
  },
  {
    role: 'Intern',
    company: 'Safe Complex Multi-Biz Limited',
    location: 'Ibadan, Nigeria (Remote)',
    period: '03/2019 – 09/2020',
    points: [
      'Developed and maintained responsive web applications using HTML, CSS, and JavaScript.',
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
    name: 'Fantasy Showdown',
    subtitle: 'Real-Money Fantasy Football Platform',
    blurb: 'A wallet-backed fantasy platform on top of official FPL, with automated payouts.',
    description:
      'Full-stack platform layered on top of official FPL, with wallet funding, BVN-verified withdrawals, subscription pots, and head-to-head/group challenge matchmaking with automated point-based payouts.',
    skills: ['React.js', 'Laravel (PHP)', 'REST APIs', 'Paystack/Flutterwave', 'AI-Assisted Backend', 'CI/CD'],
    liveUrl: 'https://fshowdown.com',
    scene: 'dashboard',
    accent: '#16a34a',
    featured: true,
    screens: [
      { key: 'dash', label: 'Dashboard', variant: 'dashboard' },
      { key: 'wallet', label: 'Wallet', variant: 'booking' },
      { key: 'mobile', label: 'Feed', variant: 'content' },
    ],
  },
  {
    name: 'Mindfully Articulated',
    subtitle: 'CMS-Driven Content Platform',
    blurb: 'A content platform with a custom admin panel for structured publishing.',
    description:
      'Node.js-powered content platform with a custom admin panel for structured content management and publishing.',
    skills: ['React.js', 'Node.js', 'CMS Architecture', 'Admin Panel', 'Content Modeling'],
    liveUrl: 'https://www.mindfullyarticulated.com',
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
      'A fast, free online file converter for images, PDF documents, and data files (CSV/JSON). No installation — everything runs in the browser with a clean, responsive UI.',
    skills: ['React.js', 'Tailwind CSS', 'File Conversion', 'Client-Side Processing', 'Responsive Design'],
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
    blurb: 'A single-page consulting site engineered to build authority and drive bookings.',
    description:
      'High-performance consulting website designed to establish authority and drive bookings. Single-page architecture with structured messaging.',
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
    name: 'Abánítúnráse',
    subtitle: 'E-Commerce & Booking Platform',
    blurb: 'A styling-house store with product sales and appointment scheduling.',
    description:
      'E-commerce and booking platform for a styling house offering bridal styling, occasion looks, and Kájáyelo travel wardrobe curation, with online product sales and appointment scheduling.',
    skills: ['React.js', 'Tailwind CSS', 'E-Commerce', 'Booking System', 'Responsive Design'],
    liveUrl: 'https://www.abanitunrase.com',
    scene: 'shop',
    accent: '#db2777',
    screens: [
      { key: 'shop', label: 'Shop', variant: 'shop' },
      { key: 'book', label: 'Booking', variant: 'booking' },
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

// ============================================================================
//  ADMIN — the password below GATES the local blog editor UI only. It is NOT
//  security: this is a static site, so the value ships to the browser. Anyone
//  can read/bypass it. It only keeps casual visitors out of the writing view.
//  Blog posts are real files in src/data/posts.js (committed to the repo).
// ============================================================================
export const adminConfig = {
  password: 'Moyosore',
}

export const education = {
  degree: 'B.Sc. Computer Science & Information Technology',
  honours: 'Second Class Upper Honours',
  school: 'Bowen University, Iwo',
  period: '2016 – 2020',
  extra: 'Social Director, Computer Science Department (2019–2020)',
}
