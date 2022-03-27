import Footer from 'components/footer'
import Header from 'components/header'
import Meta from 'components/meta'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Header />
      { children }
      <Footer />
    </>
  )
}

export default Layout
