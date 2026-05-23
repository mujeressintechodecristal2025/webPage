// ============================================================
// Tipos globales compartidos entre features
// ============================================================

/** Respuesta de error RFC 7807 Problem Details */
export interface ProblemDetail {
  type: string
  title: string
  status: number
  detail: string
  instance: string
}

/** Respuesta paginada genérica */
export interface Page<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}

/** Secciones del sitio público */
export type SiteSection = 'INICIO' | 'NOSOTROS' | 'PROYECTOS' | 'CONTACTO'

/** Ítem de contenido del CMS */
export interface ContentItem {
  id: string
  section: SiteSection
  title: string
  body: string
  imageUrl?: string
  published: boolean
  updatedAt: string
}

/** Proyecto de la fundación */
export interface Project {
  id: string
  title: string
  description: string
  imageUrl?: string
  phase: string
  tags: string[]
  featured: boolean
}

/** Estadística de impacto */
export interface ImpactStat {
  icon: string
  value: string
  label: string
}

/** Mensaje de contacto */
export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
  privacyConsent: boolean
}

/** Roles de usuario */
export type UserRole = 'ADMIN' | 'DONOR'

/** Estado de autenticación */
export interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
  token: string | null
}

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  fullName?: string
}
