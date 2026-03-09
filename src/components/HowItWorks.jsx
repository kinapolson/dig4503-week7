import './HowItWorks.css'

const steps = [
  {
    number: '01',
    title: 'Choose Your Season',
    description:
      'Select from any F1 season to load the full calendar of races. Filter by year to explore current or historical championships.',
  },
  {
    number: '02',
    title: 'Save Your Drivers',
    description:
      'Browse the full driver roster and pin your favorites. Track their progress across every race weekend in real time.',
  },
  {
    number: '03',
    title: 'Log Results & Ratings',
    description:
      'After each race, log the results and give the Grand Prix your personal score. Add notes to capture what made it memorable.',
  },
  {
    number: '04',
    title: 'Review & Compare',
    description:
      'Revisit your race history, compare ratings across seasons, and relive the best — and worst — moments of each championship.',
  },
]

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Simple by Design</span>
          <h2 className="section-title">
            Up and Running in<br /><span className="title-accent">Four Steps</span>
          </h2>
        </div>

        <div className="steps-grid">
          {steps.map((step, i) => (
            <div className="step-card" key={i}>
              <div className="step-number">{step.number}</div>
              <div className="step-connector"></div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="seasons-showcase" id="seasons">
          <div className="seasons-label">Season Filter Preview</div>
          <div className="seasons-strip">
            {['2026', '2025', '2024', '2023', '2022', '2021', '2020'].map((yr) => (
              <div className={`season-card ${yr === '2026' ? 'active' : ''}`} key={yr}>
                <span className="season-year">{yr}</span>
                <span className="season-races">{yr === '2026' ? '24 Races' : yr === '2025' ? '24 Races' : '22 Races'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
