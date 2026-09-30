import { useSyncExternalStore } from 'react'

// Tiny shared open/close state so the nav, hero and drawer can coordinate
// without threading props through the deck.
let open = false
const listeners = new Set()
const set = (v) => {
  open = v
  listeners.forEach((l) => l())
}

export const openTemplates = () => set(true)
export const closeTemplates = () => set(false)

export function useTemplatesDrawer() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => open
  )
}
