// @ts-nocheck
import styles from "styles/components/UserContainer.module.scss";

import { useUserInfoContext } from "./pageBase";

interface UserSmallProps {
  onDropDownClick?: () => void,
}

export function UserSmall({ onDropDownClick, data }: UserSmallProps) {
  data = {
    picture: "http://source.unsplash.com/48x48/?nature",
  };
  const userInfo = useUserInfoContext();
  return (
    <div className={`${styles.userWrap} ${styles.small}`}>
      <a href={`/user/${userInfo.user_id}`} className="flex">
        <img className="skeleton" alt="Profile Picture" width={48} height={48} src={data.picture} />
        <div className={styles.statusWrap}>
          <span>{userInfo.username}</span>
        </div>
      </a>
      <a onClick={onDropDownClick} className={`${"desktop"}`} ><i className='bx bxs-down-arrow'></i></a>
    </div>
  );
}

export const moderationLevelNames = {
  0: "User",
  1: "Mod",
  2: "Admin",
  3: "Owner",
};

export interface UserBigProps {
  userProfile: GetUserInfoResponse,
}