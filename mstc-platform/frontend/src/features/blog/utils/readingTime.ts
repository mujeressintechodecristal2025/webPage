/**
 * Calcula el tiempo estimado de lectura de un contenido HTML.
 * Basado en ~200 palabras por minuto (promedio de lectura en español).
 */
export function calculateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ') // quitar tags HTML
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.ceil(words / 200)
  return Math.max(1, minutes)
}
