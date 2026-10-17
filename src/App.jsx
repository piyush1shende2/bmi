// useState gives a component its own memory: when a stored value changes, React re-draws the screen
import { useState } from 'react'
// The left input panel (name, age, height, weight, waist, sugar, blood pressure, pulse)
import HealthForm from './components/forms/HealthForm'
// Half-circle BMI meter drawn with SVG
import BmiGauge from './components/charts/BmiGauge'
// Line chart that shows saved readings over time
import TrendChart from './components/charts/TrendChart'
// One result card (value, status badge, range bar) for each measurement
import MetricCard from './components/report/MetricCard'
// Circular overall health score (0 to 100)
import ScoreOrb from './components/report/ScoreOrb'
// Beating heart animation and the pulse / blood pressure floating cards
import HeartPulse from './components/report/HeartPulse'
// Written advice generated from the report
import Recommendations from './components/report/Recommendations'
// Pop-up with the reference tables of normal and unhealthy ranges
import ReferenceModal from './components/common/ReferenceModal'
// Pop-up with pictures and steps for measuring at home
import MeasureGuide from './components/common/MeasureGuide'
// Buddy the dog who gives lifestyle tips one by one
import GuideDog from './components/common/GuideDog'
// The vertical menu on the left side
import Sidebar from './components/common/Sidebar'
// Custom hook that saves and loads past reports from the browser
import useHistory from './hooks/useHistory'
// buildReport turns form values into results; num safely turns text into a positive number (or null)
import { buildReport, num } from './utils/health'
// buildGuide creates the list of tips that Buddy shows
import { buildGuide } from './utils/guide'

// The blank form: every field starts empty (sex starts as 'female' so the dropdown always has a value)
const EMPTY = { name: '', age: '', sex: 'female', height: '', weight: '', waist: '', fasting: '', post: '', sys: '', dia: '', pulse: '' }

// App is the main component: it holds all the data and puts every piece on the screen
export default function App() {
  // form = what the user has typed so far; setForm updates it
  const [form, setForm] = useState(EMPTY)
  // report = the calculated results; stays null until "Generate report" is pressed
  const [report, setReport] = useState(null)
  // error = a message shown under the form when something is missing
  const [error, setError] = useState('')
  // showRef = true while the reference-ranges pop-up is open
  const [showRef, setShowRef] = useState(false)
  // guide = true while Buddy the dog is on the screen
  const [guide, setGuide] = useState(false)
  // measure = which "how to measure" topic is open (for example 'height'), or null when closed
  const [measure, setMeasure] = useState(null)
  // history = saved earlier reports; add stores a new one; clear deletes them all
  const { history, add, clear } = useHistory()

  // Runs on every keystroke: copy the old form, then replace only the field being typed in (e.target.name is the field's name)
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  // Runs when the form is submitted (Generate report button or Enter key)
  const onSubmit = (e) => {
    // Stop the browser from reloading the page, which is the default for forms
    e.preventDefault()
    // Height and weight are required for BMI, so show a message and stop if either is missing or invalid
    if (!num(form.height) || !num(form.weight)) return setError('Enter your height and weight to calculate BMI.')
    // Blood pressure needs both numbers: stop if only one of systolic / diastolic is filled
    if ((form.sys && !form.dia) || (!form.sys && form.dia)) return setError('Enter both systolic and diastolic values.')
    // Everything is valid, so remove any old error message
    setError('')
    // Calculate BMI, sugar, blood pressure, pulse, score and recommendations from the form
    const r = buildReport(form)
    // Store the result so the report section appears
    setReport(r)
    // Save this reading with today's date and time so the Trends chart can use it
    add({ date: new Date().toISOString(), ...r.values })
  }

  // Finds one result (such as 'pulse') inside the report; the ?. returns undefined when there is no report yet
  const get = (k) => report?.components.find((c) => c.key === k)
  // The BMI result, used by the gauge below (only read once a report exists)
  const bmi = get('bmi')
  // Everything below is the screen layout (JSX)
  return (
    // Outer wrapper that places the side menu next to the page content
    <div className="shell">
      {/* Side menu; each button is given a function to run when clicked: open ranges, open Buddy, or open the measuring guide at "height" */}
      <Sidebar onRanges={() => setShowRef(true)} onGuide={() => setGuide(true)} onMeasure={() => setMeasure('height')} />
      {/* Container for the main page content */}
      <div className="app">
        {/* Two-column layout: form on the left, results on the right */}
        <main className="layout">
          {/* The input form; it receives the typed values, the typing and submit handlers, the "?" help opener, a reset function and the error text. Reset empties the form, removes the report and clears any error */}
          <HealthForm form={form} onChange={onChange} onSubmit={onSubmit} onGuide={setMeasure} onReset={() => { setForm(EMPTY); setReport(null); setError('') }} error={error} />
          {/* Right column holding all the result cards */}
          <div className="stack">
            {/* Top card with the title, buttons and heart; id="home" lets the side menu scroll here */}
            <section className="panel hero" id="home">
              {/* Left half of the top card: text and buttons */}
              <div className="hero-left">
                {/* Small brand label */}
                <p className="brand">● Smart Health</p>
                {/* Main heading with a line break between the two words */}
                <h1>Overview<br />Your Health</h1>
                {/* Message under the heading: with a report it greets by name when a name was typed; with no report it asks for measurements */}
                <p className="muted">{report ? (form.name ? `${form.name}, here is your latest summary.` : 'Here is your latest summary.') : 'Add your measurements, then generate your report.'}</p>
                {/* Row of three buttons */}
                <div className="row-btns">
                  {/* Opens Buddy the dog */}
                  <button className="btn primary" onClick={() => setGuide(true)}>🐾 Guide me</button>
                  {/* Opens the measuring guide, starting on the height tab */}
                  <button className="btn" onClick={() => setMeasure('height')}>📏 How to measure</button>
                  {/* Opens the reference ranges pop-up */}
                  <button className="btn" onClick={() => setShowRef(true)}>Reference ranges</button>
                </div>
              </div>
              {/* Heart animation: bpm is the pulse result and bp is the blood pressure result (both are undefined until a report has them, and the heart then beats at a default 72) */}
              <HeartPulse bpm={get('pulse')?.value} bp={get('bp')?.value} />
            </section>

            {/* Only draw the report section when a report exists (report && ... shows nothing while report is null) */}
            {report && (
              // Wrapper for the report; id="report" lets the side menu scroll here
              <div id="report" className="stack">
                {/* Red warning, shown only when blood pressure is in the crisis range; role="alert" makes screen readers announce it */}
                {report.urgent && <div className="alert" role="alert">Your blood pressure is in the crisis range. Rest 5 minutes and measure again. If it is still this high, get medical help now. Call emergency services if you have chest pain, breathlessness, weakness, vision changes or trouble speaking.</div>}
                {/* Card holding the score ring and the BMI gauge */}
                <section className="panel score-row">
                  {/* Overall score ring, with the name used in its caption */}
                  <ScoreOrb score={report.score} name={form.name} />
                  {/* BMI gauge: the needle uses the BMI value and the caption shows its category */}
                  <BmiGauge value={bmi.value} label={bmi.label} />
                </section>
                {/* One card per result: .map loops over the results; key helps React track each card; onGuide opens the measuring guide from the card's "?" */}
                <div className="cards">{report.components.map((c) => <MetricCard key={c.key} c={c} onGuide={setMeasure} />)}</div>
                {/* Advice cards plus the diabetes insight sentence */}
                <Recommendations recs={report.recs} insight={report.insight} />
              </div>
            )}
            {/* Trend chart of saved readings, with a button that clears the history */}
            <TrendChart history={history} onClear={clear} />
            {/* Reminder that this is not a diagnosis */}
            <p className="disclaimer">Screening guidance only, not a diagnosis. Please consult a healthcare professional about your results.</p>
          </div>
        </main>
      </div>
      {/* Reference pop-up: drawn only while showRef is true; onClose sets it back to false */}
      {showRef && <ReferenceModal onClose={() => setShowRef(false)} />}
      {/* Measuring guide: drawn only while a topic is chosen; topic selects the starting tab; closing sets measure back to null */}
      {measure && <MeasureGuide topic={measure} onClose={() => setMeasure(null)} />}
      {/* Buddy the dog: drawn only while guide is true; tips are rebuilt from the current form and report, and closing sets guide back to false */}
      {guide && <GuideDog tips={buildGuide(form, report)} onClose={() => setGuide(false)} />}
    </div>
  )
}