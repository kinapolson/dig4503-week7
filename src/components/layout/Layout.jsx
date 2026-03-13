import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import './Layout.css'

export default function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>F1 Race Tracker &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
