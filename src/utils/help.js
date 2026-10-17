// Plain-language help: definition, home measuring steps, recommended levels.
// levels = [label, range, level]; level colours the dot (a text label is always shown too).
const WH = 'https://www.wikihow.com/'
export const HELP = {
  height: {
    title: 'Height',
    def: 'How tall you are, from the floor to the top of your head.',
    how: ['Take off shoes and hats. Stand on a hard floor (not carpet) with heels, back and head touching a flat wall.', 'Look straight ahead with your chin level. Keep feet together and shoulders relaxed.', 'Ask someone to rest a flat book on your head, flat against the wall, and mark the wall under it with a pencil.', 'Step away and measure from the floor to the mark with a tape. Write it in cm (1 inch = 2.54 cm, 1 foot = 30.5 cm).'],
    levels: [], tip: 'Measure in the morning. People are slightly taller after waking.', link: [WH + 'Measure-Your-Height-by-Yourself', 'Height'],
  },
  weight: {
    title: 'Weight',
    def: 'How heavy your body is, in kilograms (kg).',
    how: ['Put the scale on a hard, flat floor. Carpet gives wrong numbers.', 'Weigh yourself in the morning after using the toilet and before eating, in light clothes.', 'Stand still with your weight even on both feet and look straight ahead.', 'Read the number once it stops changing. (1 kg = 2.2 pounds.)'],
    levels: [], tip: 'Use the same scale at the same time of day each time.', link: [WH + 'Weigh-Yourself', 'Weight'],
  },
  waist: {
    title: 'Waist size',
    def: 'The distance around your middle, level with your belly button.',
    how: ['Stand straight and relax your belly. Do not suck it in.', 'Wrap a soft tape around bare skin (or thin clothes) at belly-button level, about halfway between your lowest rib and hip bone.', 'Keep the tape flat and level all the way round. Snug, not squeezing.', 'Breathe out normally, then read the number in cm.'],
    levels: [['Healthy', 'Waist is less than half your height', 'good'], ['Extra risk', 'Men 94 cm+, women 80 cm+', 'watch'], ['High risk', 'Men 102 cm+, women 88 cm+', 'high']], tip: 'A good target: waist less than half of your height.', link: [WH + 'Measure-Your-Waist', 'Waist'],
  },
  bmi: {
    title: 'BMI',
    def: 'Body Mass Index compares your weight with your height. It is a quick check, not a diagnosis.',
    how: ['Change your height to metres (170 cm = 1.70 m).', 'Multiply height by itself (1.70 × 1.70 = 2.89).', 'Divide your weight in kg by that number (70 ÷ 2.89 = 24.2). The app does this for you.'],
    levels: [['Underweight', 'Below 18.5', 'watch'], ['Healthy weight', '18.5 – 24.9', 'good'], ['Overweight', '25 – 29.9', 'watch'], ['Obesity', '30 and above', 'high']], tip: 'Children and teenagers need a doctor to read BMI.',
  },
  fasting: {
    title: 'Fasting sugar',
    def: 'Blood sugar after at least 8 hours without food, usually first thing in the morning. Water is fine.',
    how: ['Do not eat or drink anything except water for 8 hours.', 'Wash and dry your hands well.', 'Prick the side of a fingertip with the meter’s lancet and touch the drop to the test strip.', 'Read the number on the meter (mg/dL) and enter it here.'],
    levels: [['Normal', '70 – 99 mg/dL', 'good'], ['Prediabetes range', '100 – 125 mg/dL', 'watch'], ['Diabetes range', '126+ mg/dL (a lab must confirm)', 'high']], tip: 'One reading is not a diagnosis. Repeat on another day.',
  },
  post: {
    title: 'Post-meal sugar',
    def: 'Blood sugar 1.5 hours after you start eating a meal.',
    how: ['Note the time of your first bite and set a timer for 1.5 hours.', 'Test the same way as fasting sugar: clean hands, finger prick, test strip.', 'Write down what you ate. It helps your doctor.'],
    levels: [['Typical', 'Below 140 mg/dL', 'good'], ['Higher than usual', '140 – 179 mg/dL', 'watch'], ['High', '180+ mg/dL', 'high']], tip: 'Meals with lots of rice, bread or sweets raise this number more.',
  },
  bp: {
    title: 'Blood pressure',
    def: 'The force of blood pushing on your artery walls. The top number (systolic) is when the heart pumps. The bottom number (diastolic) is when it rests.',
    how: ['Avoid coffee, smoking and exercise for 30 minutes before.', 'Sit with your back supported, feet flat, arm resting at heart level.', 'Put the cuff on your bare upper arm. Stay still and quiet, then press start.', 'Take two readings one minute apart and enter the lower pair.'],
    levels: [['Normal', 'Below 120 / 80', 'good'], ['Elevated', '120 – 129 / below 80', 'watch'], ['High, Stage 1', '130 – 139 or 80 – 89', 'high'], ['High, Stage 2', '140+ or 90+', 'high']], tip: 'Above 180 / 120: rest, test again, and get medical help now.',
  },
  pulse: {
    title: 'Pulse rate',
    def: 'How many times your heart beats in one minute.',
    how: ['Sit quietly and rest for 5 minutes.', 'Place two fingers (not your thumb) on the inside of your other wrist, just below the thumb.', 'Count the beats for 30 seconds and double the number (or count for a full minute).'],
    levels: [['Low', 'Below 60 BPM', 'watch'], ['Normal', '60 – 100 BPM', 'good'], ['Fast', 'Above 100 BPM', 'watch']], tip: 'Fitness, stress, coffee and fever all change your pulse.',
  },
}
export const GUIDE_TOPICS = ['height', 'weight', 'waist', 'bmi', 'fasting', 'post', 'bp', 'pulse']
