// Data service layer — currently uses localStorage.
// Swap these functions for fetch() calls when MongoDB is added in Phase 5.
// Components should never call localStorage directly.

const KEY = 'races'

// --- Internal helpers ---

function readStorage() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    console.warn('raceService: localStorage data was corrupted. Resetting.')
    localStorage.removeItem(KEY)
    return []
  }
}

function writeStorage(races) {
  localStorage.setItem(KEY, JSON.stringify(races))
}

// --- Public API ---

/**
 * Returns all logged races, sorted by date descending (most recent first).
 * @returns {Race[]}
 */
export function getRaces() {
  return readStorage().sort((a, b) => new Date(b.date) - new Date(a.date))
}

/**
 * Adds a new race entry. Generates a unique id and createdAt timestamp.
 * @param {Omit<Race, 'id' | 'createdAt'>} raceData
 * @returns {Race} the newly created race
 */
export function addRace(raceData) {
  const races = readStorage()
  const newRace = {
    ...raceData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  races.push(newRace)
  writeStorage(races)
  return newRace
}

/**
 * Updates an existing race by id. Merges the provided fields.
 * @param {string} id
 * @param {Partial<Race>} updates
 * @returns {Race | null} the updated race, or null if not found
 */
export function updateRace(id, updates) {
  const races = readStorage()
  const index = races.findIndex(r => r.id === id)
  if (index === -1) {
    console.warn(`raceService: race with id "${id}" not found.`)
    return null
  }
  races[index] = { ...races[index], ...updates }
  writeStorage(races)
  return races[index]
}

/**
 * Deletes a race by id.
 * @param {string} id
 * @returns {boolean} true if deleted, false if id was not found
 */
export function deleteRace(id) {
  const races = readStorage()
  const filtered = races.filter(r => r.id !== id)
  if (filtered.length === races.length) {
    console.warn(`raceService: race with id "${id}" not found.`)
    return false
  }
  writeStorage(filtered)
  return true
}
