// Horizontal banded bar with a white orb marker; bands = [{ to, color, label }]
export default function RangeBar({ min, max, value, bands, unit }) {
  let from = min
  const clamp = Math.min(max, Math.max(min, value))
  return (
    <div className="rangebar">
      <div className="bar">
        {bands.map((b) => {
          const w = ((Math.min(b.to, max) - from) / (max - min)) * 100
          from = Math.min(b.to, max)
          return <span key={b.label} style={{ width: `${w}%`, background: b.color }} title={b.label} />
        })}
        <i className="marker" style={{ left: `${((clamp - min) / (max - min)) * 100}%` }} aria-label={`${value} ${unit}`} />
      </div>
      <div className="legend">{bands.map((b) => <small key={b.label}><b style={{ background: b.color }} />{b.label}</small>)}</div>
    </div>
  )
}
