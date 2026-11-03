import { useState } from 'react'
import { Check, Copy, FileDown, FileText, Github, Linkedin, Palette, Phone, Send, ShoppingBag } from 'lucide-react'
import SectionHead from '@/components/site/SectionHead'
import { Button, buttonVariants } from '@/components/ui/button'
import { profile } from '@/data/content'
import { openTemplates } from '@/hooks/useTemplatesDrawer'

const fieldClass = 'w-full rounded-lg border border-input bg-background px-3 py-2'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [copied, setCopied] = useState(false)
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section site pb-8">
      <div>
        

        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-2">
          <div>
            <SectionHead number="07" label="Contact" title="Got something" accent="that needs building?">
          A role, a product, a half-formed idea. Send it over.
        </SectionHead>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <a href={`mailto:${profile.email}`} className="break-all font-medium underline underline-offset-4">
                {profile.email}
              </a>
              <Button variant="outline" size="sm" onClick={copyEmail} aria-live="polite">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>

            <ul className="mt-4 space-y-1.5 text-sm">
              <li>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-3 hover:underline">
                  <Phone className="h-4 w-4 text-muted-foreground" /> {profile.phone}
                </a>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <a href={profile.links.cv} target="_blank" rel="noreferrer" className={buttonVariants()}>
                <FileText className="h-4 w-4" /> View CV
              </a>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline' })}>
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline' })}>
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href={profile.links.designPortfolio} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline' })}>
                <Palette className="h-4 w-4" /> Design portfolio
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="panel flex flex-col gap-4 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">Name</label>
                <input id="contact-name" required autoComplete="name" value={form.name} onChange={update('name')} className={fieldClass} />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">Email</label>
                <input id="contact-email" required type="email" autoComplete="email" value={form.email} onChange={update('email')} className={fieldClass} />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">What’s on your mind?</label>
              <textarea id="contact-message" required rows={5} value={form.message} onChange={update('message')} className={fieldClass} />
            </div>
            <Button type="submit" className="self-start">
              Write the email <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-2 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <button onClick={openTemplates} className="inline-flex items-center gap-2 font-medium hover:text-foreground">
              <ShoppingBag className="h-4 w-4" /> Templates I sell
            </button>
            <a href="/three-products-deck.pptx" download className="inline-flex items-center gap-2 font-medium hover:text-foreground">
              <FileDown className="h-4 w-4" /> The product deck (.pptx)
            </a>
          </div>
        </footer>
      </div>
    </section>
  )
}
