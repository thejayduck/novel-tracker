import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>

                    <link rel="manifest" href="/manifest.json" />
                    <meta name="theme-color" content="#854dff" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                    <meta name="msapplication-starturl" content="/" />

                    {/* FAVICON */}
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />

                    {/* MICROSOFT */}
                    <meta name="msapplication-TileColor" content="#854dff" />
                    <meta name="msapplication-TileImage" content="/microsoft/ms-icon-144x144.png" />
                    <link rel="icon" type="image/png" sizes="192x192" href="/android/android-icon-192x192.png" />

                    {/* APPLE TOUCH */}
                    <link rel="apple-touch-startup-image" href="/icon.svg" />
                    <link rel="apple-touch-icon-precomposed" sizes="128x128" href="/apple/apple-icon-precomposed.png" />

                    <link rel="apple-touch-icon" sizes="57x57" href="/apple/apple-icon-57x57.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="/apple/apple-icon-60x60.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="/apple/apple-icon-72x72.png" />
                    <link rel="apple-touch-icon" sizes="76x76" href="/apple/apple-icon-76x76.png" />
                    <link rel="apple-touch-icon" sizes="114x114" href="/apple/apple-icon-114x114.png" />
                    <link rel="apple-touch-icon" sizes="120x120" href="/apple/apple-icon-120x120.png" />
                    <link rel="apple-touch-icon" sizes="144x144" href="/apple/apple-icon-144x144.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/apple/apple-icon-152x152.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple/apple-icon-180x180.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;