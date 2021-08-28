import styles from '../styles/PageBase.module.scss';

// Components
import Navigation from './navigation';
import Footer from './footer';

export default function PageBase({ children }) {
    return (
        <>
            <Navigation />
            <main className={styles.container}>
                {children}
            </main>
            <Footer />
        </>
    );
}