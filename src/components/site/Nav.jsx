import { useEffect, useRef, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ThemeToggle'
import { openPalette } from '@/components/site/CommandPalette'
import { cn } from '@/lib/utils'

const links = [
  { id: 'work', label: 'Work' },
  { id: 'fileflow', label: 'FileFlowHQ' },
  { id: 'how', label: 'How I work' },
  { id: 'ai', label: 'AI' },
  { id: 'skills', label: 'Skills' },
  { id: 'cv', label: 'CV' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const bar = useRef(null)
  const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform)

  // Reading-progress bar. Written straight to the DOM so scrolling doesn't re-render.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the link for whichever section sits across the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ;['top', ...links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-0.5" aria-hidden="true">
        <div ref={bar} className="h-full origin-left scale-x-0" style={{ background: 'linear-gradient(90deg, #7f9bd6, #e8a27c, #7fc2b0)' }} />
      </div>
      <header className="sticky top-3 z-50 mx-auto w-[calc(100%-1.5rem)] max-w-[1120px] rounded-full border border-border bg-background/75 backdrop-blur-xl">
        <nav className="flex h-14 items-center justify-between gap-4 pl-6 pr-2.5" aria-label="Main">
          <a href="#top" className="font-display text-[0.95rem] font-semibold tracking-tight">James Moyosore</a>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={cn('rounded-full px-3 py-1.5 text-sm font-medium transition-colors', active === l.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground')}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={openPalette}
              aria-label="Search this site"
              className="flex h-9 items-center gap-2 rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Search className="h-4 w-4" />
              <kbd className="hidden font-mono text-xs sm:inline">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
            </button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {open && (
          <div className="flex flex-col gap-1 px-4 pb-4 lg:hidden">
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 font-medium hover:bg-accent">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  )
}
