import { useEffect, useRef } from 'react'

/** Ring cursor that eases toward the pointer and swells over links/buttons. Fine-pointer devices only. */
export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const cur = ref.current
    document.body.classList.add('has-cursor')

    let tx = -100, ty = -100, x = -100, y = -100, raf
    const move = (e) => {
      tx = e.clientX
      ty = e.clientY
    }
    const over = (e) => cur.classList.toggle('hov', !!e.target.closest?.('a,button,[role="button"]'))
    const loop = () => {
      x += (tx - x) * 0.2
      y += (ty - y) * 0.2
      cur.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-cursor')
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <div
      id="cur"
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[99999] hidden h-7 w-7 rounded-full [@media(hover:hover)_and_(pointer:fine)]:block"
    />
  )
}
