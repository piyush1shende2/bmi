// Reference tables shown in the Reference modal
export const REFERENCE = [
  { title: 'BMI (adults 20+)', head: ['BMI', 'Category'], rows: [['Below 18.5', 'Underweight'], ['18.5 – 24.9', 'Healthy weight'], ['25.0 – 29.9', 'Overweight'], ['30.0 and above', 'Obesity']] },
  { title: 'Waist-to-height ratio', head: ['Ratio', 'Category'], rows: [['Below 0.40', 'Low'], ['0.40 – 0.49', 'Healthy'], ['0.50 – 0.59', 'Increased risk'], ['0.60 and above', 'High risk']] },
  { title: 'Fasting sugar (mg/dL)', head: ['Reading', 'Category'], rows: [['Below 70', 'Low'], ['70 – 99', 'Normal'], ['100 – 125', 'Prediabetes range'], ['126 and above', 'Diabetes range*']] },
  { title: 'Post-meal sugar, 1.5 hrs (mg/dL)', head: ['Reading', 'Category'], rows: [['Below 70', 'Low'], ['70 – 139', 'Typical'], ['140 – 179', 'Higher than usual'], ['180 and above', 'High']] },
  { title: 'Blood pressure (mmHg)', head: ['Systolic / Diastolic', 'Category'], rows: [['< 120 and < 80', 'Normal'], ['120–129 and < 80', 'Elevated'], ['130–139 or 80–89', 'High – Stage 1'], ['140+ or 90+', 'High – Stage 2'], ['> 180 and/or > 120', 'Crisis range – seek care']] },
  { title: 'Resting pulse (BPM)', head: ['Reading', 'Category'], rows: [['Below 60', 'Low'], ['60 – 100', 'Normal'], ['101 – 120', 'Fast'], ['Above 120', 'Very fast']] },
]
export const REF_NOTES = [
  'These are screening ranges, not a diagnosis. Diabetes needs confirmation by laboratory tests (fasting glucose, HbA1c).',
  'A 1.5-hour reading after an ordinary meal cannot be judged with 2-hour glucose-tolerance-test thresholds. Treat it as a pattern, not a verdict.',
  'Sources: CDC diabetes testing guidance, American Heart Association blood pressure categories, WHO BMI classification.',
]
