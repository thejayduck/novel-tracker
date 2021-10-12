import styles from "styles/components/OverlayMenu.module.scss";

import { motion } from "framer-motion";


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
