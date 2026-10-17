import { GENERAL } from '../../utils/recommendations'
import { LEVELS } from '../../utils/health'

export default function Recommendations({ recs, insight }) {
  return (
    <section className="panel">
      <h2>Recommendations</h2>
      {insight && <p className="insight"><strong>Diabetes check:</strong> {insight}</p>}
      <div className="rec-grid">
        {recs.map((r) => (
          <div key={r.area} className={`rec lvl-${r.level}`}>
            <h3><span aria-hidden="true">{LEVELS[r.level].icon}</span> {r.area}</h3>
            <ul>{r.tips.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        ))}
        <div className="rec">
          <h3>Everyday habits</h3>
          <ul>{GENERAL.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}
