import { useState, useEffect } from 'react'
import {
  getFavoriteTeams, addFavoriteTeam, removeFavoriteTeam,
  getFavoriteDrivers, addFavoriteDriver, removeFavoriteDriver,
} from '../services/favoriteService'
import TeamBadge from '../components/shared/TeamBadge'
import DriverCard from '../components/shared/DriverCard'
import './Page.css'
import './Favorites.css'

// --- F1 2025 reference data for the quick-add dropdowns ---
const F1_TEAMS = [
  { id: 'red-bull',     name: 'Red Bull' },
  { id: 'ferrari',      name: 'Ferrari' },
  { id: 'mercedes',     name: 'Mercedes' },
  { id: 'mclaren',      name: 'McLaren' },
  { id: 'aston-martin', name: 'Aston Martin' },
  { id: 'alpine',       name: 'Alpine' },
  { id: 'williams',     name: 'Williams' },
  { id: 'rb',           name: 'RB' },
  { id: 'haas',         name: 'Haas' },
  { id: 'kick-sauber',  name: 'Kick Sauber' },
]

const F1_DRIVERS = [
  { id: 'verstappen',  name: 'Max Verstappen',      team: 'Red Bull',     number: 1   },
  { id: 'leclerc',     name: 'Charles Leclerc',     team: 'Ferrari',      number: 16  },
  { id: 'sainz',       name: 'Carlos Sainz',        team: 'Williams',     number: 55  },
  { id: 'norris',      name: 'Lando Norris',        team: 'McLaren',      number: 4   },
  { id: 'piastri',     name: 'Oscar Piastri',       team: 'McLaren',      number: 81  },
  { id: 'hamilton',    name: 'Lewis Hamilton',      team: 'Ferrari',      number: 44  },
  { id: 'russell',     name: 'George Russell',      team: 'Mercedes',     number: 63  },
  { id: 'alonso',      name: 'Fernando Alonso',     team: 'Aston Martin', number: 14  },
  { id: 'stroll',      name: 'Lance Stroll',        team: 'Aston Martin', number: 18  },
  { id: 'ocon',        name: 'Esteban Ocon',        team: 'Haas',         number: 31  },
  { id: 'gasly',       name: 'Pierre Gasly',        team: 'Alpine',       number: 10  },
  { id: 'albon',       name: 'Alexander Albon',     team: 'Williams',     number: 23  },
  { id: 'tsunoda',     name: 'Yuki Tsunoda',        team: 'RB',           number: 22  },
  { id: 'hulkenberg',  name: 'Nico Hülkenberg',     team: 'Kick Sauber',  number: 27  },
  { id: 'bearman',     name: 'Oliver Bearman',      team: 'Haas',         number: 87  },
  { id: 'colapinto',   name: 'Franco Colapinto',    team: 'Alpine',       number: 43  },
  { id: 'lawson',      name: 'Liam Lawson',         team: 'RB',           number: 30  },
  { id: 'antonelli',   name: 'Kimi Antonelli',      team: 'Mercedes',     number: 12  },
  { id: 'doohan',      name: 'Jack Doohan',         team: 'Alpine',       number: 7   },
  { id: 'bortoleto',   name: 'Gabriel Bortoleto',   team: 'Kick Sauber',  number: 5   },
]

export default function Favorites() {
  const [teams, setTeams]     = useState([])
  const [drivers, setDrivers] = useState([])
  const [selectedTeam, setSelectedTeam]     = useState('')
  const [selectedDriver, setSelectedDriver] = useState('')

  useEffect(() => {
    setTeams(getFavoriteTeams())
    setDrivers(getFavoriteDrivers())
  }, [])

  // --- Teams ---
  function handleAddTeam() {
    if (!selectedTeam) return
    const team = F1_TEAMS.find(t => t.id === selectedTeam)
    if (!team) return
    addFavoriteTeam(team)
    setTeams(getFavoriteTeams())
    setSelectedTeam('')
  }

  function handleRemoveTeam(id) {
    removeFavoriteTeam(id)
    setTeams(prev => prev.filter(t => t.id !== id))
  }

  // --- Drivers ---
  function handleAddDriver() {
    if (!selectedDriver) return
    const driver = F1_DRIVERS.find(d => d.id === selectedDriver)
    if (!driver) return
    addFavoriteDriver(driver)
    setDrivers(getFavoriteDrivers())
    setSelectedDriver('')
  }

  function handleRemoveDriver(id) {
    removeFavoriteDriver(id)
    setDrivers(prev => prev.filter(d => d.id !== id))
  }

  // Teams already saved — excluded from the add dropdown
  const availableTeams = F1_TEAMS.filter(t => !teams.some(saved => saved.id === t.id))
  const availableDrivers = F1_DRIVERS.filter(d => !drivers.some(saved => saved.id === d.id))

  return (
    <div className="page-container">
      <h1>Favorites</h1>
      <p className="page-sub">Your saved teams and drivers.</p>

      {/* ---- Teams ---- */}
      <section className="section">
        <h2>Favorite Teams</h2>

        {/* Add team */}
        <div className="fav-add-row">
          <select
            className="fav-select"
            value={selectedTeam}
            onChange={e => setSelectedTeam(e.target.value)}
            disabled={availableTeams.length === 0}
          >
            <option value="">
              {availableTeams.length === 0 ? 'All teams saved' : 'Select a team…'}
            </option>
            {availableTeams.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <button
            className="btn-primary"
            onClick={handleAddTeam}
            disabled={!selectedTeam}
          >
            Add
          </button>
        </div>

        {/* Team list */}
        {teams.length === 0 ? (
          <div className="placeholder-box"><p>No teams saved yet.</p></div>
        ) : (
          <div className="team-badge-list">
            {teams.map(team => (
              <TeamBadge key={team.id} team={team} onRemove={handleRemoveTeam} />
            ))}
          </div>
        )}
      </section>

      {/* ---- Drivers ---- */}
      <section className="section">
        <h2>Favorite Drivers</h2>

        {/* Add driver */}
        <div className="fav-add-row">
          <select
            className="fav-select"
            value={selectedDriver}
            onChange={e => setSelectedDriver(e.target.value)}
            disabled={availableDrivers.length === 0}
          >
            <option value="">
              {availableDrivers.length === 0 ? 'All drivers saved' : 'Select a driver…'}
            </option>
            {availableDrivers.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          <button
            className="btn-primary"
            onClick={handleAddDriver}
            disabled={!selectedDriver}
          >
            Add
          </button>
        </div>

        {/* Driver list */}
        {drivers.length === 0 ? (
          <div className="placeholder-box"><p>No drivers saved yet.</p></div>
        ) : (
          <div className="driver-card-list">
            {drivers.map(driver => (
              <DriverCard key={driver.id} driver={driver} onRemove={handleRemoveDriver} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
