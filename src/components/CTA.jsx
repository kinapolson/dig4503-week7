import './CTA.css'

export default function CTA() {
  return (
    <section className="cta-section" id="cta">
      <div className="cta-blur cta-blur-1"></div>
      <div className="cta-blur cta-blur-2"></div>
      <div className="section-container">
        <div className="cta-content">
          <div className="cta-badge">
            <span className="badge-dot"></span>
            Free to Use — No Sign-up Required
          </div>
          <h2 className="cta-title">
            Lights Out and<br />
            <span className="title-accent">Away We Go.</span>
          </h2>
          <p className="cta-subtitle">
            Join thousands of F1 fans who track every race, every driver,
            and every moment of the season. Your dashboard is waiting.
          </p>
          <div className="cta-actions">
            <a href="#" className="btn btn-primary btn-large">
              Launch Your Dashboard
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#features" className="btn btn-ghost">
              Learn More
            </a>
          </div>
        </div>

        <div className="cta-visual">
          <div className="checkered-block">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`checker ${(Math.floor(i / 8) + (i % 8)) % 2 === 0 ? 'dark' : 'light'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
