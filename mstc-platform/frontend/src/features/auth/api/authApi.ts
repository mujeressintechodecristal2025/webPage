import apiClient from '@/shared/api/client'
import type { AuthUser, UserRole } from '@/shared/types'

interface LoginResponse {
  token: string
  userId: string
  email: string
  role: UserRole
  expiresInHours: number
}

/**
 * Autentica un administrador contra POST /api/v1/auth/login.
 * Retorna el token JWT y los datos del usuario.
 */
export const loginAdmin = async (
  email: string,
  password: string,
): Promise<{ token: string; user: AuthUser }> => {
  const response = await apiClient.post<LoginResponse>('/api/v1/auth/login', {
    email,
    password,
    role: 'ADMIN',
  })

  const { token, userId, email: userEmail, role } = response.data

  return {
    token,
    user: {
      id: userId,
      email: userEmail,
      role,
    },
  }
}
