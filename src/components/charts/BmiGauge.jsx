// Semicircle BMI gauge drawn in SVG (scale 15–40)
const MIN = 15, MAX = 40, CX = 150, CY = 150, R = 110
const BANDS = [[15, 18.5, '#A9C4E0'], [18.5, 25, '#BFD8C6'], [25, 30, '#F6D49A'], [30, 40, '#EE9C8F']]
const frac = (v) => (Math.min(MAX, Math.max(MIN, v)) - MIN) / (MAX - MIN)
const pt = (f, r = R) => [CX + r * Math.cos(Math.PI + f * Math.PI), CY + r * Math.sin(Math.PI + f * Math.PI)]

export default function BmiGauge({ value, label }) {
  const [nx, ny] = pt(frac(value), R - 28)
  return (
    <svg viewBox="0 0 300 190" className="gauge" role="img" aria-label={`BMI ${value}, ${label}`}>
      {BANDS.map(([a, b, color]) => {
        const [x1, y1] = pt(frac(a)), [x2, y2] = pt(frac(b))
        return <path key={a} d={`M${x1},${y1} A${R},${R} 0 0 1 ${x2},${y2}`} stroke={color} strokeWidth="26" fill="none" />
      })}
      <line x1={CX} y1={CY} x2={nx} y2={ny} stroke="#E8EEF2" strokeWidth="4" strokeLinecap="round" />
      <circle cx={CX} cy={CY} r="14" fill="#0E151B" stroke="#E8EEF2" strokeWidth="3" />
      <text x={CX} y={CY + 38} textAnchor="middle" className="gauge-val">{value}</text>
      <text x={CX} y={CY + 56} textAnchor="middle" className="gauge-lbl">{label}</text>
      <text x="22" y="170" className="tick">15</text>
      <text x="270" y="170" className="tick">40</text>
    </svg>
  )
}
