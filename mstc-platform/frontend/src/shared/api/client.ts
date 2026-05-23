import axios from 'axios'
import type { ProblemDetail } from '@/shared/types'

/**
 * Instancia de Axios configurada para la API de MSTC.
 * En Fase 1 (GitHub Pages) VITE_API_URL puede estar vacío.
 * En Fase 2 apunta al backend Spring Boot.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30_000,
})

// Interceptor de request — adjunta JWT si existe
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('mstc_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor de response — manejo global de errores RFC 7807
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('mstc_token')
      window.location.href = '/login'
    }

    const problem: ProblemDetail = error.response?.data ?? {
      type: 'about:blank',
      title: 'Error de conexión',
      status: 0,
      detail: 'No se pudo conectar con el servidor.',
      instance: window.location.pathname,
    }

    return Promise.reject(problem)
  },
)

export default apiClient
