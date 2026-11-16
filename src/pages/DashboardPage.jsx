import AppHeader from '../components/AppHeader'
import { useAuth } from '../hooks/useAuth'

function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="dashboard-page">
      <AppHeader />
      <main className="dashboard-content">
        <p className="eyebrow">Akun siap digunakan</p>
        <h1>Selamat datang</h1>
        <p>
          Anda masuk sebagai {user?.email}. Area daftar tugas akan tersedia
          pada tahap berikutnya.
        </p>
      </main>
    </div>
  )
}

export default DashboardPage
