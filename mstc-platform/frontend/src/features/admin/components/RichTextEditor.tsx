import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { useEffect, useRef } from 'react'
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, Link as LinkIcon, Image as ImageIcon, Undo, Redo, Minus,
} from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { uploadBlogImage } from '@/features/admin/api/adminBlogApi'

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

/**
 * Editor de texto enriquecido (WYSIWYG) basado en TipTap.
 * Genera HTML compatible con BlogPostContent para renderizar en el sitio.
 */
export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Image.configure({
        HTMLAttributes: { class: 'rounded-xl my-4 max-w-full' },
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose-editor focus:outline-none min-h-[300px] px-4 py-3',
      },
    },
  })

  // Sincronizar cuando cambian los defaultValues (modo edición)
  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value])

  if (!editor) return null

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:border-magenta focus-within:ring-1 focus-within:ring-magenta/20 transition-colors">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

// ── Barra de herramientas ─────────────────────────────────────────────────────

function Toolbar({ editor }: { editor: Editor }) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addLink = () => {
    const url = window.prompt('URL del enlace:')
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }

  // Subir imagen al servidor e insertarla en el contenido
  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const url = await uploadBlogImage(file)
      editor.chain().focus().setImage({ src: url }).run()
    } catch {
      window.alert('No se pudo subir la imagen. Verifica el formato (JPG, PNG, WEBP, GIF) y el tamaño (máx 10MB).')
    } finally {
      e.target.value = ''
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-200 bg-gray-50">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="Negrita"
      >
        <Bold size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="Cursiva"
      >
        <Italic size={16} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
        title="Título grande"
      >
        <Heading2 size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive('heading', { level: 3 })}
        title="Subtítulo"
      >
        <Heading3 size={16} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        title="Lista con viñetas"
      >
        <List size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        title="Lista numerada"
      >
        <ListOrdered size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
        title="Cita"
      >
        <Quote size={16} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Enlace">
        <LinkIcon size={16} />
      </ToolbarButton>

      <ToolbarButton onClick={() => fileInputRef.current?.click()} title="Insertar imagen">
        <ImageIcon size={16} />
      </ToolbarButton>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleImageFile}
        className="hidden"
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Separador"
      >
        <Minus size={16} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        title="Deshacer"
        disabled={!editor.can().undo()}
      >
        <Undo size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        title="Rehacer"
        disabled={!editor.can().redo()}
      >
        <Redo size={16} />
      </ToolbarButton>
    </div>
  )
}

function ToolbarButton({
  onClick, active, title, disabled, children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={cn(
        'p-2 rounded transition-colors',
        active
          ? 'bg-magenta text-white'
          : 'text-charcoal hover:bg-gray-200',
        disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent',
      )}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className="w-px h-6 bg-gray-300 mx-1" />
}
