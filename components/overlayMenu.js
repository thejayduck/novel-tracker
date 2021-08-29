import { AnimatePresence, motion } from 'framer-motion'
import styles from '@styles/components/OverlayMenu.module.scss'

export function MobileOverlay({ title, onOutSideClick, children }) {
    return (
        <AnimatePresence>
            <motion.div
                onClick={onOutSideClick}
                className={`mobile ${styles.mobileOverlayWrap}`}

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div onClick={(e) => e.stopPropagation()} className={styles.mobileOverlay}>
                    <span>{title}</span>
                    <div className={`${styles.children} flex`}>
                        {children}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export function DesktopOverlay({ title, children, className, flexDirection }) {
    return (
        <AnimatePresence>
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
        </AnimatePresence>
    )
}