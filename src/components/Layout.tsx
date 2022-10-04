import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Meta } from '@/components/Meta'

interface Props {
  preview?: boolean
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Meta />
      <Header />
      <div className='min-h-[calc(100vh-64px-48px)]'>{children}</div>
      <Footer />
    </>
  )
}
