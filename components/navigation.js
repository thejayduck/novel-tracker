import { useState } from 'react';
import styles from '@styles/components/Navigation.module.scss';
import { UserSmall } from './userContainer';
import dynamic from 'next/dynamic'
import { DesktopOverlay, MobileMenu } from './overlayMenu';

import { NavigationButton } from "@components/ui/button"
import { AnimatePresence } from 'framer-motion';

const NotificationItem = dynamic(() => import("./notificationItem"))

export default function Navigation({ data }) {
    const [notification, setNotification] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <nav className={`${styles.nav}`}>
            <div className={`${styles.container}`}>
                <div className={`desktop`}>
                    <UserSmall onDropDownClick={() => setUserMenu(prev => !prev)} />
                </div>

                <a className={`${"mobile"}`} onClick={() => setMobileMenu(true)} title="Hamburger Menu" ><i className={`bx bx-menu bx-sm`} /></a>
                <a className={`${"mobile"}`}>Homepage</a>
                <ul className={`${styles.links}`}>
                    <li className={`${"desktop"}`}>
                        <a title="Homepage" href="/" >
                            <i className={`bx bx-home bx-sm bx-tada-hover`} />
                        </a>
                    </li>
                    <li>
                        <a title="Search" href="/search" >
                            <i className={`bx bx-search bx-sm bx-tada-hover`} />
                        </a>
                    </li>
                    <li className={`${"desktop"}`}>
                        <a onClick={() => setNotification(prev => !prev)} title="Notifications" >
                            <i className={`bx bx-bell bx-sm bx-tada-hover`} />
                        </a>
                    </li>
                    <li className={`${"desktop"}`}>
                        <a title="Forums" >
                            <i className={`bx bx-chat bx-sm bx-tada-hover`} />
                        </a>
                    </li>
                    <li>
                        <a title="Submit Book">
                            <i className={`bx bx-plus bx-sm bx-tada-hover`} />
                        </a>
                    </li>
                    <li className={`${"desktop"}`}>
                        <a title="Settings" >
                            <i className={`bx bx-cog bx-sm bx-spin-hover`} />
                        </a>
                    </li>
                </ul>
            </div>

            <AnimatePresence>
                {mobileMenu &&
                    <MobileMenu onOutSideClick={() => setMobileMenu(false)} />
                }
            </AnimatePresence>

            <AnimatePresence>
                {userMenu &&
                    <DesktopOverlay title={`Account`} className={styles.userMenuOverlay} flexDirection="flexColumn" >
                        <NavigationButton href="/profile" icon="bx bx-user bx-sm" text="Your Account" />
                        <NavigationButton icon="bx bx-log-out bx-sm" text="Log Out" />
                    </DesktopOverlay>
                }
            </AnimatePresence>

            <AnimatePresence>
                {notification &&
                    <DesktopOverlay title={`Notification (1)`} className={styles.notificationOverlay} flexDirection="flexColumn" >
                        <NotificationItem />
                        <NotificationItem />
                        <NotificationItem />
                        <NotificationItem />
                        <NotificationItem />
                        <NotificationItem />
                        <NotificationItem />
                    </DesktopOverlay>
                }
            </AnimatePresence>


        </nav >
    );

}