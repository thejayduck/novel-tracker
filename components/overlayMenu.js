import { AnimateSharedLayout, motion } from 'framer-motion';
import styles from '../styles/components/overlayMenu.module.css'

export default function OverlayMenu({ children, className }) {
    const contentVariant = {
        initial: {
            opacity: 0,
        },
        enabled: {
            opacity: 1,
        },
        disabled: {
            opacity: 0,
        }
    }

    return (
        <AnimateSharedLayout>
            <motion.div
                className={styles.main}
                variants={contentVariant}
                initial="initial"
                animate="enabled"
                exit="disabled"
            >
                <motion.div
                    className={className}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.6 }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </AnimateSharedLayout>
    );
}