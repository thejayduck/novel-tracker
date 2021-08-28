import { useState } from 'react';
import styles from '../styles/components/Navigation.module.scss';
import { UserSmall } from './userContainer';
import dynamic from 'next/dynamic'
import { DesktopOverlay } from './overlay';

const NotificationItem = dynamic(() => import("./notificationItem"))

export default function Navigation({ data }) {
    const [notification, setNotification] = useState(false);

    return (
        <nav className={`${styles.nav}`}>
            <div className={`${styles.container}`}>

                <div className={`desktop`}>
                    <UserSmall />
                </div>

                <a className={`${"mobile"}`} title="Hamburger Menu" ><i className={`bx bx-menu bx-sm`} /></a>
                <a className={`${"mobile"}`}>Homepage</a>
                <ul className={`${styles.links}`}>
                    <li><a title="Search" href="/search" ><i className={`bx bx-search bx-sm bx-tada-hover`} /></a></li>
                    <li className={`${"desktop"}`}><a onClick={() => setNotification(prev => !prev)} title="Notifications" ><i className={`bx bx-bell bx-sm bx-tada-hover`} /></a></li>
                    <li className={`${"desktop"}`}><a title="Forums" ><i className={`bx bx-chat bx-sm bx-tada-hover`} /></a></li>
                    <li><a title="Submit Book"><i className={`bx bx-plus bx-sm bx-tada-hover`} /></a></li>
                    <li className={`${"desktop"}`}><a title="Settings" ><i className={`bx bx-cog bx-sm bx-spin-hover`} /></a></li>
                </ul>
            </div>

            {notification &&
                <DesktopOverlay title={`Notification (1)`} className={styles.notificationOverlay} >
                    <NotificationItem />
                </DesktopOverlay>
            }
        </nav>
    );

}