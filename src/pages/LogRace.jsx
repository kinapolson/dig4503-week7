import LogRaceForm from '../components/shared/LogRaceForm'
import './Page.css'

export default function LogRace() {
  return (
    <div className="page-container">
      <h1>Log a Race</h1>
      <p className="page-sub">Fill in the details for a race you watched.</p>
      <LogRaceForm />
    </div>
  )
}
