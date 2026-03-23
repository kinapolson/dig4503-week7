import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Page.css'
import './Profile.css'

// ---- Small helper: show initials when no photo is set ----
function Avatar({ user, size = 80 }) {
  const initials = user.displayName
    ? user.displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : user.email[0].toUpperCase()

  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt="Profile"
        className="avatar-img"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <div className="avatar-initials" style={{ width: size, height: size, fontSize: size * 0.35 }}>
      {initials}
    </div>
  )
}

// ---- Reusable inline status message ----
function StatusMsg({ status }) {
  if (!status) return null
  return (
    <p className={`status-msg ${status.type}`}>{status.text}</p>
  )
}

export default function Profile() {
  const { user, logout, updateUsername, updateUserEmail, updateUserPassword, uploadProfilePhoto, deleteAccount } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  // --- Username ---
  const [username, setUsername]         = useState(user?.displayName || '')
  const [usernameStatus, setUsernameStatus] = useState(null)
  const [usernameLoading, setUsernameLoading] = useState(false)

  // --- Email ---
  const [newEmail, setNewEmail]             = useState(user?.email || '')
  const [emailPassword, setEmailPassword]   = useState('')
  const [emailStatus, setEmailStatus]       = useState(null)
  const [emailLoading, setEmailLoading]     = useState(false)

  // --- Password ---
  const [currentPw, setCurrentPw]     = useState('')
  const [newPw, setNewPw]             = useState('')
  const [confirmPw, setConfirmPw]     = useState('')
  const [passwordStatus, setPasswordStatus] = useState(null)
  const [passwordLoading, setPasswordLoading] = useState(false)

  // --- Photo ---
  const [photoLoading, setPhotoLoading] = useState(false)
  const [photoStatus, setPhotoStatus]   = useState(null)

  // --- Delete ---
  const [deletePw, setDeletePw]         = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // ---- Handlers ----

  async function handleUsernameSubmit(e) {
    e.preventDefault()
    if (!username.trim()) { setUsernameStatus({ type: 'error', text: 'Username cannot be empty.' }); return }
    setUsernameLoading(true)
    try {
      await updateUsername(username.trim())
      setUsernameStatus({ type: 'success', text: 'Username updated.' })
    } catch {
      setUsernameStatus({ type: 'error', text: 'Failed to update username.' })
    } finally {
      setUsernameLoading(false)
    }
  }

  async function handleEmailSubmit(e) {
    e.preventDefault()
    if (!emailPassword) { setEmailStatus({ type: 'error', text: 'Enter your current password to confirm.' }); return }
    setEmailLoading(true)
    try {
      await updateUserEmail(newEmail, emailPassword)
      setEmailStatus({ type: 'success', text: 'Email updated.' })
      setEmailPassword('')
    } catch (err) {
      setEmailStatus({ type: 'error', text: friendlyAuthError(err.code) })
    } finally {
      setEmailLoading(false)
    }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault()
    if (newPw !== confirmPw) { setPasswordStatus({ type: 'error', text: 'New passwords do not match.' }); return }
    if (newPw.length < 6)    { setPasswordStatus({ type: 'error', text: 'Password must be at least 6 characters.' }); return }
    setPasswordLoading(true)
    try {
      await updateUserPassword(currentPw, newPw)
      setPasswordStatus({ type: 'success', text: 'Password updated.' })
      setCurrentPw(''); setNewPw(''); setConfirmPw('')
    } catch (err) {
      setPasswordStatus({ type: 'error', text: friendlyAuthError(err.code) })
    } finally {
      setPasswordLoading(false)
    }
  }

  async function handlePhotoChange(e) {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setPhotoStatus({ type: 'error', text: 'Image must be under 2 MB.' })
      return
    }
    setPhotoLoading(true)
    try {
      await uploadProfilePhoto(file)
      setPhotoStatus({ type: 'success', text: 'Profile photo updated.' })
    } catch {
      setPhotoStatus({ type: 'error', text: 'Failed to upload photo.' })
    } finally {
      setPhotoLoading(false)
    }
  }

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  async function handleDeleteAccount(e) {
    e.preventDefault()
    if (!deletePw) { setDeleteStatus({ type: 'error', text: 'Enter your password to confirm deletion.' }); return }
    setDeleteLoading(true)
    try {
      await deleteAccount(deletePw)
      navigate('/register')
    } catch (err) {
      setDeleteStatus({ type: 'error', text: friendlyAuthError(err.code) })
    } finally {
      setDeleteLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="page-container">
      <h1>My Profile</h1>

      {/* ---- Avatar ---- */}
      <section className="profile-section">
        <h2>Profile Photo</h2>
        <div className="avatar-row">
          <Avatar user={user} size={88} />
          <div className="avatar-actions">
            <button
              className="btn-ghost"
              onClick={() => fileInputRef.current.click()}
              disabled={photoLoading}
            >
              {photoLoading ? 'Uploading…' : 'Change Photo'}
            </button>
            <p className="field-hint">JPG or PNG, max 2 MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <StatusMsg status={photoStatus} />
      </section>

      {/* ---- Username ---- */}
      <section className="profile-section">
        <h2>Username</h2>
        <form className="profile-form" onSubmit={handleUsernameSubmit}>
          <div className="form-group">
            <label htmlFor="username">Display name</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <StatusMsg status={usernameStatus} />
          <button type="submit" className="btn-primary" disabled={usernameLoading}>
            {usernameLoading ? 'Saving…' : 'Save Username'}
          </button>
        </form>
      </section>

      {/* ---- Email ---- */}
      <section className="profile-section">
        <h2>Email Address</h2>
        <p className="field-hint">Changing your email requires your current password.</p>
        <form className="profile-form" onSubmit={handleEmailSubmit}>
          <div className="form-group">
            <label htmlFor="newEmail">New email</label>
            <input
              id="newEmail"
              type="email"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailPassword">Current password</label>
            <input
              id="emailPassword"
              type="password"
              placeholder="Confirm with your password"
              value={emailPassword}
              onChange={e => setEmailPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <StatusMsg status={emailStatus} />
          <button type="submit" className="btn-primary" disabled={emailLoading}>
            {emailLoading ? 'Saving…' : 'Save Email'}
          </button>
        </form>
      </section>

      {/* ---- Password ---- */}
      <section className="profile-section">
        <h2>Change Password</h2>
        <form className="profile-form" onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label htmlFor="currentPw">Current password</label>
            <input
              id="currentPw"
              type="password"
              value={currentPw}
              onChange={e => setCurrentPw(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPw">New password</label>
            <input
              id="newPw"
              type="password"
              placeholder="Min. 6 characters"
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPw">Confirm new password</label>
            <input
              id="confirmPw"
              type="password"
              value={confirmPw}
              onChange={e => setConfirmPw(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <StatusMsg status={passwordStatus} />
          <button type="submit" className="btn-primary" disabled={passwordLoading}>
            {passwordLoading ? 'Saving…' : 'Update Password'}
          </button>
        </form>
      </section>

      {/* ---- Session ---- */}
      <section className="profile-section">
        <h2>Session</h2>
        <p className="field-hint">Logged in as <strong>{user.email}</strong></p>
        <button className="btn-ghost" onClick={handleLogout}>Logout</button>
      </section>

      {/* ---- Danger zone ---- */}
      <section className="profile-section danger-zone">
        <h2>Delete Account</h2>
        <p className="field-hint">This permanently deletes your account. This cannot be undone.</p>

        {!deleteConfirm ? (
          <button className="btn-danger-outline" onClick={() => setDeleteConfirm(true)}>
            Delete My Account
          </button>
        ) : (
          <form className="profile-form" onSubmit={handleDeleteAccount}>
            <div className="form-group">
              <label htmlFor="deletePw">Enter your password to confirm</label>
              <input
                id="deletePw"
                type="password"
                value={deletePw}
                onChange={e => setDeletePw(e.target.value)}
                autoComplete="current-password"
                autoFocus
              />
            </div>
            <StatusMsg status={deleteStatus} />
            <div className="form-actions">
              <button type="submit" className="btn-danger" disabled={deleteLoading}>
                {deleteLoading ? 'Deleting…' : 'Confirm Delete'}
              </button>
              <button type="button" className="btn-ghost" onClick={() => { setDeleteConfirm(false); setDeleteStatus(null) }}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

    </div>
  )
}

function friendlyAuthError(code) {
  switch (code) {
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect password.'
    case 'auth/email-already-in-use':
      return 'That email is already in use.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/requires-recent-login':
      return 'Please log out and log back in before making this change.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait and try again.'
    default:
      return 'Something went wrong. Please try again.'
  }
}
