import styles from "styles/components/UserContainer.module.scss";

import convertDate from "./helper/convertData";
import { moderationLevelNames,UserBigProps } from "./userContainer";


export function UserBig({ userProfile }: UserBigProps) {
  const data = {
    picture: "http://source.unsplash.com/96x96/?nature",
    followers: 20,
    following: 0
  };

  return (
    <div className={`${styles.userWrap} ${styles.userBig}`}>
      <img className="skeleton" alt="Profile Picture" width={96} height={96} src={data.picture} />
      <div className={styles.statusWrap}>
        {userProfile?.moderation_level > 0 &&
          <span title={"Moderation Level"} className={styles.status}>{userProfile ? moderationLevelNames[userProfile.moderation_level] : "Loading..."}</span>}
        <span className="fontLarge">{userProfile ? userProfile.username : "Loading..."}</span>
        <span className="fontSmall">
          Joined {userProfile ? convertDate(userProfile.createdAt) : "Loading..."}
          <br />
          {data.followers} Followers - {data.following} Following
        </span>
      </div>
    </div>
  );
}
