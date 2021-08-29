import styles from '@styles/components/UserContainer.module.scss'

export function UserSmall({ onDropDownClick }) {
    return (
        <div className={`${styles.userWrap} ${styles.small}`}>
            <img className="skeleton" alt="Profile Picture" width={48} height={48} src={`http://source.unsplash.com/48x48/?nature`} />
            <div className={styles.statusWrap}>
                <a href="/profile">TheJayDuck</a>
                {/* <span title={`Moderation Level - Admin`} className={styles.status}>Admin</span> */}
            </div>
            <a onClick={onDropDownClick} className={`${"desktop"}`} ><i className='bx bxs-down-arrow'></i></a>
        </div>
    );
}

export function UserBig(data) {
    return (
        <div className={`${styles.userWrap}`}>
            <img className="skeleton" alt="Profile Picture" width={96} height={96} src={`http://source.unsplash.com/96x96/?nature`} />
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