import styles from 'styles/components/Navigation.module.scss';

import { UserSmall } from './userContainer';
import { DesktopOverlay, MobileMenu } from './overlayMenu';
import { NavigationButton } from "components/ui/button"
import { useUserInfoContext } from './pageBase';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import dynamic from 'next/dynamic'

const NotificationItem = dynamic(() => import("./notificationItem"))

export default function Navigation() {
    const [notification, setNotification] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const userInfo = useUserInfoContext();

    return (
        <nav className={`${styles.nav}`}>
            <div className={`${styles.container}`}>
                <div className={`desktop`}>
                    {userInfo && <UserSmall onDropDownClick={() => setUserMenu(prev => !prev)} />}
                </div>

                <a className={`${"mobile"}`} onClick={() => setMobileMenu(true)} title="Hamburger Menu" ><i className={`bx bx-menu bx-sm`} /></a>
                {/* <a className={`${"mobile"}`}>Homepage</a> */}
                <ul className={`${styles.links}`}>
                    <LinkItem type="desktop" icon="bx bx-library" title="Library" href="/" />
                    <LinkItem icon="bx bx-search" title="Search" href="/search" />
                    <LinkItem type="desktop" icon="bx bx-bell" title="Notifications" onClick={() => setNotification(prev => !prev)} />
                    <LinkItem type="desktop" icon="bx bx-chat" title="Forums" href="/" />
                    <LinkItem icon="bx bx-plus" title="Submit Book" href="/submit" />
                    <LinkItem type="desktop" icon="bx bx-cog" title="Settings" href="/" />
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
                        <NavigationButton href={`/profile/${userInfo.user_id}`} icon="bx bx-user bx-sm" text="Your Account" />
                        <NavigationButton icon="bx bx-log-out bx-sm" text="Log Out" />
                    </DesktopOverlay>
                }
            </AnimatePresence>

            <AnimatePresence>
                {notification &&
                    <DesktopOverlay title={`Notifications (1)`} className={styles.notificationOverlay} flexDirection="flexColumn" >
                        <NotificationItem />
                    </DesktopOverlay>
                }
            </AnimatePresence>
        </nav >
    );

}

function LinkItem({ type, icon, title, href, onClick }) {
    return (
        <li className={type}>
            <a title={title} href={href} onClick={onClick} >
                <i className={`${icon} bx-sm bx-tada-hover`} />
            </a>
        </li>
    )
}