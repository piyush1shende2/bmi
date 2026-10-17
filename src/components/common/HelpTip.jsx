import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { HELP } from '../../utils/help'

// "?" button: hover, tap or keyboard opens a help box that floats above every card.
// It is rendered in document.body so no card can paint over it, and it closes when the cursor leaves.
export default function HelpTip({ topic, onGuide }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ left: 0, top: 0 })
  const btn = useRef(null)
  const pop = useRef(null)
  const h = HELP[topic]

  // Place the box under the button, kept inside the screen (flips above when there is no room below)
  useLayoutEffect(() => {
    if (!open || !btn.current || !pop.current) return
    const b = btn.current.getBoundingClientRect()
    const p = pop.current.getBoundingClientRect()
    const left = Math.max(10, Math.min(b.left - 8, window.innerWidth - p.width - 10))
    const below = b.bottom + 8
    const top = below + p.height > window.innerHeight - 10 ? Math.max(10, b.top - p.height - 8) : below
    setPos({ left, top })
  }, [open])

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('scroll', close, { passive: true, capture: true })
    window.addEventListener('resize', close)
    return () => { window.removeEventListener('scroll', close, true); window.removeEventListener('resize', close) }
  }, [open])

  if (!h) return null
  return (
    <span className="tip" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && !pop.current?.contains(e.relatedTarget) && setOpen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
      <button ref={btn} type="button" className="tip-btn" aria-label={`What is ${h.title}?`} aria-expanded={open} onClick={() => setOpen(true)}>?</button>
      {open && createPortal(
        <>
          <div className="tip-dim" />
          <div className="tip-pop" ref={pop} style={{ left: pos.left, top: pos.top }} role="dialog" aria-label={h.title}>
            <button type="button" className="tip-x" onClick={() => setOpen(false)} aria-label="Close help">×</button>
            <strong>{h.title}</strong>
            <p>{h.def}</p>
            {h.levels.length > 0 && (
              <ul className="lv">{h.levels.map(([l, r, lv]) => <li key={l}><i className={`dot ${lv}`} /><span><b>{l}:</b> {r}</span></li>)}</ul>
            )}
            <button type="button" className="btn" onClick={() => { setOpen(false); onGuide(topic) }}>📖 Show me how to measure</button>
          </div>
        </>,
        document.body
      )}
    </span>
  )
}
