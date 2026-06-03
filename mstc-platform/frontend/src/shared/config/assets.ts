/**
 * Rutas centralizadas de assets del sitio.
 * Cambiar aquí actualiza toda la aplicación.
 *
 * Coloca los archivos en /public/images/
 */
export const ASSETS = {
  /** Logo principal — PNG con fondo transparente, 400×400 px */
  logo: '/images/logo.png',

  /** Imagen del hero — WebP o JPG, 800×600 px, máx 200 KB */
  hero: '/images/hero.webp',   // ← agregar esta imagen en /public/images/

  /** Imágenes de proyectos — WebP o JPG, 600×400 px, máx 100 KB */
  projects: {
    tejiendo:      '/images/proyecto-tejiendo.webp',
    raices:        '/images/proyecto-raices.webp',
    emprendedoras: '/images/proyecto-emprendedoras.webp',
  },

  /** Imagen Open Graph para redes sociales — JPG, 1200×630 px */
  ogImage: '/images/og-image.jpg',
} as const
