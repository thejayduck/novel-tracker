import styles from "styles/components/OverlayMenu.module.scss";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import { NavigationButton } from "components/ui/button";

import NotificationItem from "./notificationItem";
import { constrains } from "./overlayMenu";
import { Subtitle } from "./subtitle";
import { UserSmall } from "./userSmall";

export function MobileMenu({ onOutSideClick }) {
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {

    if (velocity <= -800)
      onOutSideClick();

  }, [velocity]);

  return (
    <motion.div
      className={`mobile ${styles.mobileMenuWrap}`}
      onClick={onOutSideClick}

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.mobileMenu}
        onClick={(e) => e.stopPropagation()}
        drag="x"

        dragConstraints={constrains}
        onDragEnd={(event, info) => {
          setVelocity(info.velocity.x);
        }}


        initial={{ x: -200 }}
        animate={{ x: 0 }}
        exit={{ x: -500 }}
        transition={{ duration: 0.2 }}
      >
        <div className={"flex flexAround"}>
          <UserSmall />
          <a onClick={() => window.alert("Logged Out")  }><i className="bx bx-log-out bx-sm" /></a>
        </div>
        <div className={styles.menu}>
          <section className="flex flexColumn">
            <Subtitle text="Navigation" />
            <NavigationButton href="/" icon="bx bx-library bx-sm" text="Library" />
            <NavigationButton href="/search" icon="bx bx-search bx-sm" text="Search" />
            <NavigationButton href="#" icon="bx bx-chat bx-sm" text="Forums" />
            <NavigationButton href="/settings" icon="bx bx-cog bx-sm" text="Settings" />
            {/* TODO MAKE THIS DATA MOD ONLY */}
            <a>Moderator Tools</a>
            <NavigationButton href="/mod" icon="bx bx-add-to-queue bx-sm" text="Book Submission" />
          </section>
          <section className={styles.notificationWrap}>
            <Subtitle text="Notifications (1)" />
            <ul className={"flex flexColumn"}>
              <NotificationItem />
            </ul>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}
