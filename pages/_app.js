import '../styles/globals.css'
import Head from 'next/head'
import { AppWrapper } from '../components/appWrapper'
import { AuthWrapper } from '../components/authWrapper'

export default function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Novel Tracker</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />

        <meta name="description" content="Track your Novels" />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta key='title' property="og:title" content="Novel Tracker" />
        <meta key='description' property="og:description" content="Track your Novels" />
        <meta key='image' property="og:image" content="/book.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="64" />
        <meta property="og:image:height" content="64" />
        <meta name="og:site_name" content="Novel Tracker" />
        <meta key='card' name="twitter:card" content="summary" />

      </Head>

      <AppWrapper>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </AppWrapper>
    </>
  )
}