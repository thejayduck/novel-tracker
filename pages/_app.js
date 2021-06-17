import '../styles/globals.css'
import Head from 'next/head'
import { AppWrapper } from '../components/appWrapper'
import { AuthWrapper } from '../components/authWrapper'

export default function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Light Novel Tracker</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="public/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Light Novel Tracker" />
        <meta property="og:description" content="Track your Light Novels Locally" />
        <meta property="og:image" content="/book.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="64" />
        <meta property="og:image:height" content="64" />
      </Head>

      <AppWrapper>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </AppWrapper>
    </>
  )
}