/**
 * Rutas centralizadas de assets del sitio.
 * Cambiar aquí actualiza toda la aplicación.
 *
 * Coloca los archivos en /public/images/
 */
const base = import.meta.env.BASE_URL || '/'

export const ASSETS = {
  /** Logo principal — WebP optimizado */
  logo: `${base}images/logo.webp`,

  /** Logo original alta resolución — para sección Hero */
  logoHD: `${base}images/logo.png`,

  /** Logo pequeño para navbar */
  logoSm: `${base}images/logo-sm.webp`,

  /** Imagen Open Graph para redes sociales */
  ogImage: `${base}images/logo.png`,

  /** Galería — Talleres de modistería */
  galleryTalleres: [
    `${base}images/talleres/taller1.jpg`,
    `${base}images/talleres/taller2.jpg`,
    `${base}images/talleres/taller3.jpg`,
    `${base}images/talleres/taller4.jpg`,
    `${base}images/talleres/taller5.jpg`,
    `${base}images/talleres/taller7.jpg`,
    `${base}images/talleres/taller8.jpg`,
  ],

  /** Galería — Capacitaciones psicosociales */
  galleryCapacitaciones: [
    `${base}images/capacitaciones/capacitacion1.jpg`,
    `${base}images/capacitaciones/capacitacion2.jpg`,
    `${base}images/capacitaciones/capacitacion3.jpg`,
    `${base}images/capacitaciones/capacitacion4.jpg`,
  ],

  /** Galería — Fotos grupales y beneficiarias */
  galleryGrupales: [
    `${base}images/grupales/grupal1.jpg`,
    `${base}images/grupales/grupal2.jpg`,
    `${base}images/grupales/grupal3.jpg`,
    `${base}images/grupales/grupal4.jpg`,
    `${base}images/grupales/grupal5.jpg`,
  ],
} as const
