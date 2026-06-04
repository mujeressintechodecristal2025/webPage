/**
 * Rutas centralizadas de assets del sitio.
 * Cambiar aquí actualiza toda la aplicación.
 *
 * Coloca los archivos en /public/images/
 */
const base = import.meta.env.BASE_URL || '/'

export const ASSETS = {
  /** Logo principal — PNG con fondo transparente, 400×400 px */
  logo: `${base}images/logo.png`,

  /** Imagen del hero — WebP o JPG, 800×600 px, máx 200 KB */
  hero: `${base}images/hero.webp`,

  /** Imágenes de proyectos — WebP o JPG, 600×400 px, máx 100 KB */
  projects: {
    tejiendo:      `${base}images/proyecto-tejiendo.webp`,
    raices:        `${base}images/proyecto-raices.webp`,
    emprendedoras: `${base}images/proyecto-emprendedoras.webp`,
  },

  /** Imagen Open Graph para redes sociales — JPG, 1200×630 px */
  ogImage: `${base}images/og-image.jpg`,
} as const
