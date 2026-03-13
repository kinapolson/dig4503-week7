import { useState } from 'react'
import './StarRating.css'

const STARS = [1, 2, 3, 4, 5]

/**
 * StarRating — dual-mode star rating component.
 *
 * Input mode  (default): interactive, hover preview, calls onChange on click.
 * Display mode (readOnly): purely visual, no hover or click behaviour.
 *
 * Props:
 *   value     {number}   Current rating (1–5). 0 = no rating.
 *   onChange  {function} Called with the new rating when a star is clicked.
 *                        Required in input mode, omit in display mode.
 *   readOnly  {boolean}  Switches to display-only mode. Default: false.
 *   showLabel {boolean}  Show "N / 5" label next to stars. Default: true in
 *                        input mode, false in display mode.
 */
export default function StarRating({
  value = 0,
  onChange,
  readOnly = false,
  showLabel,
}) {
  const [hovered, setHovered] = useState(0)

  // Default label visibility per mode unless explicitly overridden
  const displayLabel = showLabel ?? !readOnly

  // In display mode a star is filled when <= value.
  // In input mode a star is filled when <= hovered (preview) or <= value (committed).
  function isFilled(star) {
    if (readOnly) return star <= value
    return hovered > 0 ? star <= hovered : star <= value
  }

  if (readOnly) {
    return (
      <div className="star-rating" aria-label={`Rating: ${value} out of 5`}>
        {STARS.map(star => (
          <span
            key={star}
            className={`star star--display ${isFilled(star) ? 'filled' : ''}`}
          >
            ★
          </span>
        ))}
        {displayLabel && (
          <span className="star-label">{value > 0 ? `${value} / 5` : '—'}</span>
        )}
      </div>
    )
  }

  return (
    <div
      className="star-rating"
      role="radiogroup"
      aria-label="Select a rating"
      onMouseLeave={() => setHovered(0)}
    >
      {STARS.map(star => (
        <button
          key={star}
          type="button"
          className={`star star--input ${isFilled(star) ? 'filled' : ''}`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          aria-pressed={star <= value}
        >
          ★
        </button>
      ))}
      {displayLabel && (
        <span className="star-label">
          {hovered > 0 ? `${hovered} / 5` : value > 0 ? `${value} / 5` : 'No rating'}
        </span>
      )}
    </div>
  )
}
