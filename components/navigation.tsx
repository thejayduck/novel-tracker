// @ts-nocheck
import styles from "styles/components/Navigation.module.scss";

import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

import { useState } from "react";

import { NavigationButton } from "components/ui/button";

import { DesktopOverlay, MobileMenu } from "./overlayMenu";
import { useUserInfoContext } from "./pageBase";
import { UserSmall } from "./userContainer";

const NotificationItem = dynamic(() => import("./notificationItem"));

export default function Navigation() {
    const [notification, setNotification] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const userInfo = useUserInfoContext();

    return (
        <nav className={`${styles.nav}`}>
            <div className={`${styles.container}`}>
                <div className={"desktop"}>
                    {userInfo && <UserSmall onDropDownClick={() => setUserMenu(prev => !prev)} />}
                </div>

                <a className={`${"mobile"}`} onClick={() => setMobileMenu(true)} title="Hamburger Menu" ><i className={"bx bx-menu bx-sm"} /></a>
                {/* <a className={`${"mobile"}`}>Homepage</a> */}
                <ul className={`${styles.links}`}>
                    <LinkItem type="desktop" icon="bx bx-library bx-tada-hover" title="Library" href="/" />
                    <LinkItem icon="bx bx-search bx-tada-hover" title="Search" href="/search" />
                    <LinkItem type="desktop" icon="bx bx-bell bx-tada-hover" title="Notifications" onClick={() => setNotification(prev => !prev)} />
                    <LinkItem type="desktop" icon="bx bx-chat bx-tada-hover" title="Forums" href="/" />
                    <LinkItem icon="bx bx-plus bx-tada-hover" title="Submit Book" href="/submit" />
                    <LinkItem type="desktop" icon="bx bx-cog bx-spin-hover" title="Settings" href="/" />
                </ul>
            </div>

            <AnimatePresence>
                {mobileMenu &&
                    <MobileMenu onOutSideClick={() => setMobileMenu(false)} />
                }
            </AnimatePresence>

            <AnimatePresence>
                {userMenu &&
                    <DesktopOverlay title={"Account"} className={styles.userMenuOverlay} flexDirection="flexColumn" >
                        <NavigationButton href={`/profile/${userInfo.user_id}`} icon="bx bx-user bx-sm" text="Your Account" />
                        <NavigationButton icon="bx bx-log-out bx-sm" text="Log Out" />
                    </DesktopOverlay>
                }
            </AnimatePresence>

            <AnimatePresence>
                {notification &&
                    <DesktopOverlay title={"Notifications (1)"} className={styles.notificationOverlay} flexDirection="flexColumn" >
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
                <i className={`${icon} bx-sm`} />
            </a>
        </li>
    );
}