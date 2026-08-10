import { ArrowRight, Github, Linkedin, Mail, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BrowserMock, PhoneMock } from '@/components/mock/DeviceMock'
import { UIScene } from '@/components/mock/UIScene'
import { useDeck } from '@/components/deck/Deck'
import { profile, projects, templates } from '@/data/content'

const fantasyShowdown = projects.find((p) => p.name === 'Fantasy Showdown')
const abanitunrase = projects.find((p) => p.name === 'Abánítúnráse')

export default function HeroPanel({ active }) {
  const deck = useDeck()
  const go = (id) => {
    const i = deck.panels.findIndex((p) => p.id === id)
    if (i >= 0) deck.goTo(i)
  }

  return (
    <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
      {/* Copy */}
      <div className="text-center lg:text-left">
        <Badge
          variant="outline"
          className="mb-6 gap-2 border-primary/30 bg-background/50 py-1.5 pl-1.5 pr-3 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Available for freelance & full-time
        </Badge>

        <h1 className="text-balance text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
          I build <span className="gradient-text">AI-integrated</span>
          <br className="hidden sm:block" /> products, end to end.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0">
          I'm <span className="font-semibold text-foreground">{profile.name}</span> — a full-stack
          developer in {profile.location} shipping frontend, backend, and DevOps for production
          systems, with LLMs woven into the workflow.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <Button size="lg" onClick={() => go('projects')}>
            Explore my work <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => go('templates')}>
            <Sparkles className="h-4 w-4" /> Templates for sale
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" asChild>
              <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-left">
            <p className="text-xl font-bold">5+ yrs</p>
            <p className="text-xs text-muted-foreground">shipping products</p>
          </div>
        </div>
      </div>

      {/* Floating device showcase */}
      <div className="relative hidden h-[440px] lg:block" style={{ perspective: '1200px' }}>
        <div className="absolute right-0 top-2 w-[420px] animate-float-slow">
          <a
            href={fantasyShowdown?.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${fantasyShowdown?.name}`}
            style={{ transform: 'rotateY(-14deg) rotateX(6deg)' }}
            className="block transition-transform hover:scale-[1.02]"
          >
            <BrowserMock url="fantasyshowdown.com" glow="radial-gradient(circle, rgba(59,130,246,.5), transparent 70%)">
              <UIScene variant="dashboard" accent="#3b82f6" />
            </BrowserMock>
          </a>
        </div>
        <div className="absolute -left-2 bottom-0 w-[140px] animate-float" style={{ animationDelay: '1s' }}>
          <a
            href={abanitunrase?.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${abanitunrase?.name}`}
            className="block transition-transform hover:scale-[1.02]"
          >
            <PhoneMock>
              <UIScene variant="shop" accent="#db2777" />
            </PhoneMock>
          </a>
        </div>
        <div className="absolute bottom-10 right-2 w-[250px] animate-float" style={{ animationDelay: '0.5s' }}>
          <a
            href={templates[0]?.previewUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Preview ${templates[0]?.name}`}
            style={{ transform: 'rotateY(10deg) rotateX(-4deg)' }}
            className="block transition-transform hover:scale-[1.02]"
          >
            <BrowserMock url="lumen.studio" glow="radial-gradient(circle, rgba(217,119,6,.45), transparent 70%)">
              <UIScene variant="gallery" accent="#d97706" />
            </BrowserMock>
          </a>
        </div>
      </div>
    </div>
  )
}
