/**
 * Markdown — a tiny, dependency-free renderer for the simple subset used by
 * blog posts: "## " subheadings, "- " bullet lists, and blank-line-separated
 * paragraphs. Inline **bold** is supported.
 */
export default function Markdown({ content, className }) {
  const blocks = parse(content || '')
  return (
    <div className={className}>
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2 key={i} className="mt-8 text-xl font-bold tracking-tight sm:text-2xl">
              {inline(block.text)}
            </h2>
          )
        }
        if (block.type === 'ul') {
          return (
            <ul key={i} className="my-4 space-y-2 pl-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-2 text-muted-foreground">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{inline(item)}</span>
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i} className="my-4 leading-relaxed text-muted-foreground">
            {inline(block.text)}
          </p>
        )
      })}
    </div>
  )
}

function parse(md) {
  const lines = md.split('\n')
  const blocks = []
  let para = []
  let list = []

  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: 'p', text: para.join(' ') })
      para = []
    }
  }
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: 'ul', items: list })
      list = []
    }
  }

  for (const line of lines) {
    const t = line.trim()
    if (t === '') {
      flushPara()
      flushList()
    } else if (t.startsWith('## ')) {
      flushPara()
      flushList()
      blocks.push({ type: 'h2', text: t.slice(3) })
    } else if (t.startsWith('- ')) {
      flushPara()
      list.push(t.slice(2))
    } else {
      flushList()
      para.push(t)
    }
  }
  flushPara()
  flushList()
  return blocks
}

// Render inline **bold** segments.
function inline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}
