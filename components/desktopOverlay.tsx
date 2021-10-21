import styles from "styles/components/OverlayMenu.module.scss";

import { motion } from "framer-motion";

import { PropsWithChildren } from "react";

import { useOuterClick } from "lib/clientHelpers";

export interface DesktopOverlayProps {
  title: string,
  className?: string,
  flexDirection?: string,
  onOutsideClick?: () => void,
}

export function DesktopOverlay({ title, children, className, flexDirection, onOutsideClick }: PropsWithChildren<DesktopOverlayProps>) {
  const clickBorderRef = useOuterClick(onOutsideClick);
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
      ref={clickBorderRef}
    >
      <span>{title}</span>
      <div className={`${styles.children} flex ${flexDirection || ""}`}>
        {children}
      </div>
    </motion.div>
  );
}
