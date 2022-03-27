import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import 'styles/index.css'
import SEO from '../../next-seo.config'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}
const theme = extendTheme({ colors })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
