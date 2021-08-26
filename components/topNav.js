import styles from '../styles/components/TopNav.module.scss';

export default function TopNav({ data }) {
    return (
        <nav className={`${styles.nav}`}>
            <div className={`${styles.container}`}>
                <User />
                <ul className={`${styles.links}`}>
                    <li><a title="Menu Search" ><i class='bx bx-search bx-md bx-tada-hover' /></a></li>
                    <li><a title="Menu Notifications" ><i class='bx bx-bell bx-md bx-tada-hover' /></a></li>
                    <li><a title="Menu Forums" ><i class='bx bx-chat bx-md bx-tada-hover' /></a></li>
                    <li><a title="Menu Settings" ><i class='bx bx-cog bx-md bx-spin-hover' /></a></li>
                </ul>
            </div>
        </nav>
    );

}

function User({ data }) {
    return (
        <div className={styles.userWrap}>
            <img alt="Profile Picture" width={58} height={58} src={`/profileTemp.png`} />
            <div className={styles.statusWrap}>
                <span>TheJayDuck</span>
                <span className={styles.status}>Admin</span>
            </div>
            <a><i class='bx bxs-down-arrow'></i></a>
        </div>
    );
}