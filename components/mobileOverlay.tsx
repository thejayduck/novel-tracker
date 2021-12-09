// @ts-nocheck
import styles from "styles/components/OverlayMenu.module.scss";

import { motion } from "framer-motion";

import { PropsWithChildren, useEffect, useState } from "react";

export const constrains = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export interface MobileOverlayProps {
  title: string,
  onOutSideClick: () => void,
}

export function MobileOverlay({ title, onOutSideClick, children }: PropsWithChildren<MobileOverlayProps>) {
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
          (_event, info) => {
            setVelocity(info.velocity.y);
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
