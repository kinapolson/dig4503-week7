import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/shared/ProtectedRoute'
import Home from './pages/Home'
import Races from './pages/Races'
import LogRace from './pages/LogRace'
import Favorites from './pages/Favorites'
import Community from './pages/Community'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected routes — require login */}
          <Route path="races"     element={<ProtectedRoute><Races /></ProtectedRoute>} />
          <Route path="log"       element={<ProtectedRoute><LogRace /></ProtectedRoute>} />
          <Route path="favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
