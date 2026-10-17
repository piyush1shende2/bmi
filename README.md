# Smart Health Report

**Live demo:** https://piyush1shende2.github.io/bmi/

React + Vite app: enter height, weight, waist, fasting sugar, post-meal sugar (1.5 hrs) and blood pressure
to get a health score, BMI gauge, banded range charts, diabetes check, recommendations, a reference-ranges
modal, and a trend chart of previous reports (saved in the browser's localStorage).

## Run
```
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Structure
```
src/
  App.jsx                    page layout + state
  components/
    forms/HealthForm.jsx     input panel
    charts/                  BmiGauge, RangeBar, TrendChart (pure SVG/CSS, no chart library)
    report/                  ScoreOrb, MetricCard, Recommendations
    common/ReferenceModal    reference tables
  hooks/useHistory.js        localStorage history
  utils/health.js            BMI / waist / sugar / BP classification + report builder
  utils/recommendations.js   tips per category
  utils/reference.js         reference tables data
  styles/global.css          design tokens + styles
```
To change a threshold, edit the step arrays at the top of `utils/health.js` and the matching table in `utils/reference.js`.
Screening guidance only, not a diagnosis.

## v2 additions
- Dark glass dashboard, side rail, beating heart synced to the pulse you enter (HeartPulse.jsx)
- "Guide me" button: Buddy the dog gives sleep, sunlight, water, eat / limit tips (GuideDog.jsx, utils/guide.js)
