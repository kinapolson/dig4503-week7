import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="brand-flag">🏁</span>
            <span className="brand-text">PITLANE<span className="brand-accent">PRO</span></span>
          </div>
          <p className="footer-tagline">
            The fan-first F1 tracking experience. Built for passion, powered by data.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#cta">Get Started</a>
          </div>
          <div className="footer-col">
            <h4>Track</h4>
            <a href="#">Race Results</a>
            <a href="#">Driver Standings</a>
            <a href="#">Season Archive</a>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="https://github.com/kinapolson/dig4503-week7" target="_blank" rel="noreferrer">GitHub</a>
            <a href="#">Twitter / X</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 PitlanePro. DIG4503 Week 7 Project.</span>
        <span>Not affiliated with Formula 1 or the FIA.</span>
      </div>
    </footer>
  )
}
