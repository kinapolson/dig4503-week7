import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getRaces } from '../services/raceService'
import RaceList from '../components/shared/RaceList'
import SeasonFilter from '../components/shared/SeasonFilter'
import './Page.css'

export default function Races() {
  const [races, setRaces] = useState([])
  const [selectedSeason, setSelectedSeason] = useState('all')

  useEffect(() => {
    setRaces(getRaces())
  }, [])

  // Sorted unique seasons derived from logged races — recalculated only when races change
  const seasons = useMemo(() => {
    const unique = [...new Set(races.map(r => r.season))]
    return unique.sort((a, b) => b - a) // newest first
  }, [races])

  // Filtered view — no extra state, computed from races + selectedSeason
  const visibleRaces = useMemo(() => {
    if (selectedSeason === 'all') return races
    return races.filter(r => r.season === selectedSeason)
  }, [races, selectedSeason])

  function handleDelete(id) {
    setRaces(prev => prev.filter(r => r.id !== id))
  }

  function handleEdit(race) {
    console.info('Edit requested for race:', race.id)
  }

  function handleSeasonChange(season) {
    setSelectedSeason(season)
  }

  const countLabel = selectedSeason === 'all'
    ? `${races.length} race${races.length !== 1 ? 's' : ''} logged`
    : `${visibleRaces.length} race${visibleRaces.length !== 1 ? 's' : ''} in ${selectedSeason}`

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>My Races</h1>
          <p className="page-sub">{races.length > 0 ? countLabel : 'No races logged yet'}</p>
        </div>
        <Link to="/log" className="btn-primary">+ Log a Race</Link>
      </div>

      <SeasonFilter
        seasons={seasons}
        selected={selectedSeason}
        onChange={handleSeasonChange}
      />

      <RaceList races={visibleRaces} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  )
}
