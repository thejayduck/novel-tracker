import '../styles/globals.css'
import Head from 'next/head'
import { AppWrapper } from '../components/appWrapper'

export default function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Light Novel Tracker" />
        <meta property="og:description" content="Track your Light Novels Locally" />
        <meta property="og:image" content="/book.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="64" />
        <meta property="og:image:height" content="64" />
      </Head>

      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  )
}