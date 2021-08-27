import styles from '../styles/PageBase.module.scss';

// Components
import TopNav from './topNav';
import Footer from './footer';

export default function PageBase({ children }) {
    return (
        <>
            <TopNav />
            <main className={styles.container}>
                {children}
            </main>
            {/* <Footer /> */}
        </>
    );
}