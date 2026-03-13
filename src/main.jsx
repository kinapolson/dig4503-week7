import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: '2rem', maxWidth: '600px', margin: '4rem auto',
          fontFamily: 'monospace', color: '#fff'
        }}>
          <h1 style={{ color: '#e50000' }}>App failed to start</h1>
          <p style={{ color: '#aaa', margin: '1rem 0' }}>
            {this.state.error.message}
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
)
