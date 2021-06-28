import styles from '../styles/PageBase.module.css';

import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAppContext } from "./appWrapper";

import NewBook from './newBook';
import Information from './information';
import TopNav from './topNav';
import Footer from './footer';

export default function PageBase({ children, onDataUpdate, userInfo, setSearchQuery }) {
    const [state] = useAppContext();

    const [addBookPanel, setAddBookPanel] = useState(false);
    const [informationPanel, setInformationPanel] = useState(false);

    return (
        <main className={`${styles.main} ${state.darkMode ? styles.dark : styles.light}`} >
            <TopNav
                onAddBook={() => setAddBookPanel(prev => !prev)}
                onSearch={e => setSearchQuery(e.target.value)}
                hasModButtons={!!userInfo && userInfo.moderation_level >= 2}
                hasAddBook={!!userInfo}
                hasSearch={!!setSearchQuery}
            />

            {children}

            {informationPanel && <Information />}
            <AnimatePresence>
                {addBookPanel && (
                    <NewBook
                        onAddClicked={() => onDataUpdate && onDataUpdate()}
                        onOutsideClicked={() => setAddBookPanel(false)}
                    />
                )}
            </AnimatePresence>
            <Footer userInfo={userInfo} />

        </main>
    );
}