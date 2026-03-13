import { Link } from 'react-router-dom'
import RaceCard from './RaceCard'
import './RaceList.css'

export default function RaceList({ races, onDelete, onEdit }) {
  if (races.length === 0) {
    return (
      <div className="race-list-empty">
        <p>No races logged yet.</p>
        <Link to="/log" className="btn-primary">Log your first race</Link>
      </div>
    )
  }

  return (
    <ul className="race-list">
      {races.map(race => (
        <li key={race.id}>
          <RaceCard race={race} onDelete={onDelete} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  )
}
