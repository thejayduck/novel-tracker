import styles from '../styles/components/TopNav.module.scss';

export default function TopNav({ data }) {
    return (
        <nav className={`${styles.nav}`}>
            <div className={`${styles.container}`}>

                <div className={`desktop`}>
                    <User />
                </div>

                <a className={`${"mobile"}`} title="Hamburger Menu" ><i class={`bx bx-menu bx-sm`} /></a>
                <a className={`${"mobile"}`}>Homepage</a>
                <ul className={`${styles.links}`}>
                    <li><a title="Menu Search" ><i class={`bx bx-search bx-sm bx-tada-hover`} /></a></li>
                    <li className={`${"desktop"}`} ><a title="Menu Notifications" ><i class={`bx bx-bell bx-sm bx-tada-hover`} /></a></li>
                    <li className={`${"desktop"}`}><a title="Menu Forums" ><i class={`bx bx-chat bx-sm bx-tada-hover`} /></a></li>
                    <li className={`${"desktop"}`}><a title="Menu Settings" ><i class={`bx bx-cog bx-sm bx-spin-hover bx-spin-hover`} /></a></li>
                </ul>
            </div>
        </nav>
    );

}

function User({ data }) {
    return (
        <div className={`${styles.userWrap}`}>
            <img alt="Profile Picture" width={48} height={48} src={`/profileTemp.png`} />
            <div className={styles.statusWrap}>
                <span>TheJayDuck</span>
                <span title={`Moderation Level - Admin`} className={styles.status}>Admin</span>
            </div>
            <a><i class='bx bxs-down-arrow'></i></a>
        </div>
    );
}