import styles from '../../styles/components/CardElement.module.css'
import { motion } from 'framer-motion';

export default function CardElement({ entry, children }) {
    return (
        <motion.li
            layout
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
        >
            <div className={styles.cardElementWrap}>
                <div className={styles.ripple} />
                <div className={styles.cardElement}>
                    <h2
                        title={`${entry?.title}`}
                        className={styles.title}
                    >
                        {entry?.title}
                    </h2>
                    <img className={styles.cover} width="192" height="256" src={entry?.cover_url} alt="Book Cover" />
                    {children}
                </div>
            </div>
        </motion.li>
    );
}