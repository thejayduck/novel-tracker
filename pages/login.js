import { useAppContext } from '../components/appWrapper';
import styles from '../styles/Login.module.css'

export default function Login() {
    const [state] = useAppContext();

    return (
        <main className={`${styles.main} ${state.darkMode ? styles.dark : styles.light}`} >
            <div>
                <a
                    href="#"
                    className={`${styles.google} ${styles.btn}`}
                >
                    <i class="fab fa-google"> </i> Login with Google
                </a>
            </div>
        </main >
    );
}