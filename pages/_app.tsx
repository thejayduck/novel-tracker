// @ts-nocheck
import "styles/globals.scss";

import Head from "next/head";

import React from "react";
import { resetId } from "react-id-generator";

import { AlertWrapper } from "components/alertWrapper";

export default function MyApp({ Component, pageProps }) {
  resetId();

  return (
    <>
      <Head>
        <title>Novel Tracker</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet' />


        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />

        <meta name="description" content="Track Your Favorite Novels and Light Novels" />

        <link rel="manifest" href="/manifest.json" />

        <meta property="og:type" content="website" />
        <meta key='title' property="og:title" content="Novel Tracker" />
        <meta key='description' property="og:description" content="Track Your Favorite Novels and Light Novels" />
        <meta key='image' property="og:image" content="/book.png" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta key="ogType" property="og:type" content="website" />
        <meta key="ogUrl" property="og:url" content={"https://novel-tracker.vercel.app/"} />
        <meta key="ogTitle" property="og:title" content="Novel Tracker" />
        <meta key="ogDescription" property="og:description" content="Track Your Favorite Novels and Light Novels" />
        <meta key="ogImage" property="og:image" content="/icon.svg" />

        {/* <!-- Twitter --> */}
        <meta key="twCard" property="twitter:card" content="summary_large_image" />
        <meta key="twUrl" property="twitter:url" content={"https://novel-tracker.vercel.app/"} />
        <meta key="twTitle" property="twitter:title" content="Novel Tracker" />
        <meta key="twDescription" property="twitter:description" content="Track Your Favorite Novels and Light Novels" />
        <meta key="twImage" property="twitter:image" content="/icon.svg" />

      </Head>

      <AlertWrapper>
        <Component {...pageProps} />
      </AlertWrapper>
    </>
  );
}