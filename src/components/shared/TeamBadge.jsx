import './TeamBadge.css'

// Team accent colors keyed by a normalized team name.
// Covers current and classic constructor names.
const TEAM_COLORS = {
  'red bull':       '#3671C6',
  'ferrari':        '#E8002D',
  'mercedes':       '#27F4D2',
  'mclaren':        '#FF8000',
  'aston martin':   '#229971',
  'alpine':         '#FF87BC',
  'williams':       '#64C4FF',
  'rb':             '#6692FF',
  'haas':           '#B6BABD',
  'sauber':         '#52E252',
  'kick sauber':    '#52E252',
  'alfa romeo':     '#C92D4B',
  'racing point':   '#F596C8',
  'force india':    '#F596C8',
  'renault':        '#FFF500',
  'toro rosso':     '#469BFF',
}

function getTeamColor(name) {
  const key = name.toLowerCase().trim()
  for (const [teamKey, color] of Object.entries(TEAM_COLORS)) {
    if (key.includes(teamKey)) return color
  }
  return '#e50000' // default F1 red
}

/**
 * TeamBadge — displays a team name with its constructor color accent.
 *
 * Props:
 *   team      {{ id, name }}   Team object.
 *   onRemove  {function}       Called with team.id when the remove button is clicked.
 *                              Omit to render in display-only mode (no remove button).
 */
export default function TeamBadge({ team, onRemove }) {
  const color = getTeamColor(team.name)

  return (
    <div className="team-badge" style={{ borderLeftColor: color }}>
      <span className="team-dot" style={{ background: color }} />
      <span className="team-name">{team.name}</span>
      {onRemove && (
        <button
          className="badge-remove"
          onClick={() => onRemove(team.id)}
          aria-label={`Remove ${team.name} from favorites`}
        >
          ×
        </button>
      )}
    </div>
  )
}
