import './SeasonFilter.css'

/**
 * SeasonFilter — dropdown to filter races by season.
 *
 * Props:
 *   seasons   {number[]}        Sorted list of seasons derived from logged races.
 *   selected  {number | 'all'}  Currently active season, or 'all'.
 *   onChange  {function}        Called with the new value when selection changes.
 */
export default function SeasonFilter({ seasons, selected, onChange }) {
  if (seasons.length === 0) return null

  return (
    <div className="season-filter">
      <label htmlFor="season-select" className="season-filter-label">Season</label>
      <select
        id="season-select"
        className="season-select"
        value={selected}
        onChange={e => {
          const val = e.target.value
          onChange(val === 'all' ? 'all' : Number(val))
        }}
      >
        <option value="all">All seasons</option>
        {seasons.map(season => (
          <option key={season} value={season}>{season}</option>
        ))}
      </select>
    </div>
  )
}
