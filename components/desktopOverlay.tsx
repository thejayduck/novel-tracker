import styles from "styles/components/OverlayMenu.module.scss";

import { motion } from "framer-motion";

import { PropsWithChildren } from "react";

export interface DesktopOverlayProps {
  title: string,
  className?: string,
  flexDirection?: string
}

export function DesktopOverlay({ title, children, className, flexDirection }: PropsWithChildren<DesktopOverlayProps>) {
  return (
    <motion.div
      className={`floatingMenu desktop ${className || ""} ${styles.desktopOverlay}`}

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
      <div className={`${styles.children} flex ${flexDirection || ""}`}>
        {children}
      </div>
    </motion.div>
  );
}
