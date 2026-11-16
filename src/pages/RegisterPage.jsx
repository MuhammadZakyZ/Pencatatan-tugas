import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../hooks/useAuth'

function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (password !== passwordConfirmation) {
      setError('Konfirmasi kata sandi tidak cocok.')
      return
    }
    if (password.length < 8) {
      setError('Kata sandi harus terdiri dari minimal 8 karakter.')
      return
    }

    setLoading(true)
    try {
      const data = await signUp(email.trim(), password)
      if (data.session) {
        navigate('/', { replace: true })
      } else {
        setSuccess(
          'Jika pendaftaran berhasil, tautan konfirmasi akan dikirim ke email Anda. Silakan masuk setelah verifikasi.',
        )
      }
    } catch (signUpError) {
      setError(
        signUpError instanceof Error
          ? signUpError.message
          : 'Pendaftaran gagal. Periksa kembali email dan kata sandi Anda.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Buat akun"
      description="Daftar untuk mulai mengatur tugas Anda."
      footer={
        <p>
          Sudah punya akun? <Link to="/login">Masuk</Link>
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
            autoComplete="new-password"
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />
        </label>
        <label className="form-field">
          Konfirmasi kata sandi
          <input
            type="password"
            name="passwordConfirmation"
            autoComplete="new-password"
            placeholder="Ulangi kata sandi"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            minLength={8}
            required
          />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="form-success" role="status">
            {success}
          </p>
        )}
        <button className="form-submit" type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Daftar'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
