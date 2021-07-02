import styles from '../styles/PageBase.module.css';

import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useAppContext } from "./appWrapper";

import NewBook from './newBook';
import Information from './information';
import TopNav from './topNav';
import Footer from './footer';
import { useAlert } from './alertWrapper';
import QuickAlert from './quickAlert';

export default function PageBase({ children, onDataUpdate, userInfo, setSearchQuery }) {
    const [state] = useAppContext();

    const [addBookPanel, setAddBookPanel] = useState(false);
    const [informationPanel, setInformationPanel] = useState(false);

    if (typeof userInfo == 'undefined') {
        throw {
            message: "PageBase requires user info (can be null)",
        };
    }

    const alert = useAlert();

    return (
        <>
            <TopNav
                onAddBook={() => setAddBookPanel(prev => !prev)}
                onSearch={e => setSearchQuery(e.target.value)}
                hasModButtons={!!userInfo && userInfo.moderation_level >= 2}
                hasAdminButtons={!!userInfo && userInfo.moderation_level >= 3}
                hasSearch={!!setSearchQuery}
            />
            <main className={`${styles.main} ${state.darkMode ? styles.dark : styles.light}`} >
                {children}

                <AnimatePresence>
                    {informationPanel && <Information onOutsideClicked={() => setInformationPanel(false)} />}

                    {addBookPanel && (
                        <NewBook
                            onAddClicked={() => {
                                if (onDataUpdate) {
                                    onDataUpdate();
                                }
                                alert.information("Added book!");
                            }}
                            onOutsideClicked={() => setAddBookPanel(false)}
                            userInfo={userInfo}
                        />
                    )}
                </AnimatePresence>
            </main>
            {/* <QuickAlert key="test" message="Test" severity={`information`} /> */}

            {alert.alerts.map(alert => (
                <QuickAlert key={alert.id} message={alert.content} severity={alert.severity} />
            ))}
            <Footer userInfo={userInfo} setInfoPanel={setInformationPanel} />
        </>
    );
}