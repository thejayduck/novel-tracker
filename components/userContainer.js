import styles from 'styles/components/UserContainer.module.scss'
import { useUserInfoContext } from './pageBase';

export function UserSmall({ onDropDownClick, data }) {
    data = {
        picture: "http://source.unsplash.com/48x48/?nature",
        username: "TheJayDuck",
    }
    const userInfo = useUserInfoContext();
    return (
        <div className={`${styles.userWrap} ${styles.small}`}>
            <a href="/profile" className="flex">
                <img className="skeleton" alt="Profile Picture" width={48} height={48} src={data.picture} />
                <div className={styles.statusWrap}>
                    <span>{userInfo.username}</span>
                    {/* <span title={`Moderation Level - ${data.moderation}`} className={styles.status}>{data.moderation}</span> */}
                </div>
            </a>
            <a onClick={onDropDownClick} className={`${"desktop"}`} ><i className='bx bxs-down-arrow'></i></a>
        </div>
    );
}

export function UserBig({ userProfile, data }) {
    data = {
        picture: "http://source.unsplash.com/96x96/?nature",
        username: "TheJayDuck",
        followers: 20,
        following: 0
    }

    return (
        <div className={`${styles.userWrap}`}>
            <img className="skeleton" alt="Profile Picture" width={96} height={96} src={data.picture} />
            <div className={styles.statusWrap}>
                {userProfile?.moderation_level > 0 &&
                    <span title={`Moderation Level`} className={styles.status}>{userProfile ? userProfile.moderation_level : "Loading..."}</span>
                }
                <span className="fontLarge">{userProfile ? userProfile.username : "Loading..."}</span>
                <span className="fontSmall">
                    Joined {userProfile ? userProfile.createdAt : "Loading..."}
                    <br />
                    {data.followers} Followers / {data.following} Following
                </span>
            </div>
        </div>
    );
}