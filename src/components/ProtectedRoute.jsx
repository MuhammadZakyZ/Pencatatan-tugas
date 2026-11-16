import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function ProtectedRoute({ children }) {
  const { loading, user } = useAuth()

  if (loading) {
    return (
      <p className="route-status" role="status">
        Memeriksa sesi masuk...
      </p>
    )
  }

  return user ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
