import { ArrowRight, FileDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Ticker from '@/components/Ticker'
import EmbedFrame from '@/components/mock/EmbedFrame'
import { useDeck } from '@/components/deck/Deck'
import { openTemplates } from '@/hooks/useTemplatesDrawer'
import { requestProject } from '@/hooks/useRequestedProject'
import { heroStats, profile, projects } from '@/data/content'

const tickerItems = [
  'Full-Stack Development',
  'ERP & Business Systems',
  'AI-Integrated Engineering',
  'Backend & DevOps',
  'CMS & Content Platforms',
  'React · Node · Laravel · FastAPI',
]

const mad = projects.find((p) => p.name === 'Mindfully Articulated')
const abanitunrase = projects.find((p) => p.name === 'Abánítúnráse')
const fileFlowHQ = projects.find((p) => p.name === 'FileFlowHQ')

export default function HeroPanel({ active }) {
  const deck = useDeck()
  const go = (id) => {
    const i = deck.panels.findIndex((p) => p.id === id)
    if (i >= 0) deck.goTo(i)
  }

  const openInSlideshow = (project) => {
    if (!project) return go('projects')
    requestProject(project.name)
    go('projects')
  }

  return (
    <div className="grid w-full grid-cols-1 items-center gap-8 pb-10 lg:grid-cols-[1.05fr_1fr]">
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] bg-background">
        <Ticker items={tickerItems} />
      </div>
      {/* Copy */}
      <div className="min-w-0 text-center lg:text-left">
        <p className="eyebrow mb-4 justify-center lg:justify-start">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Full-stack developer / Lagos / Open to work
        </p>

        <h1 className="text-balance font-display text-[clamp(2.1rem,4.6vw,4.3rem)] font-extrabold leading-[1] tracking-[-0.04em]">
          I build systems
          <br />
          <span className="font-serif text-[1.08em] font-normal italic text-primary">end to end.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-[0.9rem] leading-[1.7] text-foreground/60 lg:mx-0">
          I'm <span className="font-semibold text-foreground">{profile.name}</span> — a full-stack
          developer in {profile.location} shipping frontend, backend, and DevOps for production
          systems, with LLMs woven into the workflow.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
          <Button onClick={() => go('projects')}>
            Explore my work <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={openTemplates}>
            <Sparkles className="h-4 w-4" /> Templates for sale
          </Button>
          <Button variant="outline" asChild>
            <a href={profile.links.cv} download className="inline-flex items-center gap-2">
              <FileDown className="h-4 w-4" /> Download CV
            </a>
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 lg:justify-start">
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
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-border pt-5 sm:grid-cols-4">
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <dt className="font-display text-2xl font-extrabold leading-none">{stat.value}</dt>
              <dd className="mt-2 font-mono text-[0.65rem] uppercase leading-tight tracking-[0.06em] text-muted-foreground">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Floating device showcase — real live-site previews */}
      <div className="relative hidden h-[400px] lg:block" style={{ perspective: '1200px' }}>
        <div
          role="button"
          tabIndex={0}
          onClick={() => openInSlideshow(mad)}
          onKeyDown={(e) => e.key === 'Enter' && openInSlideshow(mad)}
          aria-label={`View ${mad?.name} in the project slideshow`}
          className="absolute right-0 top-2 w-[420px] animate-float-slow cursor-pointer transition-transform hover:scale-[1.015]"
          style={{ transform: 'rotateY(-14deg) rotateX(6deg)' }}
        >
          <EmbedFrame
            url={mad?.liveUrl}
            accent={mad?.accent || '#d9441f'}
            fallbackScene={mad?.scene}
            viewportClassName="aspect-[16/10]"
            screenshotOnly
          />
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => openInSlideshow(abanitunrase)}
          onKeyDown={(e) => e.key === 'Enter' && openInSlideshow(abanitunrase)}
          aria-label={`View ${abanitunrase?.name} in the project slideshow`}
          className="absolute -left-2 bottom-0 w-[220px] animate-float cursor-pointer transition-transform hover:scale-[1.015]"
          style={{ animationDelay: '1s' }}
        >
          <EmbedFrame
            url={abanitunrase?.liveUrl}
            accent={abanitunrase?.accent || '#db2777'}
            fallbackScene={abanitunrase?.scene}
            viewportClassName="aspect-[9/14]"
            screenshotOnly
          />
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => openInSlideshow(fileFlowHQ)}
          onKeyDown={(e) => e.key === 'Enter' && openInSlideshow(fileFlowHQ)}
          aria-label={`View ${fileFlowHQ?.name} in the project slideshow`}
          className="absolute bottom-10 right-2 w-[250px] animate-float cursor-pointer transition-transform hover:scale-[1.015]"
          style={{ animationDelay: '0.5s', transform: 'rotateY(10deg) rotateX(-4deg)' }}
        >
          <EmbedFrame
            url={fileFlowHQ?.liveUrl}
            accent={fileFlowHQ?.accent || '#0d9488'}
            fallbackScene={fileFlowHQ?.scene}
            viewportClassName="aspect-[16/10]"
            screenshotOnly
          />
        </div>
      </div>
    </div>
  )
}
