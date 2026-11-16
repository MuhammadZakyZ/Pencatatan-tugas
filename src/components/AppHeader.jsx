import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function AppHeader() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSignOut() {
    setLoading(true)
    setError('')
    try {
      await signOut()
      navigate('/login', { replace: true })
    } catch (signOutError) {
      setError(
        signOutError instanceof Error
          ? signOutError.message
          : 'Gagal keluar. Silakan coba lagi.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            PT
          </span>
          <span>Pencatatan Tugas</span>
        </div>
        <div className="app-header-user">
          <span>{user?.email}</span>
          <button
            className="logout-button"
            type="button"
            onClick={handleSignOut}
            disabled={loading}
            aria-label="Keluar dari akun"
          >
            {loading ? 'Keluar...' : 'Keluar'}
          </button>
        </div>
      </header>
      {error && (
        <p className="form-error logout-error" role="alert">
          {error}
        </p>
      )}
    </>
  )
}

export default AppHeader
