import styles from '../styles/Login.module.css'
import PageBase from '../components/pageBase';
import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import { useUser } from '../lib/clientHelpers';
import { useRouter } from 'next/router';

export default function Login() {
    const [url, setUrl] = useState(null);
    const router = useRouter();

    const userInfo = useUser({
        logged_in: false,
        be_mod: false,
        be_admin: false,
    });

    useEffect(() => {
        if (userInfo != undefined) {
            if (userInfo != null) {
                router.push("/");
            }
        }
    }, [userInfo]);

    useEffect(() => {
        console.log(window.location.href);
        const domain = `${window.location.protocol}//${window.location.host}`;
        setUrl(`https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&access_type=offline&response_type=code&client_id=524679525288-o6gbij04v72f2i5ub4f83974mfocrc05.apps.googleusercontent.com&redirect_uri=${domain}/api/auth&state=434595.10145617445`);
    }, []);

    return (
        <PageBase>
            <div className={styles.wrapper}>
                <img className={styles.logo} src='../book.svg' />
                <div >
                    <h1>Welcome to Novel Tracker! </h1>
                    <div className={styles.about}>
                        <h1> Novel Tracking Made Easy! </h1>
                        <motion.div
                            className={styles.features}
                            initial={{ height: "0", opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            transition={{ type: "spring", delay: 0.5 }}
                        >
                            <FeatureItem
                                title="Automatic Chapter-Volume Conversion"
                                icon="fas fa-calculator"
                            >
                                Keep track of your novels easier with automatic chapter-volume conversion.
                            </FeatureItem>
                            <FeatureItem
                                title="Mobile-App Capable"
                                icon="fas fa-mobile-alt"
                            >
                                Our website is mobile-app capable, offering you a smooth and elegant experience.
                            </FeatureItem>
                            <FeatureItem
                                title="Account Syncing"
                                icon="fas fa-sync-alt"
                            >
                                Bring your novel progress everywhere you go.
                            </FeatureItem>
                            <FeatureItem
                                title="Socialize"
                                icon="fas fa-user"
                            >
                                Follow your friends progress.
                            </FeatureItem>
                            <FeatureItem
                                title="Community Managed"
                                icon="fas fa-user-friends"
                            >
                                Our library grows with every moderators contribution in the community.
                            </FeatureItem>
                        </motion.div>
                        <a href={url} className={`${styles.google} ${styles.btn}`}>
                            <i className="fab fa-google"> </i> Login with Google
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