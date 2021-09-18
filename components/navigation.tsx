// @ts-nocheck
import styles from "styles/components/Navigation.module.scss";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

import { useState } from "react";

import { NavigationButton } from "components/ui/button";

import { useApi } from "lib/clientHelpers";

import { DesktopOverlay, MobileMenu } from "./overlayMenu";
import { useUserInfoContext } from "./pageBase";
import { UserSmall } from "./userContainer";

const NotificationItem = dynamic(() => import("./notificationItem"));

export default function Navigation() {
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
        <ul className={`${styles.links} desktop`}>
          {userInfo && <LinkItem text={true} title="Library" href="/" />}
          <LinkItem text={true} title="Search" href="/search" />
          <LinkItem text={true} title="Forums" href="/" />
          {userInfo && <LinkItem text={true} title="Submit Book" href="/submit" />}
          {userInfo?.moderation_level > 0 &&
            <LinkItem text={true} title="Mod Panel" href="/mod" />
          }
        </ul>

        {userInfo &&
          <div className={`flex ${styles.rightMenu} desktop`}>
            <ul className={`${styles.links}`}>
              <LinkItem text={false} icon="bx bx-bell bx-tada-hover" title="Notifications" onClick={() => setNotification(prev => !prev)} />
            </ul>
            <UserSmall onDropDownClick={() => setUserMenu(prev => !prev)} />
          </div>
        }
      </div>

      <AnimatePresence>
        {userMenu &&
          <MobileMenu onOutSideClick={() => setUserMenu(false)} />
        }
      </AnimatePresence>

      <AnimatePresence>
        {userMenu &&
          <DesktopOverlay title={"Account"} className={styles.userMenuOverlay} flexDirection="flexColumn" >
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
        }
      </AnimatePresence>

      <AnimatePresence>
        {notification &&
          <DesktopOverlay title={"Notifications (1)"} className={styles.notificationOverlay} flexDirection="flexColumn" >
            <NotificationItem />
          </DesktopOverlay>
        }
      </AnimatePresence>
    </nav >
  );
}

function LinkItem({ type, icon, title, text, href, onClick }) {
  return (
    <li className={type}>
      <a title={title} href={href} onClick={onClick} >
        {text && <span>{title}</span>}
        {icon && <i className={`${icon} bx-sm`} />}
      </a>
    </li>
  );
}