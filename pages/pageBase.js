import styles from '../styles/PageBase.module.css'
import { useAppContext } from "../components/appWrapper";

export default function PageBase({ children }) {
    const [state] = useAppContext();

    return (
        <main className={`${styles.main} ${state.darkMode ? styles.dark : styles.light}`} >
            {children}
        </main>
    );
}