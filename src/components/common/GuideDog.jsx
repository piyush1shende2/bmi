import { useState } from 'react'

function Dog() {
  return (
    <svg viewBox="0 0 170 170" className="dog" role="img" aria-label="Buddy the dog">
      <path className="tail" d="M120 128 Q152 112 146 84" stroke="#B87843" strokeWidth="11" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="130" rx="42" ry="30" fill="#E0A66B" />
      <rect x="50" y="146" width="16" height="20" rx="8" fill="#D39556" /><rect x="94" y="146" width="16" height="20" rx="8" fill="#D39556" />
      <path d="M46 56 Q28 34 32 86 Q48 82 52 66Z M114 56 Q132 34 128 86 Q112 82 108 66Z" fill="#9C5F32" />
      <circle cx="80" cy="74" r="37" fill="#E0A66B" />
      <ellipse cx="80" cy="88" rx="19" ry="15" fill="#F7E3C8" />
      <circle cx="65" cy="68" r="5" fill="#2B2024" /><circle cx="95" cy="68" r="5" fill="#2B2024" />
      <circle cx="66.5" cy="66.5" r="1.6" fill="#fff" /><circle cx="96.5" cy="66.5" r="1.6" fill="#fff" />
      <ellipse cx="80" cy="82" rx="6.5" ry="4.8" fill="#2B2024" />
      <ellipse className="tongue" cx="80" cy="98" rx="5.5" ry="7" fill="#F0788A" />
      <path d="M80 86 V92 M71 92 Q80 99 89 92" stroke="#2B2024" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M54 106 Q80 120 106 106" stroke="#2DD4A8" strokeWidth="7" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function GuideDog({ tips, onClose }) {
  const [i, setI] = useState(0)
  const t = tips[i], last = i === tips.length - 1
  return (
    <aside className="dog-wrap" aria-live="polite">
      <div className="bubble">
        <button className="x" onClick={onClose} aria-label="Close guide">×</button>
        <h4><span aria-hidden="true">{t.icon}</span> {t.title}</h4>
        <p>{t.text}</p>
        <div className="bubble-nav">
          <button className="btn sm" onClick={() => setI(i - 1)} disabled={i === 0}>Back</button>
          <span>{i + 1} / {tips.length}</span>
          <button className="btn sm primary" onClick={() => (last ? onClose() : setI(i + 1))}>{last ? 'Done' : 'Next'}</button>
        </div>
      </div>
      <Dog />
    </aside>
  )
}
