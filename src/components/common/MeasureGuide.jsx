import { useEffect, useState } from 'react'
import { HELP, GUIDE_TOPICS } from '../../utils/help'
import Illustration from './Illustration'

export default function MeasureGuide({ topic, onClose }) {
  const [t, setT] = useState(topic)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  const h = HELP[t]
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="How to measure at home" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>How to measure at home</h2>
          <button className="orb-btn" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="chips" role="tablist">
          {GUIDE_TOPICS.map((k) => <button key={k} role="tab" aria-selected={k === t} className={`chip ${k === t ? 'on' : ''}`} onClick={() => setT(k)}>{HELP[k].title}</button>)}
        </div>
        <div className="guide">
          <div className="illus"><Illustration topic={t} /></div>
          <div>
            <p className="def"><strong>{h.title}:</strong> {h.def}</p>
            <h3>{t === 'bmi' ? 'How to work it out' : 'Easy steps'}</h3>
            <ol className="steps">{h.how.map((s) => <li key={s}>{s}</li>)}</ol>
            {h.levels.length > 0 && (
              <>
                <h3>Recommended levels</h3>
                <ul className="lv">{h.levels.map(([l, r, lv]) => <li key={l}><i className={`dot ${lv}`} /><span><b>{l}:</b> {r}</span></li>)}</ul>
              </>
            )}
            <p className="muted">Tip: {h.tip}</p>
            {h.link && <p><a className="link" href={h.link[0]} target="_blank" rel="noopener noreferrer">See the wikiHow photo guide for {h.link[1].toLowerCase()} ↗</a></p>}
          </div>
        </div>
      </div>
    </div>
  )
}
