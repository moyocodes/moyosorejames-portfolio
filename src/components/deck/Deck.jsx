import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const DeckContext = createContext(null)
export const useDeck = () => useContext(DeckContext)

/**
 * Deck — a full-screen "presentation deck" navigator. Renders exactly one
 * <Panel> at a time, full viewport, with a fade+zoom transition between them.
 *
 * Navigation: arrow keys (←/→/↑/↓), PageUp/Down, wheel (debounced), touch
 * swipe, dot-nav on the right, and programmatic goTo() via context.
 *
 * Panels are provided as an array of { id, label, render }. `label` feeds the
 * dot-nav and top navbar.
 */
export default function Deck({ panels, initialId, navbar }) {
  const startIndex = Math.max(
    0,
    panels.findIndex((p) => p.id === initialId)
  )
  const [index, setIndex] = useState(startIndex === -1 ? 0 : startIndex)
  const [prevIndex, setPrevIndex] = useState(null)
  const lockRef = useRef(false)
  const touchStart = useRef(null)
  // The active panel can intercept forward/back nav (e.g. a carousel that
  // advances internally before releasing to the next panel). Returns true when
  // it handled the move, so the deck should NOT change panels.
  const interceptorRef = useRef(null)
  const setNavInterceptor = useCallback((fns) => {
    interceptorRef.current = fns
  }, [])
  // +1 when the last move went forward (down), -1 when it went back (up). Lets
  // carousel panels enter at their first item when scrolling down, or last item
  // when scrolling up — so the top→bottom flow reads continuously.
  const directionRef = useRef(1)

  const goTo = useCallback(
    (next) => {
      setIndex((cur) => {
        const clamped = Math.max(0, Math.min(panels.length - 1, next))
        if (clamped === cur) return cur
        directionRef.current = clamped > cur ? 1 : -1
        setPrevIndex(cur)
        // update hash for deep-linking without triggering the app router
        if (panels[clamped]?.id) {
          history.replaceState(null, '', `#panel/${panels[clamped].id}`)
        }
        return clamped
      })
    },
    [panels]
  )

  // next/prev first offer the move to the active panel's interceptor. If it
  // consumes the move (returns true), the deck stays put.
  const next = useCallback(() => {
    if (interceptorRef.current?.onNext?.()) return
    goTo(index + 1)
  }, [goTo, index])
  const prev = useCallback(() => {
    if (interceptorRef.current?.onPrev?.()) return
    goTo(index - 1)
  }, [goTo, index])

  // Debounced wheel navigation (so a single trackpad flick = one panel).
  useEffect(() => {
    const onWheel = (e) => {
      // Allow inner scroll areas (marked data-scrollable) to scroll normally.
      if (e.target.closest('[data-scrollable]')) return
      if (Math.abs(e.deltaY) < 24) return
      if (lockRef.current) return
      lockRef.current = true
      e.deltaY > 0 ? next() : prev()
      setTimeout(() => (lockRef.current = false), 850)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [next, prev])

  // Keyboard navigation.
  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault()
        next()
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        prev()
      } else if (e.key === 'Home') {
        goTo(0)
      } else if (e.key === 'End') {
        goTo(panels.length - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, goTo, panels.length])

  // Touch swipe (vertical or horizontal). Ignored inside inner scroll areas
  // (marked data-scrollable) so dragging content there scrolls it normally
  // instead of flipping the whole deck panel — same opt-out the wheel
  // handler above uses.
  const onTouchStart = (e) => {
    if (e.target.closest('[data-scrollable]')) {
      touchStart.current = null
      return
    }
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e) => {
    if (!touchStart.current) return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    const absX = Math.abs(dx)
    const absY = Math.abs(dy)
    if (Math.max(absX, absY) < 60) return
    if (absY > absX) {
      dy < 0 ? next() : prev()
    } else {
      dx < 0 ? next() : prev()
    }
    touchStart.current = null
  }

  // Clear any interceptor when the active panel changes; the new active panel
  // re-registers its own (if any) on mount/activation.
  useEffect(() => {
    interceptorRef.current = null
  }, [index])

  const getEntryDirection = useCallback(() => directionRef.current, [])
  const ctx = {
    index,
    count: panels.length,
    goTo,
    next,
    prev,
    panels,
    setNavInterceptor,
    getEntryDirection,
  }
  const chromeless = !!panels[index]?.chromeless

  return (
    <DeckContext.Provider value={ctx}>
      <div
        className="relative h-[100dvh] w-full overflow-hidden bg-background"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {!chromeless && navbar}
        {panels.map((panel, i) => {
          const isActive = i === index
          const wasPrev = i === prevIndex
          if (!isActive && !wasPrev) {
            // Keep only active (and the outgoing) panel mounted for the transition.
            return null
          }
          return (
            <div
              key={panel.id}
              className={cn(
                'absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                isActive
                  ? 'z-10 scale-100 opacity-100'
                  : 'pointer-events-none z-0 scale-[1.04] opacity-0'
              )}
            >
              <div className="h-full w-full overflow-y-auto" data-panel-scroll>
                {panel.render({ isActive })}
              </div>
            </div>
          )
        })}

        {!chromeless && <DotNav />}
        {!chromeless && <DeckHint />}
        {chromeless && <SlideExit />}
      </div>
    </DeckContext.Provider>
  )
}

// When chrome is hidden (presentation panels), a minimal Esc/close affordance
// to jump back to the previous non-chromeless panel — so users aren't trapped.
function SlideExit() {
  const { goTo, index, panels } = useDeck()
  const back = () => {
    for (let j = index - 1; j >= 0; j--) {
      if (!panels[j].chromeless) return goTo(j)
    }
    goTo(0)
  }
  return (
    <button
      onClick={back}
      aria-label="Exit slide view"
      className="fixed right-4 top-4 z-40 flex h-9 items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 text-xs font-medium text-muted-foreground shadow backdrop-blur transition-colors hover:text-foreground"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
      Exit
    </button>
  )
}

function DotNav() {
  const { index, goTo, panels } = useDeck()
  return (
    <nav
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex"
      aria-label="Section navigation"
    >
      {panels.map((p, i) => (
        <button
          key={p.id}
          onClick={() => goTo(i)}
          className="group flex items-center gap-2"
          aria-label={`Go to ${p.label}`}
          aria-current={i === index}
        >
          <span
            className={cn(
              'rounded-full px-2 py-1 text-xs font-medium opacity-0 transition-all group-hover:opacity-100',
              i === index ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            {p.label}
          </span>
          <span
            className={cn(
              'h-2.5 w-2.5 rounded-full border transition-all',
              i === index
                ? 'scale-125 border-primary bg-primary'
                : 'border-muted-foreground/40 bg-transparent group-hover:border-primary'
            )}
          />
        </button>
      ))}
    </nav>
  )
}

function DeckHint() {
  const { index, count, next } = useDeck()
  if (index >= count - 1) return null
  return (
    <button
      onClick={next}
      className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 animate-bounce flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground sm:flex"
      aria-label="Next section"
    >
      <span className="text-[10px] uppercase tracking-widest">Scroll</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  )
}
