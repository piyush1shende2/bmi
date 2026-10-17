import { recommend } from './recommendations'

export const LEVELS = {
  good: { label: 'Healthy', score: 100, icon: '✓' },
  watch: { label: 'Watch', score: 65, icon: '!' },
  high: { label: 'High', score: 30, icon: '▲' },
  urgent: { label: 'Urgent', score: 5, icon: '⚠' },
}

export const num = (v) => {
  const n = parseFloat(v)
  return Number.isFinite(n) && n > 0 ? n : null
}
const pick = (v, steps) => steps.find((s) => v < s.max)

const BMI = [{ max: 18.5, level: 'watch', label: 'Underweight' }, { max: 25, level: 'good', label: 'Healthy weight' }, { max: 30, level: 'watch', label: 'Overweight' }, { max: Infinity, level: 'high', label: 'Obesity' }]
const WHTR = [{ max: 0.4, level: 'watch', label: 'Low' }, { max: 0.5, level: 'good', label: 'Healthy' }, { max: 0.6, level: 'watch', label: 'Increased risk' }, { max: Infinity, level: 'high', label: 'High risk' }]
const FAST = [{ max: 70, level: 'watch', label: 'Low' }, { max: 100, level: 'good', label: 'Normal' }, { max: 126, level: 'watch', label: 'Prediabetes range' }, { max: Infinity, level: 'high', label: 'Diabetes range' }]
const POST = [{ max: 70, level: 'watch', label: 'Low' }, { max: 140, level: 'good', label: 'Typical' }, { max: 180, level: 'watch', label: 'Higher than usual' }, { max: Infinity, level: 'high', label: 'High' }]

export function classifyBp(s, d) {
  if (s > 180 || d > 120) return { level: 'urgent', label: 'Crisis range' }
  if (s >= 140 || d >= 90) return { level: 'high', label: 'High – Stage 2' }
  if (s >= 130 || d >= 80) return { level: 'high', label: 'High – Stage 1' }
  if (s >= 120) return { level: 'watch', label: 'Elevated' }
  if (s < 90 || d < 60) return { level: 'watch', label: 'Low' }
  return { level: 'good', label: 'Normal' }
}

export function buildReport(f) {
  const h = num(f.height), w = num(f.weight), waist = num(f.waist)
  const fasting = num(f.fasting), post = num(f.post), sys = num(f.sys), dia = num(f.dia), pulse = num(f.pulse)
  const c = []
  const m = h / 100
  const bmi = w / (m * m)
  c.push({ key: 'bmi', title: 'BMI', value: bmi.toFixed(1), unit: 'kg/m²', ...pick(bmi, BMI),
    note: `Healthy weight for your height: ${(18.5 * m * m).toFixed(0)}–${(24.9 * m * m).toFixed(0)} kg.` })
  let whtr = null
  if (waist) {
    whtr = waist / h
    c.push({ key: 'waist', title: 'Waist-to-height', value: whtr.toFixed(2), unit: 'ratio', ...pick(whtr, WHTR),
      note: `Waist ${waist} cm. Keeping your waist under half your height is a good target.` })
  }
  if (fasting) c.push({ key: 'fasting', title: 'Fasting sugar', value: fasting, unit: 'mg/dL', ...pick(fasting, FAST), note: 'Measured after 8+ hours without food.' })
  if (post) c.push({ key: 'post', title: 'Post-meal sugar', value: post, unit: 'mg/dL', ...pick(post, POST), note: 'Measured 1.5 hours after starting a meal.' })
  if (sys && dia) c.push({ key: 'bp', title: 'Blood pressure', value: `${sys}/${dia}`, unit: 'mmHg', ...classifyBp(sys, dia), note: 'The higher of the two categories applies.' })
  if (pulse) c.push({ key: 'pulse', title: 'Pulse rate', value: pulse, unit: 'BPM', ...pick(pulse, [{ max: 60, level: 'watch', label: 'Low' }, { max: 101, level: 'good', label: 'Normal' }, { max: 121, level: 'watch', label: 'Fast' }, { max: Infinity, level: 'high', label: 'Very fast' }]), note: 'Resting adult range is 60–100 BPM. Count after 5 minutes of rest.' })

  let insight = null
  const fc = c.find((x) => x.key === 'fasting'), pc = c.find((x) => x.key === 'post')
  if (fc && pc) {
    if (fc.level === 'good' && pc.level === 'good') insight = 'Both sugar readings are in typical ranges.'
    else if (fc.level !== 'good') insight = 'Your fasting reading suggests follow-up may be needed. Ask a clinician about an HbA1c test.'
    else insight = 'Fasting sugar is typical, but the after-meal reading is higher than usual. Check what you ate and retest.'
  } else if (fc && fc.level !== 'good') insight = 'Your fasting reading suggests follow-up may be needed. Add an after-meal reading for a fuller picture.'
  else if (pc && pc.level !== 'good') insight = 'After-meal sugar is higher than usual. Add a fasting reading for a fuller picture.'

  const score = Math.round(c.reduce((a, x) => a + LEVELS[x.level].score, 0) / c.length)
  return {
    components: c, score, insight, whtr, bmi,
    urgent: c.some((x) => x.level === 'urgent'),
    recs: recommend(c),
    values: { bmi: +bmi.toFixed(1), weight: w, waist, fasting, post, sys, dia, pulse },
  }
}
