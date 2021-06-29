import styles from '../../styles/components/CardElement.module.css'
import { motion } from 'framer-motion';

export default function CardListWrapper({ children }) {
    return (
        <motion.ul layout className={styles.cardListFeed}>
            {children}
        </motion.ul>
    );
}