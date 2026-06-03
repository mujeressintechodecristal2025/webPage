export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream pt-[72px]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-[9px] tracking-[3px] uppercase text-magenta mb-4">Legal</p>
        <h1 className="font-serif text-5xl font-light text-charcoal mb-4">
          Política de Privacidad
        </h1>
        <p className="text-soft-grey text-sm mb-12">
          Última actualización: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none space-y-8 text-soft-grey font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-charcoal font-light mb-3">1. Responsable del Tratamiento</h2>
            <p>
              La <strong className="text-charcoal font-normal">Fundación Mujeres sin Techo de Cristal (MSTC)</strong>, identificada con NIT [NIT de la fundación], con domicilio en Colombia, es la responsable del tratamiento de los datos personales recolectados a través de este sitio web.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal font-light mb-3">2. Datos que Recolectamos</h2>
            <p>Recolectamos los siguientes datos personales:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono (cuando se proporciona)</li>
              <li>Número de identificación (para donantes y certificados)</li>
              <li>Información de navegación (cookies técnicas)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal font-light mb-3">3. Finalidad del Tratamiento</h2>
            <p>Sus datos son utilizados para:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Responder solicitudes de contacto e información</li>
              <li>Procesar donaciones y generar certificados tributarios</li>
              <li>Enviar comunicaciones sobre la fundación (con su consentimiento)</li>
              <li>Cumplir obligaciones legales y fiscales colombianas</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal font-light mb-3">4. Base Legal</h2>
            <p>
              El tratamiento de sus datos se realiza conforme a la <strong className="text-charcoal font-normal">Ley 1581 de 2012</strong> (Habeas Data) y el Decreto 1377 de 2013, con base en su consentimiento explícito y/o el cumplimiento de obligaciones legales.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal font-light mb-3">5. Conservación de Datos</h2>
            <p>
              Los datos de donaciones se conservan por un mínimo de <strong className="text-charcoal font-normal">5 años</strong> para cumplir con las obligaciones fiscales colombianas, incluso si solicita la eliminación de sus datos personales.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal font-light mb-3">6. Sus Derechos</h2>
            <p>Como titular de datos personales, usted tiene derecho a:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Conocer, actualizar y rectificar sus datos</li>
              <li>Solicitar la supresión de sus datos (sujeto a obligaciones legales)</li>
              <li>Revocar el consentimiento otorgado</li>
              <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC)</li>
            </ul>
            <p className="mt-3">
              Para ejercer estos derechos, escríbanos a:{' '}
              <a href="mailto:mujeressintechodecristal2025@gmail.com" className="text-magenta hover:underline">
                mujeressintechodecristal2025@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal font-light mb-3">7. Seguridad</h2>
            <p>
              Implementamos medidas técnicas y organizativas de seguridad de grado empresarial para proteger sus datos, incluyendo cifrado en tránsito (TLS 1.2+) y en reposo (AES-256).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-charcoal font-light mb-3">8. Contacto</h2>
            <p>
              Para cualquier consulta sobre esta política, contáctenos en:{' '}
              <a href="mailto:mujeressintechodecristal2025@gmail.com" className="text-magenta hover:underline">
                mujeressintechodecristal2025@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
