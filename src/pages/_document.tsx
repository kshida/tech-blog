import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='ja'>
        <Head />
        <body className='bg-[#edf2f7]'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
