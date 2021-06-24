import styles from '../../styles/components/CardElement.module.css'
import { motion } from 'framer-motion';

export default function CardListWrapper({ children }) {
    return (
        <motion.div layout className={styles.cardListContainer}>
            <ul className={styles.cardListFeed}>
                {children}
            </ul>
        </motion.div>
    );
}