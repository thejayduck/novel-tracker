import styles from '../styles/PageBase.module.scss';

// Components
import TopNav from './topNav';

export default function PageBase({ children }) {
    return (
        <>
            <TopNav />
            <main className={styles.container}>
                {children}
            </main>
        </>
    );
}