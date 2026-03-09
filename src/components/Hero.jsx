import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-grid"></div>
        <div className="hero-blur hero-blur-1"></div>
        <div className="hero-blur hero-blur-2"></div>
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          2026 Season Now Tracking
        </div>

        <h1 className="hero-title">
          Your Ultimate<br />
          <span className="title-accent">F1 Race</span><br />
          Command Center
        </h1>

        <p className="hero-subtitle">
          Track every race, save your favorite drivers, rate Grand Prix events,
          and keep detailed notes — all in one lightning-fast dashboard.
        </p>

        <div className="hero-actions">
          <a href="#cta" className="btn btn-primary">
            Start Tracking Free
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#features" className="btn btn-secondary">
            See Features
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">20+</span>
            <span className="stat-label">Races Per Season</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">20</span>
            <span className="stat-label">Drivers Tracked</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">10</span>
            <span className="stat-label">Constructors</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="dashboard-mockup">
          <div className="mockup-header">
            <div className="mockup-dots">
              <span></span><span></span><span></span>
            </div>
            <span className="mockup-title">Race Dashboard</span>
          </div>
          <div className="mockup-body">
            <div className="mockup-card race-card">
              <div className="race-flag">🇦🇺</div>
              <div className="race-info">
                <div className="race-name">Australian GP</div>
                <div className="race-date">March 16, 2026</div>
              </div>
              <div className="race-stars">★★★★★</div>
            </div>
            <div className="mockup-card race-card">
              <div className="race-flag">🇯🇵</div>
              <div className="race-info">
                <div className="race-name">Japanese GP</div>
                <div className="race-date">April 6, 2026</div>
              </div>
              <div className="race-stars">★★★★☆</div>
            </div>
            <div className="mockup-drivers">
              <div className="mockup-label">Favorite Drivers</div>
              <div className="driver-chips">
                <span className="driver-chip">VER</span>
                <span className="driver-chip active">LEC</span>
                <span className="driver-chip">NOR</span>
                <span className="driver-chip">HAM</span>
              </div>
            </div>
            <div className="mockup-filter">
              <div className="filter-label">Season</div>
              <div className="filter-options">
                <span className="filter-pill active">2026</span>
                <span className="filter-pill">2025</span>
                <span className="filter-pill">2024</span>
              </div>
            </div>
          </div>
        </div>
        <div className="speed-lines">
          <div className="speed-line"></div>
          <div className="speed-line"></div>
          <div className="speed-line"></div>
        </div>
      </div>
    </section>
  )
}
