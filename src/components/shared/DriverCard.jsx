import './DriverCard.css'

/**
 * DriverCard — displays a driver with their team color accent.
 *
 * Props:
 *   driver    {{ id, name, team, number }}   Driver object.
 *   onRemove  {function}                     Called with driver.id on remove.
 *                                            Omit for display-only mode.
 */
export default function DriverCard({ driver, onRemove }) {
  const { id, name, team, number } = driver

  return (
    <div className="driver-card">
      {number && <span className="driver-number">#{number}</span>}
      <div className="driver-info">
        <p className="driver-name">{name}</p>
        {team && <p className="driver-team">{team}</p>}
      </div>
      {onRemove && (
        <button
          className="driver-remove"
          onClick={() => onRemove(id)}
          aria-label={`Remove ${name} from favorites`}
        >
          ×
        </button>
      )}
    </div>
  )
}
