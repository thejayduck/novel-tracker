import { AnimateSharedLayout, motion } from 'framer-motion';
import styles from '../styles/components/overlayMenu.module.css'

export default function OverlayMenu({ children, className, close }) {

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
                onClick={() => { close() }}
            >
                <a className={styles.inform}>Click Outside to Exit</a>
                <motion.div
                    className={className}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.6 }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    onClick={e => {
                        e.stopPropagation();
                    }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </AnimateSharedLayout>
    );
}