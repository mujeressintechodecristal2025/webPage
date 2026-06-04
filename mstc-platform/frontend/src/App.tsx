import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from '@/features/public/layouts/PublicLayout'
import HomePage from '@/features/public/pages/HomePage'
import PrivacyPolicyPage from '@/features/public/pages/PrivacyPolicyPage'
import NotFoundPage from '@/shared/components/NotFoundPage'

// Fase 2 — se descomenta cuando el backend esté disponible
// import LoginPage from '@/features/auth/pages/LoginPage'
// import DonorPortalPage from '@/features/donor-portal/pages/DonorPortalPage'
// import AdminPage from '@/features/admin/pages/AdminPage'

const basename = import.meta.env.BASE_URL || '/'

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {/* Rutas públicas — Fase 1 */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicyPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
