import styles from '../styles/Login.module.css'
import PageBase from './pageBase';
import { motion } from 'framer-motion';

import { parse } from 'cookie';
import { getUserInfoFromId, withUserId } from '../lib/db';
import { useEffect, useState } from 'react';

export async function getServerSideProps(context) {
    const cookie_header = context.req.headers.cookie;
    if (cookie_header) {
        const cookies = parse(context.req.headers.cookie);
        const token = cookies.token;
        const info = await withUserId(token, async (user_id) => await getUserInfoFromId(user_id));

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
        <PageBase>
            <div style={{ textAlign: "center" }}>
                <img className={styles.logo} src='../book.svg' />
                <div >
                    <h1>Welcome to Novel Tracker! </h1>
                    <motion.div
                        className={styles.about}

                        initial={{ height: "100px" }}
                        animate={{ height: "auto" }}
                        transition={{ type: "spring", delay: 0.5 }}
                    >
                        <h1> Novel Tracking Made Easy! </h1>
                        <div className={styles.features}>
                            <FeatureItem
                                title="Automatic Chapter-Volume Conversion"
                                description="Keep track of your novels easier with automatic chapter-volume conversion."
                                icon="fas fa-calculator"
                            />
                            <FeatureItem
                                title="Mobile App Capable"
                                description="You can add 'Novel Tracker' straight to your homepage."
                                icon="fas fa-mobile-alt"
                            />
                        </div>
                        <a href={url} className={`${styles.google} ${styles.btn}`}>
                            <i className="fab fa-google"> </i> Login with Google
                        </a>
                    </motion.div>

                </div>
            </div>
        </PageBase >
    );
}

function FeatureItem({ title, description, icon }) {
    return (
        <div>
            <h3><i className={`${icon}`} /> {title}</h3>
            <p> {description} </p>
        </div>
    );
}