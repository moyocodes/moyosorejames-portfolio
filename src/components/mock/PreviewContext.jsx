import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { projects } from '@/data/content'

/** Bundled screenshot for a live URL: /previews/<host>.jpg (see scripts note in README). */
export function previewSrc(url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  return `/previews/${host}.jpg`
}

const PreviewContext = createContext({ isReady: () => false })
export const usePreviews = () => useContext(PreviewContext)

const urls = projects.map((p) => p.liveUrl).filter(
  (u) => u && /^https?:\/\//i.test(u)
)

/**
 * PreviewProvider — warms every project preview in the background as soon as
 * the page is idle, so the Work/Templates slides are already decoded and
 * cached when a visitor scrolls there. Hero previews go first.
 */
export function PreviewProvider({ children }) {
  const [ready, setReady] = useState({})
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    const imgs = []
    const load = (u) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => setReady((r) => ({ ...r, [u]: true }))
      img.src = previewSrc(u)
      imgs.push(img)
    }
    const run = () => urls.forEach(load)
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 300))
    idle(run)
    return () => imgs.forEach((i) => (i.onload = null))
  }, [])

  const isReady = useCallback((u) => !!ready[u], [ready])
  const value = useMemo(() => ({ isReady }), [isReady])
  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>
}
