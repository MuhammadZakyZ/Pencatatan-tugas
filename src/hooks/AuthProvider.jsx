import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'
import {
  signInWithEmail,
  signOutUser,
  signUpWithEmail,
  subscribeToAuthChanges,
} from '../services/authService'

function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const {
      data: { subscription },
    } = subscribeToAuthChanges((_event, nextSession) => {
      if (!isMounted) return
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signUp = useCallback(async (email, password) => {
    const { data, error } = await signUpWithEmail(email, password)
    if (error) {
      throw new Error(
        'Pendaftaran gagal. Periksa kembali email dan kata sandi Anda.',
      )
    }
    if (data.session) setSession(data.session)
    return data
  }, [])

  const signIn = useCallback(async (email, password) => {
    const { data, error } = await signInWithEmail(email, password)
    if (error) throw new Error('Email atau password salah')
    setSession(data.session)
    return data
  }, [])

  const signOut = useCallback(async () => {
    const { error } = await signOutUser()
    if (error) throw new Error('Gagal keluar. Silakan coba lagi.')
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      signUp,
      signIn,
      signOut,
    }),
    [loading, session, signIn, signOut, signUp],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
