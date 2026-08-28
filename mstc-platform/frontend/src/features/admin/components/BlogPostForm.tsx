import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Eye } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import RichTextEditor from '@/features/admin/components/RichTextEditor'
import type { BlogPostFormData, BlogStatus } from '@/shared/types'

// ── Schema de validación ──────────────────────────────────────────────────────

const blogPostSchema = z.object({
  title:      z.string().min(1, 'El título es obligatorio').max(255),
  slug:       z
    .string()
    .min(1, 'El slug es obligatorio')
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Solo minúsculas, números y guiones'),
  excerpt:    z.string().max(500).optional().default(''),
  body:       z.string().min(1, 'El contenido es obligatorio'),
  imageS3Key: z.string().optional().default(''),
  category:   z.string().optional().default(''),
  tags:       z.array(z.string()).default([]),
  status:     z.enum(['DRAFT', 'PUBLISHED']),
  authorName: z.string().optional().default(''),
})

type FormValues = z.infer<typeof blogPostSchema>

// ── Utilidad para generar slug ────────────────────────────────────────────────

const generateSlug = (title: string): string =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quitar tildes
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 100)

// ── Props ─────────────────────────────────────────────────────────────────────

interface BlogPostFormProps {
  defaultValues?: Partial<BlogPostFormData>
  onSubmit: (data: BlogPostFormData) => void
  isLoading?: boolean
  serverError?: string | null
  mode?: 'create' | 'edit'
}

// ── Componente ────────────────────────────────────────────────────────────────

export default function BlogPostForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  serverError,
  mode = 'create',
}: BlogPostFormProps) {
  // Controla si el slug fue editado manualmente (para no sobreescribirlo)
  const slugManuallyEdited = useRef(false)

  // Estado para input de tags
  const [tagInput, setTagInput] = useState('')
  const [imagePreviewOk, setImagePreviewOk] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title:      defaultValues?.title      ?? '',
      slug:       defaultValues?.slug       ?? '',
      excerpt:    defaultValues?.excerpt    ?? '',
      body:       defaultValues?.body       ?? '',
      imageS3Key: defaultValues?.imageS3Key ?? '',
      category:   defaultValues?.category   ?? '',
      tags:       defaultValues?.tags       ?? [],
      status:     (defaultValues?.status as BlogStatus) ?? 'DRAFT',
      authorName: defaultValues?.authorName ?? '',
    },
  })

  const titleValue    = watch('title')
  const slugValue     = watch('slug')
  const tagsValue     = watch('tags')
  const statusValue   = watch('status')
  const imageValue    = watch('imageS3Key')
  const bodyValue     = watch('body')

  // Registrar 'body' manualmente (TipTap no es un input nativo)
  useEffect(() => {
    register('body')
  }, [register])

  // Auto-generar slug desde el título (si no fue editado manualmente)
  useEffect(() => {
    if (!slugManuallyEdited.current && mode === 'create') {
      setValue('slug', generateSlug(titleValue), { shouldValidate: true })
    }
  }, [titleValue, mode, setValue])

  // Validar preview de imagen
  useEffect(() => {
    setImagePreviewOk(false)
    if (!imageValue) return
    const img = new Image()
    img.onload  = () => setImagePreviewOk(true)
    img.onerror = () => setImagePreviewOk(false)
    img.src = imageValue
  }, [imageValue])

  // Agregar tag al presionar Enter o coma
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
  }

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase().replace(/,/g, '')
    if (tag && !tagsValue.includes(tag)) {
      setValue('tags', [...tagsValue, tag])
    }
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    setValue('tags', tagsValue.filter((t) => t !== tag))
  }

  const handleFormSubmit = (values: FormValues) => {
    onSubmit({
      ...values,
      excerpt:    values.excerpt    ?? '',
      imageS3Key: values.imageS3Key ?? '',
      category:   values.category   ?? '',
      authorName: values.authorName ?? '',
    } as BlogPostFormData)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" noValidate>

      {/* Error del servidor */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
          {serverError}
        </div>
      )}

      {/* Título */}
      <div>
        <label className={labelClass}>Título *</label>
        <input
          {...register('title')}
          type="text"
          placeholder="Título del post"
          className={inputClass(!!errors.title)}
        />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      {/* Slug */}
      <div>
        <label className={labelClass}>Slug (URL) *</label>
        <input
          {...register('slug', {
            onChange: () => { slugManuallyEdited.current = true },
          })}
          type="text"
          placeholder="url-del-post"
          className={inputClass(!!errors.slug)}
        />
        {slugValue && (
          <p className="mt-1 text-xs text-soft-grey flex items-center gap-1">
            <Eye size={12} />
            URL: <span className="text-magenta-dark">fundacion.org/blog/<strong>{slugValue}</strong></span>
          </p>
        )}
        {errors.slug && <p className={errorClass}>{errors.slug.message}</p>}
      </div>

      {/* Excerpt */}
      <div>
        <label className={labelClass}>Resumen <span className={optionalClass}>(opcional)</span></label>
        <textarea
          {...register('excerpt')}
          rows={3}
          placeholder="Breve descripción del post (aparece en la lista y en Google)"
          className={inputClass(false)}
        />
      </div>

      {/* Contenido — editor visual WYSIWYG */}
      <div>
        <label className={labelClass}>Contenido *</label>
        <RichTextEditor
          value={bodyValue}
          onChange={(html) => setValue('body', html, { shouldValidate: true })}
        />
        {errors.body && <p className={errorClass}>{errors.body.message}</p>}
        <p className="mt-1 text-xs text-soft-grey">
          Usa la barra de herramientas para dar formato: negrita, títulos, listas, enlaces e imágenes.
        </p>
      </div>

      {/* Imagen */}
      <div>
        <label className={labelClass}>URL de imagen <span className={optionalClass}>(opcional)</span></label>
        <input
          {...register('imageS3Key')}
          type="url"
          placeholder="https://pub-xxx.r2.dev/imagen.jpg"
          className={inputClass(false)}
        />
        <p className="mt-1 text-xs text-soft-grey">
          Sube la imagen a Cloudflare R2 y pega aquí la URL pública.
        </p>
        {imageValue && imagePreviewOk && (
          <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 aspect-video max-w-sm">
            <img src={imageValue} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        {imageValue && !imagePreviewOk && (
          <p className="mt-1 text-xs text-amber-600">No se puede previsualizar la imagen.</p>
        )}
      </div>

      {/* Categoría y Autor — fila */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Categoría <span className={optionalClass}>(opcional)</span></label>
          <input
            {...register('category')}
            type="text"
            placeholder="Noticias, Proyectos, Eventos..."
            className={inputClass(false)}
            list="category-suggestions"
          />
          <datalist id="category-suggestions">
            <option value="Noticias" />
            <option value="Proyectos" />
            <option value="Eventos" />
            <option value="Historias de impacto" />
            <option value="Talleres" />
          </datalist>
        </div>
        <div>
          <label className={labelClass}>Autor <span className={optionalClass}>(opcional)</span></label>
          <input
            {...register('authorName')}
            type="text"
            placeholder="Fundación MSTC"
            className={inputClass(false)}
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className={labelClass}>Etiquetas <span className={optionalClass}>(opcional)</span></label>
        <div className={cn('flex flex-wrap gap-2 p-3 border rounded-lg bg-white min-h-[48px]',
          'border-gray-200 focus-within:border-magenta focus-within:ring-1 focus-within:ring-magenta/20')}>
          {tagsValue.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-magenta/10 text-magenta-dark text-xs px-2.5 py-1 rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-magenta-dark/60 hover:text-magenta-dark transition-colors"
                aria-label={`Eliminar etiqueta ${tag}`}
              >
                <X size={11} />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            onBlur={addTag}
            placeholder={tagsValue.length === 0 ? 'Escribe y presiona Enter...' : ''}
            className="flex-1 min-w-[120px] outline-none text-sm text-charcoal bg-transparent placeholder:text-gray-400"
          />
        </div>
        <p className="mt-1 text-xs text-soft-grey">Presiona Enter o coma para agregar cada etiqueta.</p>
      </div>

      {/* Estado */}
      <div>
        <label className={labelClass}>Estado *</label>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden w-fit">
          {(['DRAFT', 'PUBLISHED'] as BlogStatus[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValue('status', s)}
              className={cn(
                'px-5 py-2.5 text-sm font-sans font-medium transition-colors',
                statusValue === s
                  ? s === 'PUBLISHED'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-600 text-white'
                  : 'bg-white text-soft-grey hover:bg-gray-50',
              )}
            >
              {s === 'DRAFT' ? '📄 Borrador' : '✅ Publicado'}
            </button>
          ))}
        </div>
        {statusValue === 'PUBLISHED' && (
          <p className="mt-1.5 text-xs text-emerald-600">
            El post será visible en el blog inmediatamente al guardar.
          </p>
        )}
      </div>

      {/* Botón guardar */}
      <div className="pt-2 border-t border-gray-200 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-sans font-medium text-white transition-all',
            'bg-gradient-to-r from-magenta to-magenta-dark hover:shadow-lg hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed',
          )}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Guardando...
            </>
          ) : (
            mode === 'create' ? 'Crear post' : 'Guardar cambios'
          )}
        </button>
      </div>

    </form>
  )
}

// ── Clases utilitarias ────────────────────────────────────────────────────────

const labelClass = 'block text-sm font-medium text-charcoal mb-1.5'
const optionalClass = 'text-soft-grey font-normal'
const errorClass = 'mt-1 text-xs text-red-600'
const inputClass = (hasError: boolean) =>
  cn(
    'w-full px-3 py-2.5 rounded-lg border text-sm text-charcoal bg-white',
    'placeholder:text-gray-400 transition-colors outline-none',
    'focus:ring-1 focus:ring-magenta/20',
    hasError
      ? 'border-red-300 focus:border-red-400'
      : 'border-gray-200 focus:border-magenta',
  )
