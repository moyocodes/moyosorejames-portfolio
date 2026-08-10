import { useEffect, useState } from 'react'

/**
 * useHashRoute — minimal path-based router (despite the name, uses the History
 * API, not location.hash). Returns the current route string (leading slash
 * stripped) and a navigate() helper. Deep links/refresh work because the host
 * (see vercel.json) rewrites all paths to index.html.
 *
 * Routes used in this app:
 *   ''            → home (single-page sections)
 *   'blog'        → blog index
 *   'blog/:slug'  → single post
 *   'admin'       → admin editor (password-gated)
 */
export function useHashRoute() {
  const [route, setRoute] = useState(() => getRoute())

  useEffect(() => {
    const onChange = () => {
      setRoute(getRoute())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('popstate', onChange)
    return () => window.removeEventListener('popstate', onChange)
  }, [])

  return { route }
}

function getRoute() {
  return window.location.pathname.replace(/^\/+/, '')
}

export function navigate(to) {
  const clean = to.replace(/^\/+/, '')
  const path = clean ? `/${clean}` : '/'
  if (path === window.location.pathname) return
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
