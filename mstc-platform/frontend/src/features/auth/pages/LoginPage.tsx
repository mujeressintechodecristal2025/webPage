import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/shared/utils/cn'
import { loginAdmin } from '@/features/auth/api/authApi'
import { useAuthStore } from '@/features/auth/store/authStore'
import SEO from '@/shared/components/SEO'
import type { ProblemDetail } from '@/shared/types'

const loginSchema = z.object({
  email:    z.string().email('Ingresa un correo válido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
})

type LoginValues = z.infer<typeof loginSchema>

/**
 * Página de inicio de sesión para administradores.
 * POST /api/v1/auth/login → guarda JWT en authStore → redirige a /admin/blog
 */
export default function LoginPage() {
  const navigate    = useNavigate()
  const { setAuth } = useAuthStore()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values: LoginValues) => {
    setServerError(null)
    try {
      const { token, user } = await loginAdmin(values.email, values.password)
      setAuth(token, user)
      navigate('/admin/blog', { replace: true })
    } catch (err: unknown) {
      const problem = err as ProblemDetail
      if (problem?.type?.includes('account-locked')) {
        setServerError('Tu cuenta está bloqueada temporalmente por múltiples intentos fallidos. Intenta en 15 minutos.')
      } else {
        setServerError('Correo o contraseña incorrectos. Verifica tus datos e intenta de nuevo.')
      }
    }
  }

  return (
    <>
      <SEO
        title="Acceso administrador"
        description="Panel de administración — Fundación Mujeres Sin Techo de Cristal"
        path="/login"
        noindex
      />

      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="w-full max-w-md">

          {/* Logo y título */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-magenta to-magenta-dark shadow-lg mb-4">
              <span className="text-white text-2xl font-serif font-bold">M</span>
            </div>
            <h1 className="font-serif text-3xl text-charcoal">Panel de administración</h1>
            <p className="text-soft-grey text-sm mt-1">Fundación Mujeres Sin Techo de Cristal</p>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

              {/* Error del servidor */}
              {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm" role="alert">
                  {serverError}
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  placeholder="admin@fundacion.org"
                  className={cn(
                    'w-full px-3 py-2.5 rounded-lg border text-sm text-charcoal bg-white',
                    'placeholder:text-gray-400 outline-none transition-colors',
                    'focus:ring-1 focus:ring-magenta/20',
                    errors.email ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-magenta',
                  )}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-1.5">
                  Contraseña
                </label>
                <input
                  id="password"
                  {...register('password')}
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={cn(
                    'w-full px-3 py-2.5 rounded-lg border text-sm text-charcoal bg-white',
                    'placeholder:text-gray-400 outline-none transition-colors',
                    'focus:ring-1 focus:ring-magenta/20',
                    errors.password ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-magenta',
                  )}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full py-3 rounded-lg text-sm font-sans font-medium text-white transition-all',
                  'bg-gradient-to-r from-magenta to-magenta-dark hover:shadow-lg hover:-translate-y-px',
                  'disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none',
                  'flex items-center justify-center gap-2',
                )}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Verificando...
                  </>
                ) : (
                  'Iniciar sesión'
                )}
              </button>

            </form>
          </div>

          {/* Volver al sitio */}
          <p className="text-center mt-6 text-sm text-soft-grey">
            <a href="/" className="text-magenta hover:underline">← Volver al sitio web</a>
          </p>
        </div>
      </div>
    </>
  )
}
