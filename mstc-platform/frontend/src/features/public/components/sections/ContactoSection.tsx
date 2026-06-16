import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { cn } from '@/shared/utils/cn'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '573188307155'
const FUNDACION_EMAIL = 'mujeressintechodecristal2025@gmail.com'

const contactSchema = z.object({
  name:           z.string().min(2, 'Ingresa al menos 2 caracteres'),
  email:          z.string().email('Correo electrónico inválido'),
  subject:        z.string().min(3, 'El asunto es requerido'),
  message:        z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar la política de privacidad' }),
  }),
})

type ContactFormData = z.infer<typeof contactSchema>

const CONTACT_INFO = [
  {
    label: 'Correo electrónico',
    value: 'mujeressintechodecristal2025@gmail.com',
    href: 'mailto:mujeressintechodecristal2025@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: '318 830 7155 · 321 573 3425',
    href: 'https://wa.me/573188307155',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'Horario de atención',
    value: 'Lunes a Viernes · 8:00 am a 5:00 pm',
    href: null,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Ubicación',
    value: 'Campestre D los Olivos Mz 6 Cs 17 Piso 2, Dosquebradas, Risaralda',
    href: null,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

const SOCIAL = [
  {
    label: 'Facebook',
    href: 'https://web.facebook.com/profile.php?id=61572277466220',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
]

export default function ContactoSection() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const buildMessage = (data: ContactFormData) => {
    return `Hola, soy ${data.name}.\n\nAsunto: ${data.subject}\n\nMensaje:\n${data.message}\n\nMi correo: ${data.email}`
  }

  const sendByWhatsApp = async () => {
    const valid = await trigger()
    if (!valid) return
    const data = getValues()
    const text = buildMessage(data)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    setSubmitted(true)
  }

  const sendByEmail = async () => {
    const valid = await trigger()
    if (!valid) return
    const data = getValues()
    const subject = encodeURIComponent(data.subject)
    const body = encodeURIComponent(`Hola, soy ${data.name}.\n\n${data.message}\n\nMi correo de contacto: ${data.email}`)
    const url = `https://mail.google.com/mail/?view=cm&to=${FUNDACION_EMAIL}&su=${subject}&body=${body}`
    window.open(url, '_blank')
    setSubmitted(true)
  }

  // Prevent default form submit
  const onSubmit = () => {}

  const fieldClass = (hasError: boolean) =>
    cn(
      'w-full bg-white border px-4 py-3.5 text-[14px] text-charcoal font-light outline-none transition-all duration-200 rounded-sm',
      hasError
        ? 'border-red-400 focus:border-red-500 bg-red-50/30'
        : 'border-charcoal/10 focus:border-magenta focus:shadow-[0_0_0_3px_rgba(196,0,107,0.08)]',
    )

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-white" aria-labelledby="contacto-title">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <p className="section-label">Contáctanos</p>
          <h2
            id="contacto-title"
            className="font-serif font-light text-charcoal leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(36px, 4vw, 60px)' }}
          >
            Hablemos sobre{' '}
            <em className="italic text-magenta">el cambio</em>
          </h2>
          <p className="text-soft-grey font-light text-[15px] leading-relaxed">
            Estamos aquí para responder tus preguntas, recibir tu apoyo o explorar
            alianzas. Escríbenos y te respondemos en menos de 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">

          {/* ── Columna izquierda: info ── */}
          <div>

            {/* Datos de contacto */}
            <div className="space-y-6 mb-10">
              {CONTACT_INFO.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-magenta/8 text-magenta border border-magenta/15 rounded-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[2px] uppercase text-soft-grey mb-1 font-medium">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-serif text-[18px] text-charcoal font-light hover:text-magenta transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-serif text-[18px] text-charcoal font-light">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Redes sociales */}
            <div className="mb-10">
              <p className="text-[10px] tracking-[2px] uppercase text-soft-grey mb-4 font-medium">
                Síguenos
              </p>
              <div className="flex gap-3">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-magenta/25 flex items-center justify-center text-magenta hover:bg-magenta hover:text-white hover:border-magenta transition-all duration-200 rounded-sm"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nequi donación */}
            <div id="donar" className="mb-6 p-5 border-l-4 bg-cream" style={{ borderLeftColor: '#E6007A' }}>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full"
                  style={{ background: '#E6007A' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.94s4.18 1.36 4.18 3.85c0 1.89-1.44 2.98-3.12 3.19z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-[2px] uppercase text-soft-grey font-medium">
                    Dona por Nequi
                  </p>
                  <p className="font-serif text-[20px] text-charcoal font-semibold leading-none mt-1">
                    318 830 7155
                  </p>
                </div>
              </div>
              <p className="text-[12px] text-soft-grey font-light ml-[52px]">
                A nombre de la Fundación Mujeres sin Techo de Cristal
              </p>
            </div>
          </div>

          {/* ── Columna derecha: formulario ── */}
          <div className="bg-cream p-8 lg:p-10 rounded-sm">
            {submitted ? (
              /* Estado de éxito */
              <div className="flex flex-col items-center text-center py-12">
                <div
                  className="w-16 h-16 flex items-center justify-center mb-6 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #c026d3, #86198f)' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-[26px] text-charcoal font-light mb-3">
                  ¡Mensaje listo!
                </h3>
                <p className="text-soft-grey text-[14px] leading-relaxed max-w-xs mb-8">
                  Gracias por contactarnos. Te responderemos lo antes posible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[11px] tracking-[2px] uppercase text-magenta hover:text-magenta-dark border-b border-magenta/30 hover:border-magenta transition-all pb-0.5"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="font-serif text-[26px] font-light text-charcoal mb-1">
                    Envíanos un mensaje
                  </h3>
                  <p className="text-[13px] text-soft-grey">
                    Llena los campos y elige cómo enviarlo
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

                  {/* Nombre + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-[10px] tracking-[2px] uppercase text-soft-grey mb-2 font-medium">
                        Nombre <span className="text-magenta" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        {...register('name')}
                        className={fieldClass(!!errors.name)}
                        placeholder="Tu nombre completo"
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p role="alert" className="text-red-500 text-[11px] mt-1.5 flex items-center gap-1">
                          <span aria-hidden="true">↑</span> {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-[10px] tracking-[2px] uppercase text-soft-grey mb-2 font-medium">
                        Correo <span className="text-magenta" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        {...register('email')}
                        type="email"
                        className={fieldClass(!!errors.email)}
                        placeholder="tu@correo.com"
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p role="alert" className="text-red-500 text-[11px] mt-1.5 flex items-center gap-1">
                          <span aria-hidden="true">↑</span> {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Asunto */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-[10px] tracking-[2px] uppercase text-soft-grey mb-2 font-medium">
                      Asunto <span className="text-magenta" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      {...register('subject')}
                      className={fieldClass(!!errors.subject)}
                      placeholder="¿En qué podemos ayudarte?"
                    />
                    {errors.subject && (
                      <p role="alert" className="text-red-500 text-[11px] mt-1.5 flex items-center gap-1">
                        <span aria-hidden="true">↑</span> {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label htmlFor="contact-message" className="block text-[10px] tracking-[2px] uppercase text-soft-grey mb-2 font-medium">
                      Mensaje <span className="text-magenta" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      {...register('message')}
                      rows={4}
                      className={cn(fieldClass(!!errors.message), 'resize-none')}
                      placeholder="Cuéntanos cómo quieres apoyar la causa o qué información necesitas..."
                    />
                    {errors.message && (
                      <p role="alert" className="text-red-500 text-[11px] mt-1.5 flex items-center gap-1">
                        <span aria-hidden="true">↑</span> {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Consentimiento */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        {...register('privacyConsent')}
                        type="checkbox"
                        className="mt-0.5 w-4 h-4 accent-magenta flex-shrink-0 cursor-pointer"
                        aria-describedby={errors.privacyConsent ? 'privacy-error' : undefined}
                      />
                      <span className="text-[12px] text-soft-grey leading-relaxed group-hover:text-charcoal transition-colors">
                        Acepto la{' '}
                        <a
                          href="/politica-de-privacidad"
                          className="text-magenta-dark underline hover:text-magenta"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          política de privacidad
                        </a>{' '}
                        y el tratamiento de mis datos conforme a la Ley 1581 de 2012.
                      </span>
                    </label>
                    {errors.privacyConsent && (
                      <p id="privacy-error" role="alert" className="text-red-500 text-[11px] mt-1.5 ml-7">
                        {errors.privacyConsent.message}
                      </p>
                    )}
                  </div>

                  {/* Botones de envío */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={sendByWhatsApp}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-sm text-white font-semibold text-[12px] tracking-[1.5px] uppercase hover:opacity-90 active:scale-[0.98] transition-all duration-200"
                      style={{ background: '#25D366' }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Enviar por WhatsApp
                    </button>

                    <button
                      type="button"
                      onClick={sendByEmail}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-sm border border-charcoal/15 text-charcoal font-medium text-[12px] tracking-[1.5px] uppercase hover:border-magenta/40 hover:text-magenta active:scale-[0.98] transition-all duration-200"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Enviar por correo
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
