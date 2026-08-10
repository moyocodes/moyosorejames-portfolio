import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ThemeToggle'
import { navigate } from '@/hooks/useHashRoute'
import { profile } from '@/data/content'

/**
 * PageShell — simple scrolling-page chrome for the Blog and Admin routes
 * (distinct from the full-screen deck used on the home route).
 */
export default function PageShell({ children, title }) {
  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="sticky top-0 z-40 glass-strong border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('')}>
              <Home className="h-4 w-4" /> {profile.name}
            </Button>
            {title && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="text-sm font-medium">{title}</span>
              </>
            )}
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="container py-10">{children}</main>
    </div>
  )
}

export function BackLink({ to = '', label = 'Back' }) {
  return (
    <button
      onClick={() => navigate(to)}
      className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" /> {label}
    </button>
  )
}
