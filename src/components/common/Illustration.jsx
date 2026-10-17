// Simple original line drawings for each measuring guide
const T = '#2DD4A8', P = '#F0556A', G = '#566873'
const ART = {
  height: <>
    <line x1="44" y1="14" x2="44" y2="128" strokeWidth="7" stroke={G} />
    <line x1="16" y1="128" x2="224" y2="128" />
    <circle cx="78" cy="48" r="11" />
    <path d="M78 59V100M78 66L64 92M78 66L92 92M78 100L68 128M78 100L88 128" />
    <rect x="48" y="31" width="40" height="6" rx="2" fill={T} stroke="none" />
    <path d="M150 34V128M144 34H156M144 128H156" stroke={T} />
    <text x="162" y="86">Height</text>
  </>,
  weight: <>
    <rect x="56" y="124" width="128" height="14" rx="7" fill={G} stroke="none" />
    <circle cx="120" cy="34" r="11" />
    <path d="M120 45V88M120 52L106 80M120 52L134 80M120 88L110 122M120 88L130 122" />
    <rect x="190" y="98" width="42" height="24" rx="6" stroke={T} />
    <text x="198" y="115">62.4</text>
  </>,
  waist: <>
    <circle cx="120" cy="20" r="12" />
    <path d="M96 40H144L138 88L144 138H96L102 88Z" />
    <ellipse cx="120" cy="88" rx="28" ry="7" stroke={P} strokeWidth="4" />
    <circle cx="120" cy="90" r="2" fill="#E8EEF2" stroke="none" />
    <path d="M152 88H176" stroke={T} />
    <text x="152" y="78">navel level</text>
  </>,
  bmi: <text x="26" y="80" fontSize="20" style={{ fontSize: 20 }}>kg ÷ (m × m)</text>,
  fasting: <>
    <rect x="56" y="14" width="34" height="76" rx="17" />
    <path d="M73 100C65 112 62 118 73 126C84 118 81 112 73 100Z" fill={P} stroke="none" />
    <rect x="128" y="50" width="96" height="72" rx="12" />
    <rect x="140" y="60" width="72" height="30" rx="6" stroke={T} />
    <text x="162" y="81">95</text>
  </>,
  bp: <>
    <rect x="16" y="86" width="150" height="30" rx="15" />
    <rect x="64" y="74" width="40" height="54" rx="8" fill={P} fillOpacity=".35" stroke={P} />
    <path d="M104 100C140 100 140 62 166 62" />
    <rect x="166" y="44" width="62" height="36" rx="8" stroke={T} />
    <text x="174" y="67">120/80</text>
  </>,
  pulse: <>
    <rect x="20" y="78" width="150" height="34" rx="17" />
    <rect x="132" y="64" width="12" height="34" rx="6" transform="rotate(-12 138 81)" fill={T} stroke="none" />
    <rect x="148" y="64" width="12" height="34" rx="6" transform="rotate(-12 154 81)" fill={T} stroke="none" />
    <path d="M176 40H196L204 18L214 62L222 40H236" stroke={P} />
  </>,
}
ART.post = ART.fasting

export default function Illustration({ topic }) {
  return <svg viewBox="0 0 240 150" className="il" role="img" aria-label={`Drawing: how to measure ${topic}`}>{ART[topic]}</svg>
}
