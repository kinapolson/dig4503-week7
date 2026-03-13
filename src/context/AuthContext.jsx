import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // null  = not yet checked (Firebase still resolving session)
  // false = checked, no user logged in
  // object = checked, user is logged in
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    // onAuthStateChanged fires once immediately with the persisted session
    // (or null), then again on every login/logout. Firebase handles
    // session persistence automatically via IndexedDB.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? false)
      setAuthReady(true)
    })
    return unsubscribe  // cleans up the listener on unmount
  }, [])

  async function register(email, password, username) {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    // Store the username as the Firebase displayName
    await updateProfile(credential.user, { displayName: username })
    // Refresh local user object so displayName is immediately available
    setUser({ ...credential.user, displayName: username })
  }

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
    // onAuthStateChanged will update user state automatically
  }

  async function logout() {
    await signOut(auth)
    // onAuthStateChanged will set user to false automatically
  }

  return (
    <AuthContext.Provider value={{ user, authReady, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
