import HeroSection       from '@/features/public/components/sections/HeroSection'
import NosotrosSection   from '@/features/public/components/sections/NosotrosSection'
import ProyectosSection  from '@/features/public/components/sections/ProyectosSection'
import TestimoniosSection from '@/features/public/components/sections/TestimoniosSection'
import ImpactoSection    from '@/features/public/components/sections/ImpactoSection'
import ComoAyudarSection from '@/features/public/components/sections/ComoAyudarSection'
import ContactoSection   from '@/features/public/components/sections/ContactoSection'

export default function HomePage() {
  return (
    <>
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
