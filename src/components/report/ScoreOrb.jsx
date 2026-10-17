// Overall score ring (conic gradient) with a soft clay look
export default function ScoreOrb({ score, name }) {
  return (
    <div className="orb-wrap">
      <div className="orb" style={{ background: `conic-gradient(#2DD4A8 ${score * 3.6}deg, #2A3640 0)` }}>
        <div><strong>{score}</strong><small>/ 100</small></div>
      </div>
      <p>{name ? `${name}'s` : 'Your'} overall health score</p>
    </div>
  )
}
