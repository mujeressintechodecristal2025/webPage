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

// ============================================================
// Tipos del módulo Blog
// ============================================================

/** Estado de publicación de un post */
export type BlogStatus = 'DRAFT' | 'PUBLISHED'

/** Post del blog — vista resumida para la lista */
export interface BlogPostSummary {
  id: string
  slug: string
  title: string
  excerpt?: string
  imageS3Key?: string
  category?: string
  tags: string[]
  authorName?: string
  publishedAt?: string
}

/** Post del blog — vista completa para el detalle */
export interface BlogPostDetail extends BlogPostSummary {
  body: string
  updatedAt?: string
}

/** Post del blog — vista admin (incluye todos los estados y timestamps) */
export interface BlogPostAdmin extends BlogPostDetail {
  status: BlogStatus
  createdAt?: string
}

/** Datos del formulario de creación/edición de post */
export interface BlogPostFormData {
  title: string
  slug: string
  excerpt: string
  body: string
  imageS3Key: string
  category: string
  tags: string[]
  status: BlogStatus
  authorName: string
}

// ============================================================
// Tipos de autenticación y usuario
// ============================================================

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
