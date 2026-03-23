import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/races', label: 'Races' },
  { to: '/log', label: 'Log Race' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/community', label: 'Community' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  const initials = user?.displayName
    ? user.displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase()

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span className="brand-f1">F1</span> Race Tracker
      </NavLink>

      <ul className="navbar-links">
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="navbar-auth">
        {user ? (
          <>
            <NavLink to="/profile" className="navbar-avatar" title="My Profile">
              {user.photoURL
                ? <img src={user.photoURL} alt="Profile" className="navbar-avatar-img" />
                : <span className="navbar-avatar-initials">{initials}</span>
              }
            </NavLink>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            <NavLink to="/register" className="btn-register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
