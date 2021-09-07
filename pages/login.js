import styles from 'styles/Login.module.scss'

import PageBase from 'components/pageBase';
import { Subtitle } from 'components/header';
import Head from 'next/head'
import { useState, useEffect } from 'react';
import { serverSide_checkIsLoggedIn } from 'lib/serverHelpers';

export async function getServerSideProps(context) {
    const isLoggedIn = await serverSide_checkIsLoggedIn(context, true, false, false);

    return isLoggedIn ? {
        redirect: {
            permanent: false,
            destination: '/',
        },
    } : {
        props: {
            user_info: null,
        },
    }
}

export default function Login() {
    return (
        <>
            <Head>
                <title>Login · Novel Tracker</title>
            </Head>
            <PageBase>
                <div className={styles.container}>
                    <img width="150" height="150" className={`${styles.logo}`} src='../icon.svg' />
                    <div>
                        <h1 className={styles.title} >Welcome to <span>Novel Tracker!</span></h1>
                        <div className={styles.about}>
                            <Subtitle text="Features" />
                            <div className={`flex  ${styles.features}`}>
                                <FeatureItem
                                    title="Automatic Chapter-Volume Conversion"
                                    icon="bx bx-calculator"
                                >
                                    Keep track of your novels easier with automatic chapter-volume conversion.
                                </FeatureItem>
                                <FeatureItem
                                    title="Mobile-App Capable"
                                    icon="bx bx-mobile-alt"
                                >
                                    Our website is mobile-app capable, offering you a smooth experience on the go.
                                </FeatureItem>
                                <FeatureItem
                                    title="Account Syncing"
                                    icon="bx bx-sync"
                                >
                                    Bring your novel progress everywhere you go.
                                </FeatureItem>
                                <FeatureItem
                                    title="Socialize"
                                    icon="bx bx-comment-detail"
                                >
                                    Follow your friends progress, start conversations in our forums.
                                </FeatureItem>
                                <FeatureItem
                                    title="Community Managed"
                                    icon="bx bx-group"
                                >
                                    Our library grows with every members contribution in the community.
                                </FeatureItem>
                            </div>
                            <br />
                            <LoginWithGoogle />
                        </div>
                    </div>
                </div>
            </PageBase >
        </>
    );
}

function LoginWithGoogle() {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const domain = `${window.location.protocol}//${window.location.host}`;
        setUrl(`https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&access_type=offline&response_type=code&client_id=524679525288-o6gbij04v72f2i5ub4f83974mfocrc05.apps.googleusercontent.com&redirect_uri=${domain}/api/auth&state=434595.10145617445`);
    })
    return url && (<a className={`${styles.googleBtn}`} href={url}>
        <i className="bx bxl-google bx-sm"> </i> Login with Google
    </a>)
}

function FeatureItem({ title, children, icon }) {
    return (
        <div className={`${styles.featureItem} flex flexColumn flexBetween`}>
            <h3><i className={`${icon}`} /> {title}</h3>
            <p> {children} </p>
        </div>
    );
}