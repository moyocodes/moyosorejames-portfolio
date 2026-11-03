import { useEffect, useMemo, useRef, useState } from 'react'
import { useSyncExternalStore } from 'react'
import { Compass, CornerDownLeft, FileDown, FolderOpen, Mail, Search, Wrench } from 'lucide-react'
import { profile, projects, skills } from '@/data/content'
import { openProject, scrollToId } from '@/lib/site'
import { openTemplates } from '@/hooks/useTemplatesDrawer'
import { cn } from '@/lib/utils'

// Shared open state, same pattern as useTemplatesDrawer: the nav button opens it too.
let isOpen = false
const listeners = new Set()
const setOpen = (v) => {
  isOpen = v
  listeners.forEach((l) => l())
}
export const openPalette = () => setOpen(true)
const usePaletteOpen = () =>
  useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => isOpen
  )

const visit = (url) => window.open(url, '_blank', 'noreferrer')

const baseItems = [
  ...[
    ['work', 'Work', 'projects portfolio'],
    ['fileflow', 'FileFlowHQ and Studio', 'browser privacy rust webassembly pdf editors'],
    ['how', 'How I work', 'process workflow erp'],
    ['ai', 'Try the AI demos', 'claude ollama routing agent nudgy tourfinder'],
    ['skills', 'Skills', 'stack tools technology'],
    ['cv', 'CV', 'resume work history experience career education certifications'],
    ['contact', 'Contact', 'email phone hire message'],
  ].map(([id, label, keys]) => ({ group: 'Go to', icon: Compass, label, keys, run: () => scrollToId(id) })),
  ...projects.map((p) => ({
    group: 'Projects',
    icon: FolderOpen,
    label: p.name,
    hint: p.summary,
    keys: p.stack.join(' '),
    run: () => openProject(p.name),
  })),
  { group: 'Actions', icon: FileDown, label: 'View CV', keys: 'resume pdf work history experience', run: () => window.open(profile.links.cv, '_blank', 'noreferrer') },
  { group: 'Actions', icon: Mail, label: 'Email me', hint: profile.email, keys: 'contact', run: () => (window.location.href = `mailto:${profile.email}`) },
  { group: 'Actions', icon: FolderOpen, label: 'GitHub', keys: 'code moyocodes', run: () => visit(profile.links.github) },
  { group: 'Actions', icon: FolderOpen, label: 'LinkedIn', keys: 'profile', run: () => visit(profile.links.linkedin) },
  { group: 'Actions', icon: FolderOpen, label: 'Design portfolio', keys: 'canva ui ux brand', run: () => visit(profile.links.designPortfolio) },
  { group: 'Actions', icon: FolderOpen, label: 'Templates I sell', keys: 'lumen photography gumroad selar', run: openTemplates },
]

const skillItems = skills.flatMap((g) =>
  g.items.map((s) => ({ group: 'Skills', icon: Wrench, label: s, hint: g.category, run: () => scrollToId('skills') }))
)

export default function CommandPalette() {
  const open = usePaletteOpen()
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const input = useRef(null)
  const list = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(!isOpen)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setIndex(0)
    input.current?.focus()
  }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return baseItems
    return [...baseItems, ...skillItems].filter((item) =>
      `${item.label} ${item.hint || ''} ${item.keys || ''}`.toLowerCase().includes(q)
    )
  }, [query])

  useEffect(() => setIndex(0), [query])
  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [index])

  if (!open) return null

  const choose = (item) => {
    setOpen(false)
    item.run()
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') setOpen(false)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => Math.min(i + 1, results.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => Math.max(i - 1, 0))
    }
    if (e.key === 'Enter' && results[index]) choose(results[index])
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search this site">
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="pop-in relative flex max-h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search projects and skills"
            aria-label="Search"
            className="h-12 w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <button onClick={() => setOpen(false)} className="rounded-md bg-muted px-2 py-0.5 font-mono text-sm text-muted-foreground">
            Esc
          </button>
        </div>

        <ul ref={list} role="listbox" aria-label="Results" className="flex-1 overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-8 text-center text-muted-foreground">Nothing for “{query}”.</li>}
          {results.map((item, i) => {
            const Icon = item.icon
            return (
              <li key={`${item.group}-${item.label}`} role="option" aria-selected={i === index}>
                <button
                  onClick={() => choose(item)}
                  onMouseMove={() => setIndex(i)}
                  className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left', i === index && 'bg-accent')}
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{item.label}</span>
                    {item.hint && <span className="block truncate text-sm text-muted-foreground">{item.hint}</span>}
                  </span>
                  <span className="shrink-0 text-sm text-muted-foreground">{item.group}</span>
                  {i === index && <CornerDownLeft className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
