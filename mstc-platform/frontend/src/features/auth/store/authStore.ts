import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthUser } from '@/shared/types'

interface AuthStore {
  token: string | null
  user: AuthUser | null
  setAuth: (token: string, user: AuthUser) => void
  clearAuth: () => void
  isAdmin: () => boolean
}

/**
 * Store de autenticación con persistencia en localStorage.
 * El token también se guarda bajo 'mstc_token' para que el interceptor
 * de Axios lo pueda leer directamente.
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      setAuth: (token: string, user: AuthUser) => {
        localStorage.setItem('mstc_token', token)
        set({ token, user })
      },

      clearAuth: () => {
        localStorage.removeItem('mstc_token')
        set({ token: null, user: null })
      },

      isAdmin: () => get().user?.role === 'ADMIN',
    }),
    {
      name: 'mstc-auth',
      // Solo persistir user — el token se maneja en localStorage directamente
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
)
