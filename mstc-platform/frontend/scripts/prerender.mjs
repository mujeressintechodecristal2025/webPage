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

// Rutas públicas a pre-renderizar
const ROUTES = [
  '/',
  '/galeria',
  '/transparencia',
  '/politica-de-privacidad',
  '/blog',
]

const PORT = 4173

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
