import { useEffect } from 'react'
import { REFERENCE, REF_NOTES } from '../../utils/reference'

export default function ReferenceModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Reference ranges" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>Reference ranges</h2>
          <button className="orb-btn" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="ref-grid">
          {REFERENCE.map((t) => (
            <section key={t.title} className="ref-card">
              <h3>{t.title}</h3>
              <table>
                <thead><tr>{t.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>{t.rows.map((r) => <tr key={r[0]}>{r.map((c) => <td key={c}>{c}</td>)}</tr>)}</tbody>
              </table>
            </section>
          ))}
        </div>
        <ul className="notes">{REF_NOTES.map((n) => <li key={n}>{n}</li>)}</ul>
      </div>
    </div>
  )
}
