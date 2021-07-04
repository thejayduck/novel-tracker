import styles from '../styles/PageBase.module.css';

import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useAppContext } from "./appWrapper";

import BrowseBooks from './browseBooks';
import Information from './information';
import TopNav from './topNav';
import Footer from './footer';
import { useAlert } from './alertWrapper';
import QuickAlert from './quickAlert';

const valid_themes = ['light', 'dark'];

export default function PageBase({ children, onDataUpdate, userInfo, setSearchQuery }) {
    const [state] = useAppContext();

    const [browseBookPanel, setBrowseBookPanel] = useState(false);
    const [informationPanel, setInformationPanel] = useState(false);

    if (typeof userInfo == 'undefined') {
        throw {
            message: "PageBase requires user info (can be null)",
        };
    }

    const alert = useAlert();

    const [theme, setTheme] = useState(() => {
        if (typeof window == 'undefined') {
            return;
        }

        const themeValue = localStorage.getItem('theme');
        if (themeValue && themeValue != 'undefined') {
            if (valid_themes.includes(themeValue)) {
                return themeValue;
            }
        }

        return 'light';
    })

    useEffect(() => {
        localStorage.setItem('theme', theme);
        valid_themes.forEach(valid_theme => document.body.classList.remove(valid_theme));
        document.body.classList.add(theme);
    }, [theme]);

    return (
        <>
            <TopNav
                onBrowseBooks={() => setBrowseBookPanel(prev => !prev)}
                onSearch={e => setSearchQuery(e.target.value)}
                hasModButtons={!!userInfo && userInfo.moderation_level >= 2}
                hasAdminButtons={!!userInfo && userInfo.moderation_level >= 3}
                hasSearch={!!setSearchQuery}
                userInfo={!!userInfo}
            />
            <main className={`${styles.main} ${state.darkMode ? styles.dark : styles.light}`} >
                {children}

                <AnimatePresence>
                    {informationPanel && <Information onOutsideClicked={() => setInformationPanel(false)} />}

                    {browseBookPanel && (
                        <BrowseBooks
                            onAddClicked={() => {
                                if (onDataUpdate) {
                                    onDataUpdate();
                                }
                            }}
                            onOutsideClicked={() => setBrowseBookPanel(false)}
                            userInfo={userInfo}
                        />
                    )}
                </AnimatePresence>
            </main>
            {/* <QuickAlert key="test" message="Test" severity={`information`} /> */}

            {alert.alerts.map(alert => (
                <QuickAlert key={alert.id} message={alert.content} severity={alert.severity} />
            ))}
            <Footer userInfo={userInfo} setInfoPanel={setInformationPanel} setTheme={setTheme} />
        </>
    );
}