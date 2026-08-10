import { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Drawer — a slide-in panel from the right (or left). Used for full-detail
 * views (e.g. the experience timeline) without leaving the current deck panel.
 */
export default function Drawer({ open, onClose, title, side = 'right', children, width = 'max-w-xl' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div className={cn('fixed inset-0 z-[80]', open ? '' : 'pointer-events-none')} aria-hidden={!open}>
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={cn(
          'absolute top-0 flex h-full w-full flex-col border-border bg-card shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          width,
          side === 'right'
            ? cn('right-0 border-l', open ? 'translate-x-0' : 'translate-x-full')
            : cn('left-0 border-r', open ? 'translate-x-0' : '-translate-x-full')
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6" data-scrollable>
          {children}
        </div>
      </div>
    </div>
  )
}
