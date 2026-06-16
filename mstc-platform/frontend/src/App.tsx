import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import PublicLayout from '@/features/public/layouts/PublicLayout'
import HomePage from '@/features/public/pages/HomePage'
import NotFoundPage from '@/shared/components/NotFoundPage'

// Lazy loading para rutas secundarias (code splitting)
const GaleriaPage = lazy(() => import('@/features/public/pages/GaleriaPage'))
const PrivacyPolicyPage = lazy(() => import('@/features/public/pages/PrivacyPolicyPage'))
const TransparenciaPage = lazy(() => import('@/features/public/pages/TransparenciaPage'))

// Fase 2 — se descomenta cuando el backend esté disponible
// import LoginPage from '@/features/auth/pages/LoginPage'
// import DonorPortalPage from '@/features/donor-portal/pages/DonorPortalPage'
// import AdminPage from '@/features/admin/pages/AdminPage'

const basename = import.meta.env.BASE_URL || '/'

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="w-8 h-8 border-2 border-magenta/30 border-t-magenta rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Rutas públicas — Fase 1 */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/galeria" element={<Suspense fallback={<PageLoader />}><GaleriaPage /></Suspense>} />
          <Route path="/politica-de-privacidad" element={<Suspense fallback={<PageLoader />}><PrivacyPolicyPage /></Suspense>} />
          <Route path="/transparencia" element={<Suspense fallback={<PageLoader />}><TransparenciaPage /></Suspense>} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
