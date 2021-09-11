// @ts-nocheck
import styles from 'styles/Login.module.scss';

import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';

import React, { useEffect,useState } from 'react';

import { Subtitle } from 'components/header';
import PageBase from 'components/pageBase';
import { NavigationButton } from "components/ui/button";

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
                <section className={`${styles.welcomeMessage} ${styles.section} flex flexColumn`}>
                    <img src="/icon.svg" width={496} height={496} />
                    <h1>Welcome to <br /> <span>Novel Tracker</span></h1>
                    <div className={`flex ${styles.redirect}`}>
                        <NavigationButton text="Features" icon="bx bx-bulb" href="#features" />
                        <NavigationButton text="Sign In / Sign Up" icon="bx bxl-google" />
                        <NavigationButton text="Source Code" icon="bx bxl-github" href="https://github.com/thejayduck/novel-tracker" newTab={true} />
                        <NavigationButton text="Trello" icon="bx bxl-trello" href="https://trello.com/b/dPv92vJW" newTab={true} />
                        <LoginWithGoogle />
                    </div>
                </section>
                <section id="features" className={`${styles.featuresWrap}`}>
                    <Subtitle text="Features" />
                    <div className={`flex flexColumn ${styles.features}`}>
                        <FeatureItem
                            title="Chapter-Volume Conversion"
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
                            Follow your friends, start conversations in our forum.
                        </FeatureItem>
                        <FeatureItem
                            title="Community Managed"
                            icon="bx bx-group"
                        >
                            Our library grows with every members contribution in the community.
                        </FeatureItem>
                    </div>
                </section>
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
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div onClick={() => setIsOpen(prev => !prev)} className={`${styles.featureItem} flex flexColumn`}>
            <div className={`flex flexBetween`}>
                <h2>
                    <i className={`${icon}`} /> {title}
                </h2>
                <motion.div
                    className={styles.showDetails}

                    initial={{ rotate: 0 }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                >
                    <i className='bx bxs-down-arrow' />
                </motion.div>
            </div>
            <AnimatePresence>
                {isOpen &&
                    <motion.div
                        className={styles.details}

                        layout
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "max-content", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.4 }}
                    >
                        <p> {children} </p>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
}