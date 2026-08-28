import { useCallback, useEffect, useRef, useState } from 'react'
import type { BlogPostFormData } from '@/shared/types'

const DRAFT_PREFIX = 'mstc_blog_draft_'
const AUTOSAVE_DELAY = 2000 // 2 segundos tras el último cambio

/**
 * Auto-guarda el formulario del post en localStorage para evitar
 * pérdida de trabajo si la sesión expira o se cierra el navegador.
 *
 * @param key    identificador único del borrador ('new' o el id del post)
 * @param data   datos actuales del formulario
 */
export function useDraftAutosave(key: string, data: BlogPostFormData) {
  const storageKey = `${DRAFT_PREFIX}${key}`
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  // Guardar con debounce cuando cambian los datos
  useEffect(() => {
    // No guardar si el formulario está esencialmente vacío
    if (!data.title && !data.body) return

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify({ data, ts: Date.now() }))
        setSavedAt(new Date())
      } catch {
        /* localStorage lleno o no disponible — ignorar */
      }
    }, AUTOSAVE_DELAY)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [data, storageKey])

  /** Recupera un borrador guardado, si existe. */
  const loadDraft = useCallback((): BlogPostFormData | null => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      return parsed.data as BlogPostFormData
    } catch {
      return null
    }
  }, [storageKey])

  /** Verifica si hay un borrador guardado y su antigüedad. */
  const getDraftInfo = useCallback((): { exists: boolean; savedAt?: Date } => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return { exists: false }
      const parsed = JSON.parse(raw)
      return { exists: true, savedAt: new Date(parsed.ts) }
    } catch {
      return { exists: false }
    }
  }, [storageKey])

  /** Elimina el borrador guardado (llamar tras guardar exitosamente). */
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(storageKey)
    } catch {
      /* noop */
    }
  }, [storageKey])

  return { savedAt, loadDraft, getDraftInfo, clearDraft }
}
