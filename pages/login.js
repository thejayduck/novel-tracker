import styles from '../styles/Login.module.css'
import PageBase from '../components/pageBase';
import { motion } from 'framer-motion';

import { parse } from 'cookie';
import { getUserInfo, withUserId } from '../lib/db';
import { useEffect, useState } from 'react';

export async function getServerSideProps(context) {
    const cookie_header = context.req.headers.cookie;
    if (cookie_header) {
        const cookies = parse(context.req.headers.cookie);
        const token = cookies.token;
        const info = await withUserId(token, async (user_id) => await getUserInfo(user_id));

        if (info) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/',
                },
            }
        }
    }

    return {
        props: {},
    };
}

export default function Login() {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const domain = `${window.location.protocol}//${window.location.host}`;
        setUrl(`https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&access_type=offline&response_type=code&client_id=524679525288-o6gbij04v72f2i5ub4f83974mfocrc05.apps.googleusercontent.com&redirect_uri=${domain}/api/auth&state=434595.10145617445`);
    })
    return url && (
        <PageBase userInfo={null}>
            <div className={styles.container}>
                <img width="150" height="150" className={styles.logo} src='../book.svg' />
                <div>
                    <h1>Welcome to Novel Tracker!</h1>
                    <div className={styles.about}>
                        <h1> Novel Tracking Made Easy! </h1>
                        <motion.div
                            className={styles.features}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "max-content", opacity: 1 }}
                            transition={{ type: "spring", delay: 1 }}
                        >
                            <FeatureItem
                                title="Automatic Chapter-Volume Conversion"
                                icon="fas fa-fw fa-calculator"
                            >
                                Keep track of your novels easier with automatic chapter-volume conversion.
                            </FeatureItem>
                            <FeatureItem
                                title="Mobile-App Capable"
                                icon="fas fa-fw fa-mobile-alt"
                            >
                                Our website is mobile-app capable, offering you a smooth experience.
                            </FeatureItem>
                            <FeatureItem
                                title="Account Syncing"
                                icon="fas fa-fw fa-sync-alt"
                            >
                                Bring your novel progress everywhere you go.
                            </FeatureItem>
                            <FeatureItem
                                title="Socialize"
                                icon="fas fa-fw fa-comments"
                            >
                                Follow your friends progress.
                            </FeatureItem>
                            <FeatureItem
                                title="Community Managed"
                                icon="fas fa-fw fa-user-friends"
                            >
                                Our library grows with every members contribution in the community.
                            </FeatureItem>
                        </motion.div>
                        <a href={url} className={`${styles.google} ${styles.btn}`}>
                            <i className="fab fa-fw fa-google"> </i> Login with Google
                        </a>
                    </div>
                </div>
            </div>
        </PageBase >
    );
}

function FeatureItem({ title, children, icon }) {
    return (
        <div>
            <h3><i className={`${icon}`} /> {title}</h3>
            <p> {children} </p>
        </div>
    );
}