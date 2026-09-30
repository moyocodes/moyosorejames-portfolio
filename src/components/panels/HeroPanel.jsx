import { ArrowRight, FileDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import EmbedFrame from '@/components/mock/EmbedFrame'
import { useDeck } from '@/components/deck/Deck'
import { requestProject } from '@/hooks/useRequestedProject'
import { heroStats, profile, projects } from '@/data/content'

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
    <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
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
          <Button size="lg" variant="outline" asChild>
            <a href={profile.links.cv} download>
              <FileDown className="h-4 w-4" /> Download CV
            </a>
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
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card/70 px-4 py-3 text-center backdrop-blur transition-colors hover:border-primary/40 lg:text-left"
            >
              <dt className="gradient-text text-3xl font-extrabold leading-none">{stat.value}</dt>
              <dd className="mt-1.5 text-xs leading-tight text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Floating device showcase — real live-site previews */}
      <div className="relative hidden h-[440px] lg:block" style={{ perspective: '1200px' }}>
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
            accent={mad?.accent || '#10b981'}
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
