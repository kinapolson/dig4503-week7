import './Page.css'

export default function Home() {
  return (
    <div className="page-container">
      <div className="page-hero">
        <h1><span className="f1-red">F1</span> Race Tracker</h1>
        <p>Track races you watched, rate them, save your favorites, and join the conversation.</p>
      </div>

      <div className="card-grid">
        <div className="card">
          <h2>Races Logged</h2>
          <p className="stat">—</p>
          <p className="card-sub">No races logged yet</p>
        </div>
        <div className="card">
          <h2>Favorite Drivers</h2>
          <p className="stat">—</p>
          <p className="card-sub">No favorites saved</p>
        </div>
        <div className="card">
          <h2>Avg Rating</h2>
          <p className="stat">—</p>
          <p className="card-sub">Rate races to see your average</p>
        </div>
      </div>
    </div>
  )
}
