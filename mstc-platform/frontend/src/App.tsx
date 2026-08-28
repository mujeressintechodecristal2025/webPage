import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import PublicLayout from '@/features/public/layouts/PublicLayout'
import HomePage from '@/features/public/pages/HomePage'
import NotFoundPage from '@/shared/components/NotFoundPage'
import ProtectedRoute from '@/features/admin/components/ProtectedRoute'
import AdminLayout from '@/features/admin/components/AdminLayout'

// ── Rutas públicas (lazy) ─────────────────────────────────────────────────────
const GaleriaPage       = lazy(() => import('@/features/public/pages/GaleriaPage'))
const PrivacyPolicyPage = lazy(() => import('@/features/public/pages/PrivacyPolicyPage'))
const TransparenciaPage = lazy(() => import('@/features/public/pages/TransparenciaPage'))

// ── Blog público (lazy) ───────────────────────────────────────────────────────
const BlogListPage   = lazy(() => import('@/features/blog/pages/BlogListPage'))
const BlogDetailPage = lazy(() => import('@/features/blog/pages/BlogDetailPage'))

// ── Auth (lazy) ───────────────────────────────────────────────────────────────
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))

// ── Panel admin (lazy) ────────────────────────────────────────────────────────
const AdminBlogListPage    = lazy(() => import('@/features/admin/pages/AdminBlogListPage'))
const AdminBlogFormPage    = lazy(() => import('@/features/admin/pages/AdminBlogFormPage'))
const AdminBlogPreviewPage = lazy(() => import('@/features/admin/pages/AdminBlogPreviewPage'))

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

        {/* ── Rutas públicas con PublicLayout ─────────────────────────────── */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/galeria" element={
            <Suspense fallback={<PageLoader />}><GaleriaPage /></Suspense>
          } />
          <Route path="/politica-de-privacidad" element={
            <Suspense fallback={<PageLoader />}><PrivacyPolicyPage /></Suspense>
          } />
          <Route path="/transparencia" element={
            <Suspense fallback={<PageLoader />}><TransparenciaPage /></Suspense>
          } />

          {/* Blog público */}
          <Route path="/blog" element={
            <Suspense fallback={<PageLoader />}><BlogListPage /></Suspense>
          } />
          <Route path="/blog/:slug" element={
            <Suspense fallback={<PageLoader />}><BlogDetailPage /></Suspense>
          } />
        </Route>

        {/* ── Login (sin PublicLayout) ─────────────────────────────────────── */}
        <Route path="/login" element={
          <Suspense fallback={<PageLoader />}><LoginPage /></Suspense>
        } />

        {/* ── Panel de administración (protegido) ──────────────────────────── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* /admin → redirige a /admin/blog */}
          <Route index element={<Navigate to="/admin/blog" replace />} />

          <Route path="blog" element={
            <Suspense fallback={<PageLoader />}><AdminBlogListPage /></Suspense>
          } />
          <Route path="blog/nuevo" element={
            <Suspense fallback={<PageLoader />}><AdminBlogFormPage /></Suspense>
          } />
          <Route path="blog/:id/editar" element={
            <Suspense fallback={<PageLoader />}><AdminBlogFormPage /></Suspense>
          } />
          <Route path="blog/:id/preview" element={
            <Suspense fallback={<PageLoader />}><AdminBlogPreviewPage /></Suspense>
          } />
        </Route>

        {/* ── 404 ─────────────────────────────────────────────────────────── */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
