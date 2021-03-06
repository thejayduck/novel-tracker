// @ts-nocheck
import styles from "styles/components/Navigation.module.scss";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

import { useState } from "react";

import { NavigationButton } from "components/ui/button";

import { useApi, useIsMobile } from "lib/clientHelpers";

import { DesktopOverlay } from "./desktopOverlay";
import { LinkItem } from "./linkItem";
import { MobileMenu } from "./mobileMenu";
import { useUserInfoContext } from "./pageBase";
import { UserSmall } from "./userSmall";

const NotificationItem = dynamic(() => import("./notificationItem"));

export default function Navigation() {
  const isMobile = useIsMobile();

  const [notification, setNotification] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const userInfo = useUserInfoContext();
  const api = useApi();
  const router = useRouter();

  return (
    <nav className={`${styles.nav}`}>
      <div className={`${styles.container} flex flexRow flexBetween`}>
        {userInfo &&
          <>
            <a className={`${"mobile"}`} onClick={() => setUserMenu(true)} title="Hamburger Menu" >
              <i className={"bx bx-menu bx-md"} />
            </a>
            {/* <a className={`${"mobile"}`}>Homepage</a> */}
          </>
        }
        <ul className={`${styles.links} unorderedList desktop`}>
          {userInfo && <LinkItem text={true} title="Library" href="/" />}
          <LinkItem text={true} title="Search" href="/search" />
          <LinkItem text={true} title="Forums" href="/" />
          {userInfo && <LinkItem text={true} title="Submit" href="/submit" />}
          {userInfo?.moderation_level >= 2 &&
            <LinkItem text={true} title="Submissions" href="/mod" />
          }
          {userInfo?.moderation_level >= 3 &&
            <LinkItem text={true} title="Administration" href="/admin" />
          }
        </ul>

        {userInfo &&
          <div className={`flex ${styles.rightMenu} desktop`}>
            <ul className={`${styles.links} unorderedList`}>
              <LinkItem text={false} icon="bx bx-bell bx-tada-hover" title="Notifications" onClick={() => setNotification(prev => !prev)} />
            </ul>
            <UserSmall onDropDownClick={() => setUserMenu(prev => !prev)} />
          </div>
        }
      </div>

      <AnimatePresence>
        {userMenu && (
          isMobile
            ? <MobileMenu onOutSideClick={() => setUserMenu(false)} />
            : <DesktopOverlay title={"Account"} className={styles.userMenuOverlay} flexDirection="flexColumn" onOutsideClick={() => setUserMenu(false)} >
              <NavigationButton href={`/user/${userInfo.user_id}`} icon="bx bx-user bx-sm" text="Your Account" />
              <NavigationButton icon="bx bx-cog bx-sm" text="Settings" href="/settings" />
              <NavigationButton
                icon="bx bx-log-out bx-sm"
                text="Log Out"
                onClick={() => {
                  api.logout(() => {
                    router.push("/login");
                  });
                }}
              />
            </DesktopOverlay>
        )}
      </AnimatePresence>

      {!isMobile &&
        <AnimatePresence>
          {notification &&
            <DesktopOverlay title={"Notifications (1)"} className={styles.notificationOverlay} flexDirection="flexColumn" onOutsideClick={() => setNotification(false)} >
              <NotificationItem />
            </DesktopOverlay>
          }
        </AnimatePresence>
      }
    </nav >
  );
}