import styles from "styles/Profile.module.scss";

import { AnimatePresence, motion } from "framer-motion";

import React, { useEffect, useState } from "react";

import LibraryCard from "components/cards/LibraryCard";

interface StatisticItemProps {
  icon: string,
  title: string,
  stat: string,
  onOpenChanged: (isOpen: boolean) => void,
  data: any[],
  onRemove: (book: any) => void,
}

export default function StatisticItem({ icon, title, stat, onOpenChanged, data, onRemove }: StatisticItemProps) {
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
          animate={{ rotate: isOpen && data?.length ? 180 : 0 }}
          className='bx bxs-down-arrow' />
      </a>
      <AnimatePresence>
        {isOpen &&
          data?.length &&
          <motion.div
            className={`flex ${styles.bookContainer}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "max-content", overflow: "initial" }}
            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
            transition={{ stiffness: 100 }}
          >
            {data &&
              data.map((book: any) => <LibraryCard key={book._id} data={book} onRemove={() => onRemove(book)} />)
            }
          </motion.div>}
      </AnimatePresence>
    </>
  );
}
