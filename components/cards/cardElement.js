import styles from '../../styles/components/CardElement.module.css'

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CardElement({ entry, children }) {

    const [isHovering, setIsHovering] = useState(false);

    return (
        <li>
            <motion.div
                style={{
                    boxShadow: isHovering ? "0px 10px 20px black" : "none",
                }}
                layout
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                whileTap={{ scale: 1.05, }}
                whileHover={{ scale: 1.05, }}
                transition={{
                    type: "spring",
                    duration: 0.5,
                }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}

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