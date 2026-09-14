import { useHashRoute } from '@/hooks/useHashRoute'
import Deck from '@/components/deck/Deck'
import DeckNavbar from '@/components/DeckNavbar'
import HeroPanel from '@/components/panels/HeroPanel'
import AboutPanel from '@/components/panels/AboutPanel'
import SkillsPanel from '@/components/panels/SkillsPanel'
import ExperiencePanel from '@/components/panels/ExperiencePanel'
import AiWorkflowPanel from '@/components/panels/AiWorkflowPanel'
import ProjectsPanel from '@/components/panels/ProjectsPanel'
import TemplatesPanel from '@/components/panels/TemplatesPanel'
import ContactPanel from '@/components/panels/ContactPanel'
import Panel from '@/components/deck/Panel'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Admin from '@/pages/Admin'

// The full-screen deck: each entry is one panel (one viewport).
const panels = [
  { id: 'hero', label: 'Home', render: ({ isActive }) => wrap('hero', isActive, HeroPanel, { bg: true }) },
  { id: 'about', label: 'About', render: ({ isActive }) => wrap('about', isActive, AboutPanel) },
  { id: 'skills', label: 'Skills', render: ({ isActive }) => wrap('skills', isActive, SkillsPanel) },
  { id: 'experience', label: 'Experience', render: ({ isActive }) => wrap('experience', isActive, ExperiencePanel) },
  { id: 'ai-workflow', label: 'AI Workflow', render: ({ isActive }) => wrap('ai-workflow', isActive, AiWorkflowPanel) },
  { id: 'projects', label: 'Work', chromeless: true, render: ({ isActive }) => rawFull('projects', isActive, ProjectsPanel) },
  { id: 'templates', label: 'Templates', chromeless: true, render: ({ isActive }) => rawFull('templates', isActive, TemplatesPanel) },
  { id: 'contact', label: 'Contact', render: ({ isActive }) => wrap('contact', isActive, ContactPanel) },
]

function wrap(id, isActive, Component, opts = {}) {
  return (
    <Panel id={id} active={isActive} {...opts}>
      <Component active={isActive} />
    </Panel>
  )
}

// Full-bleed panels (carousels) that own their own full-height layout: keep the
// immersive background + entrance fade, but drop Panel's centering/max-width.
function rawFull(id, isActive, Component) {
  return (
    <section
      id={id}
      className="grain relative h-[100dvh] w-full overflow-hidden"
    >
      <div className="mesh pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="dotgrid pointer-events-none absolute inset-0 -z-10 opacity-40" />
      <div
        className={
          'relative z-10 h-full w-full transition-[transform,opacity] duration-700 ' +
          (isActive ? 'opacity-100' : 'translate-y-6 opacity-0')
        }
      >
        <Component active={isActive} />
      </div>
    </section>
  )
}

export default function App() {
  const { route } = useHashRoute()

  // Blog + admin are standalone scrolling pages.
  if (route === 'blog') return <Blog />
  if (route.startsWith('blog/')) return <BlogPost slug={route.slice('blog/'.length)} />
  if (route === 'admin') return <Admin />

  // Default: the immersive full-screen deck.
  const initialId = route.startsWith('panel/') ? route.slice('panel/'.length) : 'hero'
  return (
    <Deck panels={panels} initialId={initialId} navbar={<DeckNavbar />} />
  )
}
