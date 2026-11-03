import { useEffect, useRef, useState } from 'react'

/**
 * Pins a section while the page scrolls through it, reporting progress from 0 to 1.
 * `distance` says how many pixels of scrolling the section takes. It pins on large
 * screens (or every size with `allSizes`) when motion is allowed; otherwise `pinned`
 * is false and the section should lay itself out normally.
 */
export function usePinnedScroll(distance, onProgress, { allSizes = false } = {}) {
  const section = useRef(null)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(allSizes ? '(prefers-reduced-motion: no-preference)' : '(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
    const update = () => setPinned(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [allSizes])

  useEffect(() => {
    const el = section.current
    if (!pinned || !el) {
      if (el) el.style.height = ''
      return
    }
    const measure = () => {
      el.style.height = `${distance() + window.innerHeight}px`
      onScroll()
    }
    const onScroll = () => {
      const d = distance()
      onProgress(d > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / d)) : 0)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [pinned, distance, onProgress])

  return { section, pinned }
}

/** Scrolls the page to a given progress point of a pinned section. */
export function scrollToProgress(el, distance, progress) {
  const top = el.getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top: top + distance * progress })
}
