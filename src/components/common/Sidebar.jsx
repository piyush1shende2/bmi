const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Sidebar({ onRanges, onGuide, onMeasure }) {
  const items = [['⌂', 'Home', () => go('home')], ['♥', 'Report', () => go('report')], ['∿', 'Trends', () => go('trends')], ['☰', 'Ranges', onRanges], ['📏', 'How-to', onMeasure], ['🐾', 'Guide', onGuide]]
  return (
    <nav className="rail" aria-label="Main">
      {items.map(([i, l, f]) => <button key={l} onClick={f}><span aria-hidden="true">{i}</span><small>{l}</small></button>)}
    </nav>
  )
}
