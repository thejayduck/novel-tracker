import styles from '../styles/components/UserContainer.module.scss'

export function UserSmall(data) {
    return (
        <div className={`${styles.userWrap} ${styles.small}`}>
            <img alt="Profile Picture" width={48} height={48} src={`/profileTemp.png`} />
            <div className={styles.statusWrap}>
                <span>TheJayDuck</span>
                {/* <span title={`Moderation Level - Admin`} className={styles.status}>Admin</span> */}
            </div>
            <a className={`${"desktop"}`} ><i className='bx bxs-down-arrow'></i></a>
        </div>
    );
}

export function UserBig(data) {
    return (
        <div className={`${styles.userWrap}`}>
            <img alt="Profile Picture" width={96} height={96} src={`/profileTemp.png`} />
            <div className={styles.statusWrap}>
                <span title={`Moderation Level - Admin`} className={styles.status}>Admin</span>
                <span className="fontLarge">TheJayDuck</span>
                <span className="fontSmall">
                    Joined August 2021
                    <br />
                    10 Followers / 0 Following
                </span>
            </div>
        </div>
    );
}