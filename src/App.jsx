import { useEffect } from 'react'
import { useHashRoute } from '@/hooks/useHashRoute'
import Nav from '@/components/site/Nav'
import CommandPalette from '@/components/site/CommandPalette'
import Hero from '@/components/site/Hero'
import Work from '@/components/site/Work'
import FileFlow from '@/components/site/FileFlow'
import HowIWork from '@/components/site/HowIWork'
import LlmLab from '@/components/site/LlmLab'
import CvSection from '@/components/site/CvSection'
import Skills from '@/components/site/Skills'
import Contact from '@/components/site/Contact'
import TemplatesDrawer from '@/components/TemplatesDrawer'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Admin from '@/pages/Admin'

function Home() {
  // The page renders after load, so the browser can't jump to a #section by itself.
  useEffect(() => {
    if (window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView()
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only left-4 top-4 z-[70] rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>
      <Nav />
      <CommandPalette />
      <TemplatesDrawer />
      <main id="main">
        <Hero />
                <Work />
        <FileFlow />
        <HowIWork />
        <LlmLab />
        <Skills />
        <CvSection />
        <Contact />
      </main>
    </>
  )
}

export default function App() {
  const { route } = useHashRoute()

  // Blog + admin are standalone pages.
  if (route === 'blog') return <Blog />
  if (route.startsWith('blog/')) return <BlogPost slug={route.slice('blog/'.length)} />
  if (route === 'admin') return <Admin />

  return <Home />
}
