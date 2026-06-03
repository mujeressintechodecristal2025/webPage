import { Outlet } from 'react-router-dom'
import Navbar from '@/features/public/components/Navbar'
import Footer from '@/features/public/components/Footer'
import WhatsAppFloat from '@/features/public/components/WhatsAppFloat'

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
