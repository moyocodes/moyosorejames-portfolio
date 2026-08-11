import { useEffect, useRef, useState } from 'react'
import { useDeck } from '@/components/deck/Deck'

/**
 * useAutoRotate — advances a carousel index on an interval, pausing while the
 * user hovers/focuses the stage (bind `pauseHandlers` to the container) and
 * respecting prefers-reduced-motion.
 *
 * When `captureDeckNav` is true and the panel is active, it registers a nav
 * interceptor with the deck so vertical wheel/keys/swipe step through the
 * carousel items first, and only release to the next/prev panel at the ends.
 *
 * Returns { index, setIndex, go, pauseHandlers, paused }.
 */
export function useAutoRotate(count, {
  interval = 6000,
  enabled = true,
  captureDeckNav = false,
  getInitialIndex,
} = {}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)
  const deck = useDeck()
  const indexRef = useRef(index)
  indexRef.current = index

  const go = (n) => setIndex((c) => (c + n + count) % count)

  // On activation, enter at the first item when arriving by scrolling down, or
  // the last item when arriving by scrolling up — keeps the vertical flow going
  // top→bottom through the carousel before releasing to the next panel. A
  // pending explicit request (getInitialIndex) takes priority over that.
  useEffect(() => {
    if (!captureDeckNav || !enabled) return
    const requestedIndex = getInitialIndex?.()
    if (requestedIndex != null && requestedIndex >= 0) {
      setIndex(requestedIndex)
      return
    }
    const dir = deck?.getEntryDirection?.() ?? 1
    setIndex(dir < 0 ? count - 1 : 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, captureDeckNav])

  // Register/withdraw the deck nav interceptor while this panel is active.
  useEffect(() => {
    if (!captureDeckNav || !enabled || !deck?.setNavInterceptor) return
    deck.setNavInterceptor({
      // Advance through items; consume the move until past the last item.
      onNext: () => {
        if (indexRef.current < count - 1) {
          setIndex(indexRef.current + 1)
          return true
        }
        return false // at the end → let the deck move to the next panel
      },
      onPrev: () => {
        if (indexRef.current > 0) {
          setIndex(indexRef.current - 1)
          return true
        }
        return false // at the start → let the deck move to the previous panel
      },
    })
    return () => deck.setNavInterceptor(null)
  }, [captureDeckNav, enabled, deck, count])

  useEffect(() => {
    if (!enabled || paused || count <= 1) return
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    timerRef.current = setInterval(() => {
      setIndex((c) => (c + 1) % count)
    }, interval)
    return () => clearInterval(timerRef.current)
  }, [enabled, paused, count, interval])

  const pauseHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocusCapture: () => setPaused(true),
    onBlurCapture: () => setPaused(false),
    onTouchStart: () => setPaused(true),
  }

  return { index, setIndex, go, pauseHandlers, paused }
}
