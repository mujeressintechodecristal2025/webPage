import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuthStore } from '@/features/auth/store/authStore'

interface ProtectedRouteProps {
  children: ReactNode
}

/**
 * Guard de ruta para el panel de administración.
 * Si no hay token o el usuario no es ADMIN, redirige a /login.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, isAdmin } = useAuthStore()

  if (!token || !isAdmin()) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
