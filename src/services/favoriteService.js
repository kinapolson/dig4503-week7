// Favorites service — currently uses localStorage.
// Swap for fetch() calls when MongoDB is added in Phase 5.
// Components should never read localStorage directly.

const TEAMS_KEY = 'fav_teams'
const DRIVERS_KEY = 'fav_drivers'

// --- Internal helpers ---

function readList(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    console.warn(`favoriteService: corrupted data at "${key}". Resetting.`)
    localStorage.removeItem(key)
    return []
  }
}

function writeList(key, list) {
  localStorage.setItem(key, JSON.stringify(list))
}

// --- Teams ---

export function getFavoriteTeams() {
  return readList(TEAMS_KEY)
}

export function addFavoriteTeam(team) {
  const teams = readList(TEAMS_KEY)
  if (teams.some(t => t.id === team.id)) return   // already saved
  writeList(TEAMS_KEY, [...teams, team])
}

export function removeFavoriteTeam(id) {
  writeList(TEAMS_KEY, readList(TEAMS_KEY).filter(t => t.id !== id))
}

export function isTeamFavorited(id) {
  return readList(TEAMS_KEY).some(t => t.id === id)
}

// --- Drivers ---

export function getFavoriteDrivers() {
  return readList(DRIVERS_KEY)
}

export function addFavoriteDriver(driver) {
  const drivers = readList(DRIVERS_KEY)
  if (drivers.some(d => d.id === driver.id)) return   // already saved
  writeList(DRIVERS_KEY, [...drivers, driver])
}

export function removeFavoriteDriver(id) {
  writeList(DRIVERS_KEY, readList(DRIVERS_KEY).filter(d => d.id !== id))
}

export function isDriverFavorited(id) {
  return readList(DRIVERS_KEY).some(d => d.id === id)
}
