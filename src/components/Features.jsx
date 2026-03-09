import './Features.css'

const features = [
  {
    icon: '⭐',
    title: 'Favorite Drivers',
    description:
      'Pin your favorite drivers for quick access. Follow their points, standings, and race-by-race performance across every season.',
    tag: 'Personalize',
  },
  {
    icon: '🏆',
    title: 'Race Results',
    description:
      'Full race results at a glance — podiums, fastest laps, DNFs, and championship points. Never miss a detail from any Grand Prix.',
    tag: 'Track',
  },
  {
    icon: '⚡',
    title: 'Rate Races',
    description:
      "Give every Grand Prix your personal rating. Build a history of the greatest races you've watched and compare across seasons.",
    tag: 'Review',
  },
  {
    icon: '📝',
    title: 'Racing Notes',
    description:
      'Jot down thoughts for any race — key moments, controversies, strategy calls. Your personal commentary, saved forever.',
    tag: 'Annotate',
  },
  {
    icon: '🗂️',
    title: 'Season Filter',
    description:
      'Instantly switch between seasons. Browse historical data, compare year-to-year results, and rediscover classic championships.',
    tag: 'Navigate',
  },
  {
    icon: '📊',
    title: 'Stats Dashboard',
    description:
      'Visualize driver and constructor trends across a season. See win rates, points trajectories, and head-to-head breakdowns.',
    tag: 'Analyze',
  },
]

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Everything You Need</span>
          <h2 className="section-title">
            Built for Real<br /><span className="title-accent">F1 Fans</span>
          </h2>
          <p className="section-subtitle">
            Every feature is designed around the way fans actually follow Formula 1 —
            from qualifying day to the chequered flag.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon-wrap">
                <span className="feature-icon">{f.icon}</span>
              </div>
              <span className="feature-tag">{f.tag}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
              <div className="feature-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
