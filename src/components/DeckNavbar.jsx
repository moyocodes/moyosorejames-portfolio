import { useState } from 'react'
import { Menu, X, PenLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ThemeToggle'
import { useDeck } from '@/components/deck/Deck'
import { navigate } from '@/hooks/useHashRoute'
import { cn } from '@/lib/utils'

/**
 * DeckNavbar — top bar for the full-screen deck. Section links call the deck's
 * goTo(); the Blog link switches app routes via the hash router.
 */
export default function DeckNavbar() {
  const deck = useDeck()
  const [open, setOpen] = useState(false)

  const go = (id) => {
    const i = deck.panels.findIndex((p) => p.id === id)
    if (i >= 0) deck.goTo(i)
    setOpen(false)
  }

  const links = deck.panels
    .filter((p) => p.id !== 'hero')
    .map((p) => ({ id: p.id, label: p.label }))

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="glass-strong container mt-3 flex h-14 items-center justify-between rounded-full border border-border px-4 shadow-lg">
        <button onClick={() => go('hero')} className="text-base font-bold tracking-tight">
          <span className="gradient-text">JM</span>
        </button>

        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                deck.panels[deck.index]?.id === l.id
                  ? 'bg-accent text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => navigate('blog')}>
            <PenLine className="h-4 w-4" /> Blog
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="glass-strong container mt-2 flex flex-col rounded-2xl border border-border p-2 shadow-lg md:hidden">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => {
              navigate('blog')
              setOpen(false)
            }}
            className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            Blog
          </button>
        </div>
      )}
    </header>
  )
}
