import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * ProtectedRoute — wraps any route that requires authentication.
 *
 * Renders nothing while Firebase resolves the session (authReady = false),
 * preventing a flash-redirect to /login on page refresh.
 * Once resolved: redirects to /login if no user, renders children if logged in.
 */
export default function ProtectedRoute({ children }) {
  const { user, authReady } = useAuth()

  if (!authReady) return null   // session still loading — render nothing

  if (!user) return <Navigate to="/login" replace />

  return children
}
