import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function PublicOnlyRoute({ children }) {
  const { loading, user } = useAuth()

  if (loading) {
    return (
      <p className="route-status" role="status">
        Memeriksa sesi masuk...
      </p>
    )
  }

  return user ? <Navigate to="/" replace /> : children
}

export default PublicOnlyRoute
