import { forwardRef, useImperativeHandle, useRef } from 'react'

const W = 680
const D = 450
const H = 432
const T = 13
const CLOSED = -89.4
const OPEN = 11

const face = 'absolute left-0 top-0'
const silver = 'linear-gradient(180deg, #e4e4e6 0%, #cfd0d3 55%, #b9babf 100%)'

// Key widths per row, as on a real keyboard. Each number is a share of the row.
const ROWS = [
  Array(14).fill(1),
  [...Array(13).fill(1), 1.5],
  [1.5, ...Array(13).fill(1)],
  [1.8, ...Array(11).fill(1), 1.8],
  [2.3, ...Array(10).fill(1), 2.3],
  [1, 1, 1.2, 1.4, 5.4, 1.4, 1.2, 1, 1, 1],
]

function Keyboard() {
  return (
    <div className="flex h-full flex-col gap-[4px] rounded-md bg-[#2a2a2d] p-[5px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.7)]">
      {ROWS.map((row, r) => (
        <div key={r} className={`flex gap-[4px] ${r === 0 ? 'flex-[0.6]' : 'flex-1'}`}>
          {row.map((grow, k) => (
            <span key={k} className="rounded-[3px] bg-gradient-to-b from-[#1b1b1d] to-[#111113] shadow-[0_1px_0_rgba(255,255,255,0.12)]" style={{ flexGrow: grow, flexBasis: 0 }} />
          ))}
        </div>
      ))}
    </div>
  )
}

/**
 * A CSS 3D laptop. The parent drives it through `setPose`, so scrolling and clicks can share
 * one timeline. Anything passed as children renders on the screen.
 */
const lid_ = (el, angle) => (el.style.transform = `translateZ(${-D / 2}px) rotateX(${angle}deg)`)

const Laptop = forwardRef(function Laptop({ children }, ref) {
  const stage = useRef(null)
  const lidRef = useRef(null)
  const screenOff = useRef(null)
  const glow = useRef(null)
  const content = useRef(null)

  useImperativeHandle(ref, () => ({
    // lid: 0 shut to 1 open, then back towards 0 only ever means facing the camera (see `opening`).
    setPose({ opening, lid, tilt, power, content: contentOpacity }) {
      const openAngle = OPEN * (lid / Math.max(opening, 0.001))
      lid_(lidRef.current, CLOSED + (openAngle - CLOSED) * opening)
      stage.current.style.transform = `rotateX(${tilt}deg)`
      screenOff.current.style.opacity = 1 - power
      glow.current.style.opacity = power * contentOpacity
      content.current.style.opacity = contentOpacity
      content.current.inert = power < 0.9 || contentOpacity < 0.9
    },
  }))

  return (
    <div style={{ transformStyle: 'preserve-3d' }}>
      <div ref={stage} className="relative" style={{ width: W, marginLeft: -W / 2, transformStyle: 'preserve-3d', transform: 'rotateX(-34deg)' }}>
        {/* Light the open screen throws on the desk */}
        <div ref={glow} className={`${face} opacity-0`} style={{ width: W * 1.5, height: D * 1.5, left: -W * 0.25, top: (-D * 1.5) / 2, transform: `translateY(${T + 1}px) rotateX(90deg)`, background: 'radial-gradient(50% 50% at 50% 40%, rgba(232,162,124,0.35), transparent 75%)' }} aria-hidden="true" />
        {/* Contact shadow */}
        <div className={face} style={{ width: W * 1.12, height: D * 1.12, left: -W * 0.06, top: (-D * 1.12) / 2, transform: `translateY(${T + 2}px) rotateX(90deg)`, background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.75) 55%, transparent 100%)' }} aria-hidden="true" />

        {/* Base */}
        <div className={face} style={{ width: W, height: D, top: -D / 2, transform: 'rotateX(90deg)', background: silver, borderRadius: 14, padding: '20px 34px 16px' }} aria-hidden="true">
          <div className="absolute left-[12%] right-[12%] top-0 h-2 rounded-b-md bg-[#88898e]" />
          <div className="h-[56%] pt-2"><Keyboard /></div>
          <div className="mx-auto mt-4 h-[33%] w-[44%] rounded-lg border border-[#a9aaaf] bg-gradient-to-b from-[#d3d4d7] to-[#c5c6ca] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]" />
        </div>
        {/* Underside and edges */}
        <div className={face} style={{ width: W, height: D, top: -D / 2, transform: `translateY(${T}px) rotateX(-90deg)`, background: '#55565a', borderRadius: 14 }} aria-hidden="true" />
        <div className={face} style={{ width: W, height: T, borderRadius: '0 0 12px 12px', transform: `translateZ(${D / 2}px)`, background: 'linear-gradient(180deg, #d6d7da, #8e8f94)' }} aria-hidden="true">
          <span className="absolute left-1/2 top-0 h-[5px] w-20 -translate-x-1/2 rounded-b-md bg-[#8d8e93]" />
        </div>
        <div className={face} style={{ width: W, height: T, transform: `translateZ(${-D / 2}px)`, background: '#77787d' }} aria-hidden="true" />
        <div className={face} style={{ width: D, height: T, left: (W - D) / 2, transform: `rotateY(90deg) translateZ(${W / 2}px)`, background: 'linear-gradient(180deg, #c4c5c9, #8e8f94)' }} aria-hidden="true" />
        <div className={face} style={{ width: D, height: T, left: (W - D) / 2, transform: `rotateY(-90deg) translateZ(${W / 2}px)`, background: 'linear-gradient(180deg, #c4c5c9, #8e8f94)' }} aria-hidden="true" />

        {/* Lid */}
        <div ref={lidRef} className={face} style={{ width: W, height: H, top: -H, transformOrigin: '50% 100%', transformStyle: 'preserve-3d', transform: `translateZ(${-D / 2}px) rotateX(${CLOSED}deg)` }}>
          <div className="absolute inset-0 rounded-[16px] bg-[#0b0b0c] p-[13px] shadow-[inset_0_0_0_1px_#3b3c40]" style={{ backfaceVisibility: 'hidden' }}>
            <span className="absolute left-1/2 top-[5px] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-[#26272b]" aria-hidden="true" />
            <div className="wallpaper relative h-full overflow-hidden rounded-[4px]">
              <img src="/mj-logo.png" alt="" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2 opacity-[0.14] mix-blend-screen" />
              <div ref={content} className="absolute inset-0">{children}</div>
              {/* Glass reflection, and the black of a screen that's off */}
              <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 28%, transparent 42%)' }} aria-hidden="true" />
              <div ref={screenOff} className="pointer-events-none absolute inset-0 bg-[#050505]" aria-hidden="true" />
            </div>
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center rounded-[16px]"
            style={{ background: 'linear-gradient(160deg, #eaeaec, #c8c9cd 60%, #b4b5ba)', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            aria-hidden="true"
          >
            <span className="font-display text-5xl font-light tracking-tight text-[#a4a5aa]">MJ</span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Laptop
