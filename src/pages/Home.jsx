import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getRaces } from '../services/raceService'
import { getFavoriteDrivers, getFavoriteTeams } from '../services/favoriteService'
import './Page.css'

export default function Home() {
  const { user } = useAuth()
  const [races, setRaces] = useState([])
  const [drivers, setDrivers] = useState([])
  const [teams, setTeams] = useState([])

  useEffect(() => {
    setRaces(getRaces())
    setDrivers(getFavoriteDrivers())
    setTeams(getFavoriteTeams())
  }, [])

  const avgRating = races.length > 0
    ? (races.reduce((sum, r) => sum + r.rating, 0) / races.length).toFixed(1)
    : null

  const favoriteCount = drivers.length + teams.length

  return (
    <div className="page-container">
      <div className="page-hero">
        <h1><span className="f1-red">F1</span> Race Tracker</h1>
        {user && <p className="page-sub">Welcome back, {user.displayName || user.email}</p>}
        <p>Track races you watched, rate them, save your favorites, and join the conversation.</p>
      </div>

      <div className="card-grid">
        <div className="card">
          <h2>Races Logged</h2>
          <p className="stat">{races.length > 0 ? races.length : '—'}</p>
          <p className="card-sub">
            {races.length > 0
              ? `${races.length} race${races.length !== 1 ? 's' : ''} logged`
              : 'No races logged yet'}
          </p>
        </div>

        <div className="card">
          <h2>Favorites</h2>
          <p className="stat">{favoriteCount > 0 ? favoriteCount : '—'}</p>
          <p className="card-sub">
            {drivers.length > 0 || teams.length > 0
              ? `${drivers.length} driver${drivers.length !== 1 ? 's' : ''}, ${teams.length} team${teams.length !== 1 ? 's' : ''}`
              : 'No favorites saved'}
          </p>
        </div>

        <div className="card">
          <h2>Avg Rating</h2>
          <p className="stat">{avgRating ?? '—'}</p>
          <p className="card-sub">
            {avgRating ? `Across ${races.length} race${races.length !== 1 ? 's' : ''}` : 'Rate races to see your average'}
          </p>
        </div>
      </div>

      {races.length > 0 && (
        <div className="section">
          <h2>Recent Races</h2>
          <div className="recent-list">
            {races.slice(0, 3).map(race => (
              <div key={race.id} className="recent-row">
                <div>
                  <p className="recent-name">{race.raceName}</p>
                  <p className="recent-meta">{race.season}{race.circuit ? ` · ${race.circuit}` : ''}</p>
                </div>
                <span className="recent-rating">{'★'.repeat(race.rating)}{'☆'.repeat(5 - race.rating)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {drivers.length > 0 && (
        <div className="section">
          <h2>Favorite Drivers</h2>
          <div className="home-driver-list">
            {drivers.map(d => (
              <span key={d.id} className="home-driver-chip">
                {d.number && <span className="chip-number">#{d.number}</span>}
                {d.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
