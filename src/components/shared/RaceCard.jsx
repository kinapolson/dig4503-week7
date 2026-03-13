import { useState } from 'react'
import { deleteRace } from '../../services/raceService'
import StarRating from './StarRating'
import './RaceCard.css'

const NOTES_PREVIEW_LENGTH = 100

export default function RaceCard({ race, onDelete, onEdit }) {
  const { id, raceName, season, circuit, rating, notes } = race
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  const notesPreview = notes && notes.length > NOTES_PREVIEW_LENGTH
    ? notes.slice(0, NOTES_PREVIEW_LENGTH).trimEnd() + '…'
    : notes

  function handleDelete() {
    deleteRace(id)
    onDelete(id)
  }

  return (
    <article className="race-card">

      {/* ---- Header row: title + stars ---- */}
      <div className="race-card-header">
        <div>
          <h2 className="race-name">{raceName}</h2>
          <p className="race-meta">
            <span className="season-badge">{season}</span>
            {circuit && <span className="circuit">{circuit}</span>}
          </p>
        </div>
        <StarRating value={rating} readOnly />
      </div>

      {/* ---- Notes preview ---- */}
      {notesPreview && (
        <p className="race-notes">{notesPreview}</p>
      )}

      {/* ---- Action row ---- */}
      <div className="race-card-actions">
        {confirmingDelete ? (
          <div className="delete-confirm">
            <span>Delete this race?</span>
            <button className="btn-danger" onClick={handleDelete}>Yes, delete</button>
            <button className="btn-ghost" onClick={() => setConfirmingDelete(false)}>Cancel</button>
          </div>
        ) : (
          <>
            <button className="btn-ghost" onClick={() => onEdit(race)}>Edit</button>
            <button className="btn-danger-outline" onClick={() => setConfirmingDelete(true)}>Delete</button>
          </>
        )}
      </div>

    </article>
  )
}
