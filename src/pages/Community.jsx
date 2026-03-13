import './Page.css'

export default function Community() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Community</h1>
        <button className="btn-primary" disabled>+ New Post</button>
      </div>
      <p className="page-sub">Discuss races, share opinions, and connect with other F1 fans.</p>

      <div className="placeholder-box">
        <p>Community board — coming in Phase 6.</p>
        <p>Authentication is required to post. Please log in or register.</p>
      </div>
    </div>
  )
}
