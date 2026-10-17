import { LEVELS } from '../../utils/health'
import RangeBar from '../charts/RangeBar'
import HelpTip from '../common/HelpTip'

const G = '#BFD8C6', B = '#A9C4E0', A = '#F6D49A', C = '#EE9C8F'
const BARS = {
  waist: { min: 0.3, max: 0.7, bands: [{ to: 0.4, color: B, label: 'Low' }, { to: 0.5, color: G, label: 'Healthy' }, { to: 0.6, color: A, label: 'Risk' }, { to: 0.7, color: C, label: 'High' }] },
  fasting: { min: 50, max: 160, bands: [{ to: 70, color: B, label: 'Low' }, { to: 100, color: G, label: 'Normal' }, { to: 126, color: A, label: 'Prediabetes' }, { to: 160, color: C, label: 'Diabetes' }] },
  pulse: { min: 40, max: 140, bands: [{ to: 60, color: B, label: 'Low' }, { to: 100, color: G, label: 'Normal' }, { to: 120, color: A, label: 'Fast' }, { to: 140, color: C, label: 'Very fast' }] },
  post: { min: 50, max: 240, bands: [{ to: 70, color: B, label: 'Low' }, { to: 140, color: G, label: 'Typical' }, { to: 180, color: A, label: 'Higher' }, { to: 240, color: C, label: 'High' }] },
}

export default function MetricCard({ c, onGuide }) {
  const bar = BARS[c.key]
  const sys = c.key === 'bp' ? +c.value.split('/')[0] : null
  const dia = c.key === 'bp' ? +c.value.split('/')[1] : null
  return (
    <article className={`card lvl-${c.level}`}>
      <header>
        <h3>{c.title} <HelpTip topic={c.key} onGuide={onGuide} /></h3>
        <span className="badge"><b aria-hidden="true">{LEVELS[c.level].icon}</b> {c.label}</span>
      </header>
      <p className="big">{c.value}<small> {c.unit}</small></p>
      {bar && <RangeBar {...bar} value={+c.value} unit={c.unit} />}
      {c.key === 'bp' && (
        <>
          <RangeBar min={80} max={200} value={sys} unit="systolic" bands={[{ to: 120, color: G, label: 'Normal' }, { to: 130, color: A, label: 'Elevated' }, { to: 140, color: '#F2B59A', label: 'Stage 1' }, { to: 200, color: C, label: 'Stage 2+' }]} />
          <RangeBar min={50} max={130} value={dia} unit="diastolic" bands={[{ to: 80, color: G, label: 'Normal' }, { to: 90, color: '#F2B59A', label: 'Stage 1' }, { to: 130, color: C, label: 'Stage 2+' }]} />
        </>
      )}
      <p className="note">{c.note}</p>
    </article>
  )
}
