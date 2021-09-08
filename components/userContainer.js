import styles from '@styles/components/UserContainer.module.scss'

export function UserSmall({ onDropDownClick, data }) {
    data = {
        picture: "http://source.unsplash.com/48x48/?nature",
        username: "TheJayDuck",
    }

    return (
        <div className={`${styles.userWrap} ${styles.small}`}>
            <a href="/profile" className="flex">
                <img className="skeleton" alt="Profile Picture" width={48} height={48} src={data.picture} />
                <div className={styles.statusWrap}>
                    <span>{data.username}</span>
                </div>
            </a>
            <a onClick={onDropDownClick} className={`${"desktop"}`} ><i className='bx bxs-down-arrow'></i></a>
        </div>
    );
}

export function UserBig({ data }) {
    data = {
        picture: "http://source.unsplash.com/48x48/?nature",
        username: "TheJayDuck",
        moderation: "admin",
        followers: 20,
        following: 0,
        joined: "August 2021"
    }

    return (
        <div className={`${styles.userWrap}`}>
            <img className="skeleton" alt="Profile Picture" width={96} height={96} src={data.picture} />
            <div className={styles.statusWrap}>
                <span title={`Moderation Level - ${data.moderation}`} className={styles.status}>{data.moderation}</span>
                <span className="fontLarge">TheJayDuck</span>
                <span className="fontSmall">
                    Joined {data.joined}
                    <br />
                    {data.followers} Followers / {data.following} Following
                </span>
            </div>
        </div>
    );
}