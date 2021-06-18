import styles from '../styles/Login.module.css'
import PageBase from './pageBase';

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
                    <h1>Welcome to Light Novel Tracker! </h1>
                    <a href={url} className={`${styles.google} ${styles.btn}`}>
                        <i className="fab fa-google"> </i> Login with Google
                    </a>
                </div>
            </div>
        </PageBase >
    );
}