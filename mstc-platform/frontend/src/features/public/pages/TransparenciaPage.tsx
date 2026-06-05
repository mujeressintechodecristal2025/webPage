import { Link } from 'react-router-dom'

export default function TransparenciaPage() {
  return (
    <div className="pt-[72px] min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-24">

        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-magenta hover:text-magenta-dark transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>

          <h1 className="font-serif text-charcoal font-light leading-[1.1] mb-4" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
            Transparencia y{' '}
            <em className="italic text-magenta">Rendición de Cuentas</em>
          </h1>

          <p className="text-soft-grey font-light text-[15px] leading-relaxed max-w-2xl">
            En cumplimiento del Artículo 364-5 del Estatuto Tributario y como entidad
            perteneciente al Régimen Tributario Especial (RTE), la Fundación Mujeres
            sin Techo de Cristal pone a disposición del público los siguientes documentos
            para consulta ciudadana.
          </p>
        </div>

        {/* Información institucional */}
        <div className="bg-white p-8 lg:p-10 mb-8 border border-charcoal/5">
          <h2 className="font-serif text-2xl text-charcoal font-light mb-6">Información General</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
            <div>
              <p className="text-soft-grey text-[11px] uppercase tracking-[2px] mb-1">Razón social</p>
              <p className="text-charcoal font-medium">Fundación Mujeres sin Techo de Cristal</p>
            </div>
            <div>
              <p className="text-soft-grey text-[11px] uppercase tracking-[2px] mb-1">NIT</p>
              <p className="text-charcoal font-medium">901.907.058-9</p>
            </div>
            <div>
              <p className="text-soft-grey text-[11px] uppercase tracking-[2px] mb-1">Representante legal</p>
              <p className="text-charcoal font-medium">Mónica Jhoana Ospina</p>
            </div>
            <div>
              <p className="text-soft-grey text-[11px] uppercase tracking-[2px] mb-1">Domicilio</p>
              <p className="text-charcoal font-medium">Dosquebradas, Risaralda</p>
            </div>
            <div>
              <p className="text-soft-grey text-[11px] uppercase tracking-[2px] mb-1">Dirección</p>
              <p className="text-charcoal font-medium">Campestre D los Olivos Mz 6 Cs 17 Piso 2</p>
            </div>
            <div>
              <p className="text-soft-grey text-[11px] uppercase tracking-[2px] mb-1">Correo electrónico</p>
              <p className="text-charcoal font-medium">mujeressintechodecristal2025@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Documentos requeridos por la DIAN */}
        <div className="bg-white p-8 lg:p-10 mb-8 border border-charcoal/5">
          <h2 className="font-serif text-2xl text-charcoal font-light mb-2">
            Documentos RTE — DIAN
          </h2>
          <p className="text-soft-grey text-[13px] mb-8">
            Documentos requeridos según el Artículo 364-5 del Estatuto Tributario para
            entidades del Régimen Tributario Especial.
          </p>

          <div className="space-y-4">
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.title}
                className="flex items-center gap-4 p-4 border border-charcoal/8 hover:border-magenta/20 hover:bg-magenta/3 transition-all duration-200 group"
              >
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-magenta/8 text-magenta border border-magenta/15 rounded-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[14px] text-charcoal font-medium group-hover:text-magenta transition-colors">
                    {doc.title}
                  </p>
                  <p className="text-[12px] text-soft-grey">{doc.description}</p>
                </div>
                <div className="flex-shrink-0">
                  {doc.available ? (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] tracking-[1.5px] uppercase px-3 py-1.5 bg-magenta text-white hover:bg-magenta-dark transition-colors"
                    >
                      Descargar
                    </a>
                  ) : (
                    <span className="text-[10px] tracking-[1.5px] uppercase px-3 py-1.5 border border-charcoal/15 text-soft-grey">
                      Próximamente
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nota legal */}
        <div className="bg-charcoal/5 p-6 border-l-4 border-magenta">
          <p className="text-[13px] text-soft-grey leading-relaxed">
            <strong className="text-charcoal">Nota:</strong> Estos documentos se actualizan
            anualmente conforme a los plazos establecidos por la DIAN. Si requiere información
            adicional, puede escribirnos a{' '}
            <a href="mailto:mujeressintechodecristal2025@gmail.com" className="text-magenta hover:underline">
              mujeressintechodecristal2025@gmail.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}

const DOCUMENTS = [
  {
    title: 'Acta de constitución',
    description: 'Documento fundacional de la entidad',
    available: false,
    url: '#',
  },
  {
    title: 'Estatutos vigentes',
    description: 'Reglamento interno de la fundación',
    available: false,
    url: '#',
  },
  {
    title: 'Certificado de existencia y representación legal',
    description: 'Cámara de Comercio de Dosquebradas',
    available: false,
    url: '#',
  },
  {
    title: 'Estados financieros',
    description: 'Balance general y estado de resultados del último año fiscal',
    available: false,
    url: '#',
  },
  {
    title: 'Certificado de antecedentes disciplinarios',
    description: 'Directivos y representante legal',
    available: false,
    url: '#',
  },
  {
    title: 'Memoria económica anual',
    description: 'Informe de gestión y uso de recursos',
    available: false,
    url: '#',
  },
  {
    title: 'Registro Tributario Especial (RTE)',
    description: 'Resolución de calificación DIAN',
    available: false,
    url: '#',
  },
  {
    title: 'Informe de gestión anual',
    description: 'Actividades, logros y plan de acción',
    available: false,
    url: '#',
  },
]
