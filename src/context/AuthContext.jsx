import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth, storage } from '../firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]         = useState(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null)
      setAuthReady(true)
    })
    return unsubscribe
  }, [])

  // --- Registration / login / logout ---

  async function register(email, password, username) {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(credential.user, { displayName: username })
    setUser({ ...credential.user, displayName: username })
  }

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function logout() {
    await signOut(auth)
  }

  // --- Profile updates ---

  async function updateUsername(displayName) {
    await updateProfile(auth.currentUser, { displayName })
    setUser(u => ({ ...u, displayName }))
  }

  // Email and password changes require recent authentication.
  // The caller must provide the user's current password so we can re-authenticate first.
  async function updateUserEmail(newEmail, currentPassword) {
    const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
    await reauthenticateWithCredential(auth.currentUser, credential)
    await updateEmail(auth.currentUser, newEmail)
    setUser(u => ({ ...u, email: newEmail }))
  }

  async function updateUserPassword(currentPassword, newPassword) {
    const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
    await reauthenticateWithCredential(auth.currentUser, credential)
    await updatePassword(auth.currentUser, newPassword)
  }

  async function uploadProfilePhoto(file) {
    const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`)
    await uploadBytes(storageRef, file)
    const photoURL = await getDownloadURL(storageRef)
    await updateProfile(auth.currentUser, { photoURL })
    setUser(u => ({ ...u, photoURL }))
    return photoURL
  }

  async function deleteAccount(currentPassword) {
    const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
    await reauthenticateWithCredential(auth.currentUser, credential)
    await deleteUser(auth.currentUser)
  }

  return (
    <AuthContext.Provider value={{
      user, authReady,
      register, login, logout,
      updateUsername, updateUserEmail, updateUserPassword,
      uploadProfilePhoto, deleteAccount,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
