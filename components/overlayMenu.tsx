// @ts-nocheck
import styles from "styles/components/OverlayMenu.module.scss";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import { NavigationButton } from "components/ui/button";

import NotificationItem from "./notificationItem";
import { Subtitle } from "./subtitle";
import { UserSmall } from "./userContainer";

const constrains = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

// const mobileVariant = {
//   initial: { y: 100 },
//   animate: { y: 0 },
//   exit: {y: 500},
//   transition: {duration: 0.2},
// };

// const desktopVariant = {
//   initial: { translateY: -20, opacity: 0 },
//   animate: { translateY: 0, opacity: 1 },
//   exit: { translateY: -20, opacity: 0 },
// };


export function MobileOverlay({ title, onOutSideClick, children }) {
  const [velocity, setVelocity] = useState();
  useEffect(() => {

    if (velocity >= 800)
      onOutSideClick();

  }, [velocity]);

  return (
    <motion.div
      onClick={onOutSideClick}
      className={`mobile ${styles.mobileOverlayWrap}`}

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.mobileOverlay}
        onClick={(e) => e.stopPropagation()}

        drag="y"
        dragConstraints={constrains}

        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 500 }}
        transition={{ duration: 0.2 }}

        onDragEnd={
          (event, info) => {
            setVelocity(info.velocity.y);
            console.log(info);
          }
        }
      >
        <span>{title}</span>
        <div className={`${styles.children} flex`}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DesktopOverlay({ title, children, className, flexDirection }) {
  return (
    <motion.div
      className={`floatingMenu desktop ${className} ${styles.desktopOverlay}`}

      initial={{
        translateY: -20,
        opacity: 0
      }}
      animate={{
        translateY: 0,
        opacity: 1
      }}
      exit={{
        translateY: -20,
        opacity: 0
      }}
    >
      <span>{title}</span>
      <div className={`${styles.children} flex ${flexDirection}`}>
        {children}
      </div>
    </motion.div>
  );
}

export function MobileMenu({ onOutSideClick }) {
  const [velocity, setVelocity] = useState();

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
        onDragEnd={
          (event, info) => {
            setVelocity(info.velocity.x);
          }
        }


        initial={{ x: -200 }}
        animate={{ x: 0 }}
        exit={{ x: -500 }}
        transition={{ duration: 0.2 }}
      >
        <div className={"flex flexAround"} >
          <UserSmall />
          <a onClick={
            onOutSideClick
          } ><i className="bx bx-arrow-back bx-sm" /></a>
        </div>
        <div className={styles.menu}>
          <section className="flex flexColumn" >
            <Subtitle text="Pages" />
            <NavigationButton href="/" icon="bx bx-library bx-sm" text="Library" />
            <NavigationButton href="/search" icon="bx bx-search bx-sm" text="Search" />
            <NavigationButton href="#" icon="bx bx-chat bx-sm" text="Forums" />
            <NavigationButton href="/settings" icon="bx bx-cog bx-sm" text="Settings" />
            {/* TODO MAKE THIS DATA MOD ONLY */}
            <NavigationButton href="/mod" icon="bx bx-add-to-queue bx-sm" text="Book Submission" />
          </section>
          <section>
            <Subtitle text="Notifications (1)" />
            <ul className={`flex flexColumn ${styles.notificationWrap}`}>
              <NotificationItem />
            </ul>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}