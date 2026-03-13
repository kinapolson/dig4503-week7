import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addRace } from '../../services/raceService'
import StarRating from './StarRating'
import './LogRaceForm.css'

const CURRENT_YEAR = new Date().getFullYear()

const EMPTY_FORM = {
  raceName: '',
  season: CURRENT_YEAR,
  notes: '',
  rating: 0,
}

function validate(fields) {
  const errors = {}
  if (!fields.raceName.trim()) {
    errors.raceName = 'Race name is required.'
  }
  if (!fields.season || fields.season < 1950 || fields.season > CURRENT_YEAR) {
    errors.season = `Season must be between 1950 and ${CURRENT_YEAR}.`
  }
  if (fields.rating === 0) {
    errors.rating = 'Please select a star rating.'
  }
  return errors
}

export default function LogRaceForm() {
  const navigate = useNavigate()
  const [fields, setFields] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: name === 'season' ? Number(value) : value }))
    // Clear the error for this field as the user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function handleRating(value) {
    setFields(prev => ({ ...prev, rating: value }))
    if (errors.rating) setErrors(prev => ({ ...prev, rating: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    addRace({
      raceName: fields.raceName.trim(),
      season: fields.season,
      notes: fields.notes.trim(),
      rating: fields.rating,
      // Remaining race fields (circuit, round, date, etc.) added in a later iteration
    })

    setSubmitted(true)
  }

  function handleReset() {
    setFields(EMPTY_FORM)
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="log-success">
        <div className="success-icon">✓</div>
        <h2>Race Logged!</h2>
        <p><strong>{fields.raceName}</strong> ({fields.season}) — {fields.rating} / 5 stars</p>
        <div className="success-actions">
          <button className="btn-primary" onClick={handleReset}>Log Another</button>
          <button className="btn-secondary" onClick={() => navigate('/races')}>View All Races</button>
        </div>
      </div>
    )
  }

  return (
    <form className="log-race-form" onSubmit={handleSubmit} noValidate>

      {/* Race Name */}
      <div className={`form-group ${errors.raceName ? 'has-error' : ''}`}>
        <label htmlFor="raceName">Race Name <span className="required">*</span></label>
        <input
          id="raceName"
          name="raceName"
          type="text"
          placeholder="e.g. Monaco Grand Prix"
          value={fields.raceName}
          onChange={handleChange}
          autoComplete="off"
        />
        {errors.raceName && <p className="error-msg">{errors.raceName}</p>}
      </div>

      {/* Season */}
      <div className={`form-group ${errors.season ? 'has-error' : ''}`}>
        <label htmlFor="season">Season <span className="required">*</span></label>
        <input
          id="season"
          name="season"
          type="number"
          min="1950"
          max={CURRENT_YEAR}
          value={fields.season}
          onChange={handleChange}
        />
        {errors.season && <p className="error-msg">{errors.season}</p>}
      </div>

      {/* Star Rating */}
      <div className={`form-group ${errors.rating ? 'has-error' : ''}`}>
        <label>Rating <span className="required">*</span></label>
        <StarRating value={fields.rating} onChange={handleRating} />
        {errors.rating && <p className="error-msg">{errors.rating}</p>}
      </div>

      {/* Notes */}
      <div className="form-group">
        <label htmlFor="notes">Notes <span className="optional">(optional)</span></label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="What made this race memorable?"
          value={fields.notes}
          onChange={handleChange}
        />
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button type="submit" className="btn-primary">Save Race</button>
        <button type="button" className="btn-secondary" onClick={handleReset}>Clear</button>
      </div>

    </form>
  )
}
