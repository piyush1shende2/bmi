import { useState } from 'react'

const METRICS = { bmi: 'BMI', weight: 'Weight (kg)', fasting: 'Fasting sugar', post: 'Post-meal sugar', sys: 'Systolic', dia: 'Diastolic', pulse: 'Pulse' }
const W = 560, H = 200, P = 34

export default function TrendChart({ history, onClear }) {
  const [metric, setMetric] = useState('bmi')
  const pts = history.map((e) => ({ d: new Date(e.date), v: e[metric] })).filter((p) => p.v != null)
  const vs = pts.map((p) => p.v)
  const lo = Math.min(...vs), hi = Math.max(...vs), span = hi - lo || 1
  const xy = pts.map((p, i) => [P + (pts.length === 1 ? (W - 2 * P) / 2 : (i * (W - 2 * P)) / (pts.length - 1)), H - P - ((p.v - lo) / span) * (H - 2 * P)])

  return (
    <section className="panel" id="trends">
      <div className="panel-head">
        <h2>Trends</h2>
        {history.length > 0 && <button className="link" onClick={onClear}>Clear history</button>}
      </div>
      <div className="chips" role="tablist">
        {Object.entries(METRICS).map(([k, l]) => (
          <button key={k} role="tab" aria-selected={k === metric} className={`chip ${k === metric ? 'on' : ''}`} onClick={() => setMetric(k)}>{l}</button>
        ))}
      </div>
      {pts.length === 0 ? (
        <p className="muted">Generate reports on different days to see how {METRICS[metric].toLowerCase()} changes.</p>
      ) : (
        <svg viewBox={`0 0 ${W} ${H}`} className="trend" role="img" aria-label={`${METRICS[metric]} over time`}>
          <line x1={P} y1={H - P} x2={W - P} y2={H - P} stroke="#33424D" />
          <polyline points={xy.map((p) => p.join(',')).join(' ')} fill="none" stroke="#2DD4A8" strokeWidth="3" strokeLinejoin="round" />
          {xy.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="7" fill="#0E151B" stroke="#F0556A" strokeWidth="3" />
              <text x={x} y={y - 13} textAnchor="middle" className="tick">{pts[i].v}</text>
              <text x={x} y={H - 10} textAnchor="middle" className="tick">{pts[i].d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</text>
            </g>
          ))}
        </svg>
      )}
    </section>
  )
}
