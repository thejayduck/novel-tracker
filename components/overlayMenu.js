import { AnimateSharedLayout, motion } from 'framer-motion';
import styles from '../styles/components/overlayMenu.module.css'

export default function OverlayMenu({ children, className }) {
    const contentVariant = {
        initial: {
            opacity: 0,
        },
        enabled: {
            opacity: 1,
            transition: {
                type: "spring",
            }
        },
        disabled: {
            opacity: 0
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
                <div
                    className={className}
                >
                    {children}
                </div>
            </motion.div>
        </AnimateSharedLayout>
    );
}