// Sample race entries for development/testing.
// Usage: import and call seedRaces() from the browser console or a dev-only button.
//   import { seedRaces } from './services/seedRaces'
//   seedRaces()

import { addRace, getRaces } from './raceService'

export const sampleRaces = [
  {
    raceName: 'Monaco Grand Prix',
    circuit: 'Circuit de Monaco',
    season: 2024,
    round: 8,
    date: '2024-05-26',
    watchedOn: '2024-05-26',
    rating: 5,
    notes: 'Incredible strategy battle. Leclerc finally wins at home.',
    tags: ['street circuit', 'strategy', 'historic'],
  },
  {
    raceName: 'British Grand Prix',
    circuit: 'Silverstone Circuit',
    season: 2024,
    round: 12,
    date: '2024-07-07',
    watchedOn: '2024-07-07',
    rating: 4,
    notes: 'Hamilton signs off Silverstone in style. Emotional scenes at the end.',
    tags: ['wet start', 'emotional'],
  },
  {
    raceName: 'São Paulo Grand Prix',
    circuit: 'Autódromo José Carlos Pace',
    season: 2024,
    round: 21,
    date: '2024-11-03',
    watchedOn: '2024-11-04',
    rating: 5,
    notes: 'One of the greatest races ever. Verstappen from 17th to the win.',
    tags: ['comeback', 'rain', 'all-time classic'],
  },
  {
    raceName: 'Bahrain Grand Prix',
    circuit: 'Bahrain International Circuit',
    season: 2025,
    round: 1,
    date: '2025-03-02',
    watchedOn: '2025-03-02',
    rating: 3,
    notes: 'Solid season opener. McLaren looking strong.',
    tags: ['season opener'],
  },
]

/**
 * Seeds localStorage with sample races. Skips seeding if data already exists.
 * @param {boolean} force - if true, clears existing data before seeding
 */
export function seedRaces(force = false) {
  if (force) localStorage.removeItem('races')

  const existing = getRaces()
  if (existing.length > 0 && !force) {
    console.info('seedRaces: data already exists, skipping. Pass true to force.')
    return
  }

  sampleRaces.forEach(addRace)
  console.info(`seedRaces: added ${sampleRaces.length} sample races to localStorage.`)
}
