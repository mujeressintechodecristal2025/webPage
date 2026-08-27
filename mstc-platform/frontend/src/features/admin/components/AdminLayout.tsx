import { Outlet, Link, useNavigate } from 'react-router-dom'
import { LogOut, FileText, Home } from 'lucide-react'
import { useAuthStore } from '@/features/auth/store/authStore'

/**
 * Layout del panel de administración.
 * Barra superior con logo, email del admin y botón de cierre de sesión.
 * Renderiza las páginas anidadas via <Outlet />.
 */
export default function AdminLayout() {
  const { user, clearAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuth()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra superior */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / nombre */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-magenta to-magenta-dark flex items-center justify-center">
                <span className="text-white text-xs font-bold">M</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-charcoal leading-none">Panel Admin</p>
                <p className="text-xs text-soft-grey leading-none mt-0.5">Fundación MSTC</p>
              </div>
            </div>

            {/* Navegación admin */}
            <nav className="flex items-center gap-1">
              <Link
                to="/"
                className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm text-soft-grey hover:text-charcoal hover:bg-gray-100 transition-colors"
              >
                <Home size={15} />
                <span className="hidden sm:inline">Sitio web</span>
              </Link>
              <Link
                to="/admin/blog"
                className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm text-soft-grey hover:text-charcoal hover:bg-gray-100 transition-colors"
              >
                <FileText size={15} />
                <span className="hidden sm:inline">Blog</span>
              </Link>
            </nav>

            {/* Usuario y cierre de sesión */}
            <div className="flex items-center gap-3">
              <span className="hidden md:block text-sm text-soft-grey truncate max-w-[200px]">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm text-soft-grey hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido de la página */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
