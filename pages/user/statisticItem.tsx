import styles from "styles/Profile.module.scss";

import { AnimatePresence, motion } from "framer-motion";

import React, { useEffect, useState } from "react";

export function StatisticItem({ icon, title, stat, children, onOpenChanged }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (onOpenChanged) {
      onOpenChanged(isOpen);
    }
  }, [isOpen]);

  return (
    <>
      <a className={`${styles.statisticItem} flex flexBetween`} onClick={() => setIsOpen(prev => !prev)}>
        <div className={"flex flexRight"}>
          <i className={`${icon} fontLarger`} />
          <div className={styles.statistic}>
            <span>{stat}</span>
            <br />
            <span className={`${styles.statName} fontMedium`}>{title}</span>
          </div>
        </div>
        <motion.i
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          className='bx bxs-down-arrow' />
      </a>
      <AnimatePresence>
        {isOpen &&
          <motion.div
            className={`flex ${styles.bookContainer}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "max-content" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ stiffness: 100 }}
          >
            {children}
          </motion.div>}
      </AnimatePresence>
    </>
  );
}
