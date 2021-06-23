import styles from '../../styles/components/CardElement.module.css'

import { motion } from 'framer-motion';

export default function CardElement({ entry, children }) {
    return (
        <li>
            <motion.div
                layout
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                transition={{
                    type: "spring",
                    duration: 0.5,
                }}
                className={styles.activityEntry}
            >
                <div className={styles.wrap}>
                    <div className={styles.list}>
                        <p
                            title={`${entry?.title}`}
                            className={styles.title}
                        >
                            {entry?.title}
                        </p>
                        {children}
                    </div>
                </div>
            </motion.div>
        </li>
    );
}