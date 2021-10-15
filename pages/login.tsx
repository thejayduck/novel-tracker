// @ts-nocheck
import styles from "styles/Login.module.scss";

import Head from "next/head";

import { useEffect, useState } from "react";

import PageBase from "components/pageBase";
import { Subtitle } from "components/subtitle";
import { NavigationButton } from "components/ui/button";

import { serverSide_checkIsLoggedIn } from "lib/serverHelpers";

import { FeatureItem } from "./featureItem";

export async function getServerSideProps(context) {
  const isLoggedIn = await serverSide_checkIsLoggedIn(context, true, false, false);

  return isLoggedIn ? {
    redirect: {
      permanent: false,
      destination: "/",
    },
  } : {
    props: {
      user_info: null,
    },
  };
}

export default function Login() {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const domain = `${window.location.protocol}//${window.location.host}`;
    setUrl(`https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&access_type=offline&response_type=code&client_id=524679525288-o6gbij04v72f2i5ub4f83974mfocrc05.apps.googleusercontent.com&redirect_uri=${domain}/api/auth&state=434595.10145617445`);
  });

  return (
    <>
      <Head>
        <title>Login · Novel Tracker</title>
      </Head>
      <PageBase>
        <section className={`${styles.welcomeMessage} ${styles.section} flex flexColumn`}>
          <img src="/icon.svg" width={496} height={496} />
          <h1>Welcome to <br /> <span>Novel Tracker</span></h1>
          <div className={`flex ${styles.redirect}`}>
            <NavigationButton text="Features" icon="bx bx-bulb" href="#features" />
            <NavigationButton text="Sign In / Sign Up" icon="bx bxl-google" href={url} />
            <NavigationButton text="Source Code" icon="bx bxl-github" href="https://github.com/thejayduck/novel-tracker" newTab={true} />
            <NavigationButton text="Trello" icon="bx bxl-trello" href="https://trello.com/b/dPv92vJW" newTab={true} />
          </div>
        </section>
        <section id="features" className={`${styles.featuresWrap}`}>
          <Subtitle text="Features" />
          <div className={`flex flexRow ${styles.features}`}>
            <FeatureItem
              title="Chapter-Volume Conversion"
              icon="bx bx-calculator bx-lg"
            >
              Keep track of your novels easier with automatic chapter-volume conversion.
            </FeatureItem>
            <FeatureItem
              title="Track your novels easier!"
              icon="bx bxs-book bx-lg"
            >
              We support volumes of each novel, providing you with easier tracking.
            </FeatureItem>
            <FeatureItem
              title="Account Syncing"
              icon="bx bx-sync bx-lg"
            >
              Bring your novel progress everywhere you go with seamless syncing between devices.
            </FeatureItem>
            <FeatureItem
              title="Mobile-App Capable"
              icon="bx bx-mobile-alt bx-lg"
            >
              Our website is mobile-app capable, offering you a smooth experience on the go.
            </FeatureItem>
            <FeatureItem
              title="Socialize"
              icon="bx bx-comment-detail bx-lg"
            >
              Follow your friends, start conversations in our forum.
            </FeatureItem>
            <FeatureItem
              title="Community Managed"
              icon="bx bx-group bx-lg"
            >
              Our library grows with every members contribution in the community.
            </FeatureItem>
            <FeatureItem
              title="Customize it to your liking"
              icon="bx bx-palette bx-lg"
            >
              Customize certain elements of the website to suit your needs.
            </FeatureItem>
            <FeatureItem
              title="Supports Multiple Languages"
              icon="bx bx-align-justify bx-lg"
            >
              This feature is WIP
            </FeatureItem>
          </div>
        </section>
      </PageBase >
    </>
  );
}

