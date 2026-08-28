/**
 * Script de pre-renderizado para SEO.
 * 
 * Levanta un servidor estático con el build de producción,
 * abre cada ruta con Puppeteer y guarda el HTML renderizado.
 * Esto permite que Google indexe el contenido sin ejecutar JS.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'http'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, '../dist')

// Rutas estáticas a pre-renderizar
const STATIC_ROUTES = [
  '/',
  '/galeria',
  '/transparencia',
  '/politica-de-privacidad',
  '/blog',
]

const PORT = 4173
const BASE_URL = 'https://fundacionmujeressintechodecristal.org'
const API_URL = process.env.VITE_API_URL || 'https://api.fundacionmujeressintechodecristal.org'

/**
 * Obtiene los slugs de todos los posts publicados desde el API.
 * Si el API no responde, continúa solo con las rutas estáticas.
 */
async function fetchBlogSlugs() {
  const slugs = []
  try {
    let page = 0
    let totalPages = 1
    while (page < totalPages) {
      const res = await fetch(`${API_URL}/api/v1/blog?page=${page}&size=50`)
      if (!res.ok) break
      const data = await res.json()
      totalPages = data.totalPages || 1
      for (const post of data.content || []) {
        if (post.slug) slugs.push(post.slug)
      }
      page++
    }
    console.log(`  📝 ${slugs.length} posts del blog encontrados`)
  } catch (err) {
    console.warn(`  ⚠️  No se pudo consultar el API del blog (${err.message}). Solo rutas estáticas.`)
  }
  return slugs
}

/**
 * Genera sitemap.xml con todas las rutas.
 */
function generateSitemap(routes) {
  const today = new Date().toISOString().split('T')[0]
  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.startsWith('/blog/') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.startsWith('/blog') ? '0.8' : '0.6'}</priority>
  </url>`,
    )
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  writeFileSync(resolve(DIST, 'sitemap.xml'), sitemap, 'utf-8')
  console.log(`  🗺️  sitemap.xml generado con ${routes.length} URLs`)
}

/**
 * Servidor estático simple para servir el build
 */
function startServer() {
  return new Promise((resolvePromise) => {
    const server = createServer((req, res) => {
      let filePath = resolve(DIST, req.url === '/' ? 'index.html' : req.url.slice(1))

      // SPA fallback: si no existe el archivo, servir index.html
      if (!existsSync(filePath)) {
        filePath = resolve(DIST, 'index.html')
      }

      try {
        const content = readFileSync(filePath)
        const ext = filePath.split('.').pop()
        const mimeTypes = {
          html: 'text/html',
          js: 'application/javascript',
          css: 'text/css',
          png: 'image/png',
          webp: 'image/webp',
          svg: 'image/svg+xml',
          json: 'application/json',
        }
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' })
        res.end(content)
      } catch {
        res.writeHead(404)
        res.end('Not found')
      }
    })

    server.listen(PORT, () => {
      console.log(`  Servidor estático en http://localhost:${PORT}`)
      resolvePromise(server)
    })
  })
}

async function prerender() {
  console.log('\n🔍 Pre-renderizando páginas para SEO...\n')

  // Verificar que existe el build
  if (!existsSync(resolve(DIST, 'index.html'))) {
    console.error('❌ No se encontró dist/index.html. Ejecuta "npm run build:only" primero.')
    process.exit(1)
  }

  // Obtener slugs del blog y armar la lista completa de rutas
  const blogSlugs = await fetchBlogSlugs()
  const blogRoutes = blogSlugs.map((slug) => `/blog/${slug}`)
  const ROUTES = [...STATIC_ROUTES, ...blogRoutes]

  // Generar sitemap con todas las rutas
  generateSitemap(ROUTES)

  const server = await startServer()

  // Importar puppeteer dinámicamente
  const puppeteer = await import('puppeteer')
  const browser = await puppeteer.default.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  for (const route of ROUTES) {
    const page = await browser.newPage()

    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      })

      // Esperar a que React renderice el contenido
      await page.waitForSelector('#root > *', { timeout: 10000 })

      // Obtener el HTML completo
      const html = await page.content()

      // Determinar la ruta del archivo de salida
      const outputPath = route === '/'
        ? resolve(DIST, 'index.html')
        : resolve(DIST, `${route.slice(1)}/index.html`)

      // Crear directorio si no existe
      const outputDir = dirname(outputPath)
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true })
      }

      writeFileSync(outputPath, html, 'utf-8')
      console.log(`  ✅ ${route} → ${outputPath.replace(DIST, 'dist')}`)
    } catch (error) {
      console.error(`  ❌ Error en ${route}:`, error.message)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  server.close()

  console.log('\n✨ Pre-renderizado completado.\n')
}

prerender().catch((err) => {
  console.error('Error fatal en pre-renderizado:', err)
  process.exit(1)
})
