import { num } from './health'

// Buddy's daily-habit tips, tailored from age, weight and the latest report
export function buildGuide(form, report) {
  const age = num(form.age), w = num(form.weight)
  const lvl = (k) => report?.components.find((c) => c.key === k)?.level
  const sugar = ['fasting', 'post'].some((k) => ['watch', 'high'].includes(lvl(k)))
  const bp = ['watch', 'high', 'urgent'].includes(lvl('bp'))
  const bmi = report?.components[0]?.label
  const sleep = age && age < 18 ? '8–10' : age >= 65 ? '7–8' : '7–9'
  const eat = ['Fill half your plate with vegetables, add pulses, whole grains, curd and a fistful of nuts.']
  if (sugar) eat.push('Eat protein and fibre first, and walk 10 minutes after meals.')
  if (bp) eat.push('Add potassium: banana, spinach, coconut water.')
  if (bmi === 'Underweight') eat.push('Add milk, eggs, nuts and ghee-free healthy snacks between meals.')
  if (bmi === 'Overweight' || bmi === 'Obesity') eat.push('Use a smaller plate and stop at 80% full.')
  const avoid = ['Sugary drinks, sweets and fried snacks', 'too much salt (under 1 teaspoon a day)', 'smoking and alcohol.']
  if (sugar) avoid.unshift('White bread and refined flour items')
  return [
    { icon: '🐶', title: "Hi, I'm Buddy!", text: report ? 'Let me walk you through simple daily habits that fit your report.' : 'Here are simple daily habits. Generate your report and I will tailor them to you.' },
    { icon: '😴', title: 'Sleep', text: `Aim for ${sleep} hours a night, at the same time each day. Keep screens away for the last 30 minutes.` },
    { icon: '☀️', title: 'Sunlight', text: 'Get 10–20 minutes of morning sun on your face and arms. It helps vitamin D and your body clock. Use sunscreen for longer stays.' },
    { icon: '💧', title: 'Water', text: `${w ? `About ${(w * 0.033).toFixed(1)} litres a day` : 'About 2–3 litres a day'}, more in hot weather or after exercise. Follow your doctor's limit if you have heart or kidney conditions.` },
    { icon: '🥗', title: 'What to eat', text: eat.join(' ') },
    { icon: '🚫', title: 'What to limit', text: `${avoid.join(', ')}` },
    { icon: '🚶', title: 'Move', text: 'Walk 30 minutes a day (150 minutes a week) and stand up every hour you sit.' },
    { icon: '🩺', title: 'Check in', text: 'Take this report to your doctor to discuss anything marked Watch or High.' },
  ]
}
