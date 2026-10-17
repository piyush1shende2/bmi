// Recommendation engine: picks tips by metric + category label / level
const T = {
  bmi: {
    Underweight: ['Add nutrient-dense calories: nuts, dairy or soy, eggs, pulses, whole grains.', 'Include strength training to build muscle, and ask a doctor to rule out underlying causes.'],
    'Healthy weight': ['Keep your routine going: balanced plates and about 150 minutes of activity per week.'],
    Overweight: ['Aim for gradual loss of 0.25–0.5 kg per week with smaller portions and fewer sugary drinks.', 'Walk briskly 30 minutes a day, then add strength sessions twice a week.'],
    Obesity: ['Set a first goal of losing 5–10% of body weight, and discuss a supervised plan with your doctor.', 'Swap refined carbs and fried snacks for vegetables, pulses and lean protein.'],
  },
  waist: {
    healthy: ['Your waist is in a good range. Keep up regular movement and enough sleep.'],
    risk: ['Extra waist fat raises heart and sugar risks. Focus on daily walks, fibre-rich meals and less sugar.', 'Re-measure monthly at the navel, after breathing out.'],
  },
  fasting: {
    good: ['Fasting sugar looks typical. Recheck once or twice a year.'],
    watch: ['Retest fasting sugar on another morning (8+ hours without food) and ask about an HbA1c test.', 'Cut sweet drinks, favour whole grains and add a 10–15 minute walk after meals.'],
    high: ['This fasting reading suggests follow-up is needed. Book a lab test (fasting glucose and HbA1c) with a clinician.'],
  },
  post: {
    good: ['After-meal sugar looks steady. Keep meals balanced with fibre and protein.'],
    watch: ['Try a 10–15 minute walk after meals, and fill half the plate with vegetables.', 'Retest after a similar meal to see if the pattern repeats.'],
    high: ['Repeated high after-meal readings should be reviewed by a clinician. Note what you ate before each reading.'],
  },
  pulse: {
    good: ['Resting pulse is in the usual range. Regular walking keeps it steady.'],
    watch: ['Rest 5 minutes, then count again. Caffeine, stress, poor sleep or fever can change pulse.'],
    high: ['A resting pulse this fast should be rechecked. See a doctor if it stays high or you feel dizzy or breathless.'],
  },
  bp: {
    good: ['Blood pressure is healthy. Keep salt moderate and stay active.'],
    watch: ['Reduce salt, limit processed food and get 7–8 hours of sleep. Re-measure on several days.'],
    high: ['Re-measure after 5 minutes of rest, seated and relaxed. If it stays high, see a doctor soon.', 'Eat less salt, add potassium-rich foods (banana, spinach, beans) and avoid smoking.'],
    urgent: ['Rest 5 minutes and measure again. If still above 180/120, get medical help now. Call emergency services for chest pain, breathlessness, weakness, vision change or trouble speaking.'],
  },
}
export const GENERAL = ['Drink water through the day and sleep 7–8 hours.', 'Manage stress with breathing, walking or hobbies.', 'Take this report to your doctor to discuss any readings marked Watch or High.']

export function recommend(components) {
  const out = []
  for (const c of components) {
    let tips
    if (c.key === 'bmi') tips = T.bmi[c.label]
    else if (c.key === 'waist') tips = c.level === 'good' ? T.waist.healthy : T.waist.risk
    else tips = T[c.key]?.[c.level] || T[c.key]?.high
    if (tips) out.push({ area: c.title, level: c.level, tips })
  }
  return out
}
