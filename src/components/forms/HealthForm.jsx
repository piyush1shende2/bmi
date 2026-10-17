import HelpTip from '../common/HelpTip'

const Field = ({ label, name, unit, help, onGuide, form, onChange, type = 'number', ...rest }) => (
  <div className="field">
    <div className="field-top">
      <label htmlFor={name}>{label}{unit && <em> {unit}</em>}</label>
      {help && <HelpTip topic={help} onGuide={onGuide} />}
    </div>
    <input id={name} type={type} name={name} value={form[name]} onChange={onChange} {...rest} />
  </div>
)

export default function HealthForm({ form, onChange, onSubmit, onReset, onGuide, error }) {
  const p = { form, onChange, onGuide, min: 0, step: 'any', inputMode: 'decimal' }
  return (
    <form className="panel form" onSubmit={onSubmit} noValidate>
      <h2>Your details</h2>
      <Field label="Name (optional)" name="name" type="text" form={form} onChange={onChange} />
      <div className="row">
        <Field label="Age" name="age" unit="years" {...p} />
        <label className="field">
          <span>Sex</span>
          <select name="sex" value={form.sex} onChange={onChange}>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </label>
      </div>

      <h3>Body measurements</h3>
      <div className="row">
        <Field label="Height" name="height" unit="cm" help="height" {...p} />
        <Field label="Weight" name="weight" unit="kg" help="weight" {...p} />
      </div>
      <Field label="Waist size" name="waist" unit="cm" help="waist" {...p} />

      <h3>Blood sugar</h3>
      <Field label="Fasting (empty stomach, morning)" name="fasting" unit="mg/dL" help="fasting" {...p} />
      <Field label="Post-meal (1.5 hrs after eating)" name="post" unit="mg/dL" help="post" {...p} />

      <h3>Blood pressure</h3>
      <div className="row">
        <Field label="Systolic (upper)" name="sys" unit="mmHg" help="bp" {...p} />
        <Field label="Diastolic (lower)" name="dia" unit="mmHg" help="bp" {...p} />
      </div>
      <Field label="Resting pulse" name="pulse" unit="BPM" help="pulse" {...p} />

      {error && <p className="error" role="alert">{error}</p>}
      <div className="row">
        <button type="submit" className="btn primary">Generate report</button>
        <button type="button" className="btn" onClick={onReset}>Clear</button>
      </div>
    </form>
  )
}
