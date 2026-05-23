import HeroSection     from '@/features/public/components/sections/HeroSection'
import NosotrosSection  from '@/features/public/components/sections/NosotrosSection'
import ProyectosSection from '@/features/public/components/sections/ProyectosSection'
import ImpactoSection   from '@/features/public/components/sections/ImpactoSection'
import ContactoSection  from '@/features/public/components/sections/ContactoSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NosotrosSection />
      <ProyectosSection />
      <ImpactoSection />
      <ContactoSection />
    </>
  )
}
