import HeroSection       from '@/features/public/components/sections/HeroSection'
import NosotrosSection   from '@/features/public/components/sections/NosotrosSection'
import ProyectosSection  from '@/features/public/components/sections/ProyectosSection'
import TestimoniosSection from '@/features/public/components/sections/TestimoniosSection'
import ImpactoSection    from '@/features/public/components/sections/ImpactoSection'
import ComoAyudarSection from '@/features/public/components/sections/ComoAyudarSection'
import ContactoSection   from '@/features/public/components/sections/ContactoSection'
import SEO from '@/shared/components/SEO'

export default function HomePage() {
  return (
    <>
      <SEO
        title="Fundación Mujeres sin Techo de Cristal | Empoderamiento Femenino en Colombia"
        description="Fundación sin ánimo de lucro en Dosquebradas, Risaralda. Programas de modistería, capacitación psicosocial y emprendimiento para mujeres en situación de vulnerabilidad."
        path="/"
      />
      <HeroSection />
      <NosotrosSection />
      <ProyectosSection />
      <TestimoniosSection />
      <ImpactoSection />
      <ComoAyudarSection />
      <ContactoSection />
    </>
  )
}
