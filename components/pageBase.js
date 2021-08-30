import styles from '@styles/PageBase.module.scss';

// Components
import Navigation from './navigation';
import Footer from './footer';
import { MobileMenu } from './overlayMenu';
import { useState } from 'react';

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