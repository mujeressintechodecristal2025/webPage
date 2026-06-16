import { Outlet } from 'react-router-dom'
import Navbar from '@/features/public/components/Navbar'
import Footer from '@/features/public/components/Footer'
import WhatsAppFloat from '@/features/public/components/WhatsAppFloat'
import StickyDonateButton from '@/features/public/components/StickyDonateButton'

export default function PublicLayout() {
  return (
    <>
      {/* Skip to content — accesibilidad */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-magenta focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:rounded"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <StickyDonateButton />
    </>
  )
}
