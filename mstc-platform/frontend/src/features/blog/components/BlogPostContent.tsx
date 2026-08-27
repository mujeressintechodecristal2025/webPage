import { cn } from '@/shared/utils/cn'

interface BlogPostContentProps {
  html: string
  className?: string
}

/**
 * Renderiza el contenido HTML de un post del blog.
 * El HTML proviene del administrador (contenido confiable, no user-generated).
 * Estilos aplicados para tipografía legible con la paleta del sitio.
 */
export default function BlogPostContent({ html, className }: BlogPostContentProps) {
  return (
    <div
      className={cn(
        'max-w-3xl mx-auto',
        // Tipografía base
        'font-sans text-charcoal leading-relaxed',
        // Headings con tipografía serif del sitio
        '[&_h1]:font-serif [&_h1]:text-4xl [&_h1]:text-charcoal [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:leading-tight',
        '[&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-charcoal [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:leading-tight',
        '[&_h3]:font-serif [&_h3]:text-2xl [&_h3]:text-charcoal [&_h3]:mt-6 [&_h3]:mb-3',
        '[&_h4]:font-sans [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-charcoal [&_h4]:mt-5 [&_h4]:mb-2',
        // Párrafos
        '[&_p]:mb-4 [&_p]:text-soft-grey [&_p]:leading-7',
        // Links
        '[&_a]:text-magenta [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-magenta-dark',
        // Listas
        '[&_ul]:mb-4 [&_ul]:pl-6 [&_ul]:list-disc [&_ul_li]:mb-1.5 [&_ul_li]:text-soft-grey',
        '[&_ol]:mb-4 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol_li]:mb-1.5 [&_ol_li]:text-soft-grey',
        // Blockquote
        '[&_blockquote]:border-l-4 [&_blockquote]:border-magenta/40 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-soft-grey [&_blockquote]:my-6',
        // Imágenes
        '[&_img]:rounded-xl [&_img]:w-full [&_img]:my-6 [&_img]:shadow-sm',
        // Code
        '[&_code]:bg-gray-100 [&_code]:text-magenta-dark [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono',
        '[&_pre]:bg-charcoal [&_pre]:text-gray-100 [&_pre]:p-5 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre_code]:bg-transparent [&_pre_code]:text-gray-100 [&_pre_code]:p-0',
        // Separador
        '[&_hr]:border-gray-200 [&_hr]:my-8',
        // Strong / em
        '[&_strong]:font-semibold [&_strong]:text-charcoal',
        '[&_em]:italic',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
