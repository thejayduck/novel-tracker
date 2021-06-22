import { motion } from 'framer-motion';
import styles from '../../styles/components/CardElement.module.css'

export default function CardListWrapper({ children }) {
    return (
        <motion.div layout className={styles.cardListContainer}>
            <ul className={styles.cardListFeed}>
                {children}
            </ul>
        </motion.div>
    );
}