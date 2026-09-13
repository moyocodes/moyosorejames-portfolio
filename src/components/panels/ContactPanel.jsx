import { useState } from 'react'
import { FileDown, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react'
import { PanelHeading } from '@/components/deck/Panel'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/content'

export default function ContactPanel() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || 'someone'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <div>
      <PanelHeading
        eyebrow="Contact"
        title="Let's build something"
        description="Have a project, role, or idea? Reach out — I'm happy to talk."
      />

      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur">
            {[
              { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
              { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, '')}` },
              { icon: MapPin, label: profile.location, href: null },
            ].map((item) => {
              const Icon = item.icon
              const inner = (
                <>
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </>
              )
              return item.href ? (
                <a key={item.label} href={item.href} className="flex items-center gap-3 hover:text-foreground">
                  {inner}
                </a>
              ) : (
                <div key={item.label} className="flex items-center gap-3">
                  {inner}
                </div>
              )
            })}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" asChild>
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </Button>
          </div>

          <Button variant="outline" asChild>
            <a href="/three-products-deck.pptx" download>
              <FileDown className="h-4 w-4" /> Download product deck (.pptx)
            </a>
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <input
              required
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <textarea
            required
            rows={5}
            placeholder="Tell me about your project…"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button type="submit" size="lg">
            Send message <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}. Built with React, Vite & Tailwind CSS.
      </p>
    </div>
  )
}
