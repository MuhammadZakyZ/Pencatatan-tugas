import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../hooks/useAuth'

function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email.trim(), password)
      navigate('/', { replace: true })
    } catch (signInError) {
      setError(
        signInError instanceof Error
          ? signInError.message
          : 'Email atau password salah',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Selamat datang"
      description="Masuk untuk melanjutkan mencatat tugas Anda."
      footer={
        <p>
          Belum punya akun? <Link to="/daftar">Daftar</Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="form-field">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="form-field">
          Kata sandi
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="form-submit" type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
