import { parse } from 'cookie';
import { useAppContext } from '../components/appWrapper';
import LoginGoogle from '../components/loginGoogle';
import { getUserInfoFromToken } from '../lib/db';
import styles from '../styles/Login.module.css'

export async function getServerSideProps(context) {
    const cookie_header = context.req.headers.cookie;
    if (cookie_header) {
        const cookies = parse(context.req.headers.cookie);
        const token = cookies.token;
        const info = await getUserInfoFromToken(token);

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
    const [state] = useAppContext();

    return (
        <main className={`${styles.main} ${state.darkMode ? styles.dark : styles.light}`} >
            <div>
                <a
                    href="#"
                    className={`${styles.google} ${styles.btn}`}
                >
                    <i className="fab fa-google"> </i> Login with Google
                </a>
                <LoginGoogle />
            </div>
        </main >
    );
}