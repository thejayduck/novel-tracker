import styles from '../styles/components/TopNav.module.scss';
import { UserSmall } from './userContainer';

export default function TopNav({ data }) {
    return (
        <nav className={`${styles.nav}`}>
            <div className={`${styles.container}`}>

                <div className={`desktop`}>
                    <UserSmall />
                </div>

                <a className={`${"mobile"}`} title="Hamburger Menu" ><i class={`bx bx-menu bx-sm`} /></a>
                <a className={`${"mobile"}`}>Homepage</a>
                <ul className={`${styles.links}`}>
                    <li><a title="Search" ><i class={`bx bx-search bx-sm bx-tada-hover`} /></a></li>
                    <li className={`${"desktop"}`} ><a title="Notifications" ><i class={`bx bx-bell bx-sm bx-tada-hover`} /></a></li>
                    <li className={`${"desktop"}`}><a title="Forums" ><i class={`bx bx-chat bx-sm bx-tada-hover`} /></a></li>
                    <li><a title="Submit Book" ><i class={`bx bx-plus bx-sm bx-tada-hover`} /></a></li>
                    <li className={`${"desktop"}`}><a title="Settings" ><i class={`bx bx-cog bx-sm bx-spin-hover`} /></a></li>
                </ul>
            </div>
        </nav>
    );

}