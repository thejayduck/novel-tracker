// @ts-nocheck
import styles from "styles/components/UserContainer.module.scss";

import { useUserInfoContext } from "./pageBase";

export interface UserSmallProps {
  onDropDownClick?: () => void,
  data?: any,
}

export function UserSmall({ onDropDownClick, data }: UserSmallProps) {
  data = {
    picture: "http://source.unsplash.com/48x48/?nature",
  };
  const userInfo = useUserInfoContext();
  return (
    <div className={`${styles.userWrap} ${styles.small}`}>
      <a onClick={onDropDownClick} className="flex">
        <img className="skeleton" alt="Profile Picture" width={48} height={48} src={data.picture} />
        <div className={styles.statusWrap}>
          <span>{userInfo.username}</span>
        </div>
      </a>
      {/* <a onClick={onDropDownClick} className={`${"desktop"}`} ><i className='bx bxs-down-arrow'></i></a> */}
    </div>
  );
}
