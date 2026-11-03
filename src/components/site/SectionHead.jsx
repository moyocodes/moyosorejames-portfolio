import Reveal from '@/components/Reveal'

/** Section opener: numbered mono label, two-tone heading, one sentence. Pass the coloured part as `accent`. */
export default function SectionHead({ number, label, title, accent, children, className }) {
  return (
    <Reveal className={className}>
      <p className="label mb-4">
        <span className="label-num">{number}</span>
        <span className="label-line" aria-hidden="true" />
        {label}
      </p>
      <h2 className="text-balance text-[1.7rem] !leading-[1.15] sm:text-[2.2rem]">
        {title} {accent && <span className="text-pop">{accent}</span>}
      </h2>
      {children && <p className="mt-4 max-w-xl text-pretty text-muted-foreground">{children}</p>}
    </Reveal>
  )
}
