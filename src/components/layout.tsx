import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Meta } from '@/components/Meta'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Header />
      {children}
      <Footer />
    </>
  )
}
