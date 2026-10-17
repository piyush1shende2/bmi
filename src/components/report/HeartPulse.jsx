// Beating heart + live ECG line. Beat speed follows the pulse (72 BPM until one is entered).
export default function HeartPulse({ bpm, bp }) {
  const rate = bpm || 72
  const beat = `${(60 / Math.min(180, Math.max(30, rate))).toFixed(2)}s`
  return (
    <div className="stage" style={{ '--beat': beat }}>
      <div className="glow" />
      <svg viewBox="0 0 200 200" className="heart" role="img" aria-label={`Heart beating at ${rate} beats per minute`}>
        <defs>
          <radialGradient id="hg" cx="35%" cy="30%" r="80%"><stop offset="0" stopColor="#FF8FA3" /><stop offset=".55" stopColor="#E0455F" /><stop offset="1" stopColor="#8E1B33" /></radialGradient>
        </defs>
        <path d="M78 50 C76 26 70 16 60 10 M118 50 C122 26 132 18 142 14" stroke="#C93450" strokeWidth="15" strokeLinecap="round" fill="none" />
        <path d="M100 184 C16 124 6 72 44 44 C70 26 95 40 100 64 C105 40 130 26 156 44 C194 72 184 124 100 184Z" fill="url(#hg)" />
        <path d="M100 64 C96 100 104 130 100 170 M64 70 C80 90 76 120 90 150 M138 72 C122 92 128 120 112 150" stroke="#FFB3C0" strokeOpacity=".45" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="62" cy="62" rx="14" ry="8" fill="#fff" opacity=".35" transform="rotate(-30 62 62)" />
      </svg>
      <div className="float fl-hr">
        <small>Heart rate</small>
        <strong>{bpm ? bpm : '--'} <span>BPM</span></strong>
        <svg viewBox="0 0 200 60" className="ecg" aria-hidden="true"><path d="M0 30 H40 L50 30 L56 8 L64 52 L70 30 H120 L126 8 L134 52 L140 30 H200" /></svg>
        {!bpm && <em>Add your pulse to sync</em>}
      </div>
      {bp && <div className="float fl-bp"><small>Blood pressure</small><strong>{bp} <span>mmHg</span></strong></div>}
    </div>
  )
}
