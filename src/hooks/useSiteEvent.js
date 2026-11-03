import { useEffect } from 'react'

/** Subscribes to one of the events sent from src/lib/site.js. */
export function useSiteEvent(name, handler) {
  useEffect(() => {
    const listener = (e) => handler(e.detail)
    window.addEventListener(name, listener)
    return () => window.removeEventListener(name, listener)
  }, [name, handler])
}
