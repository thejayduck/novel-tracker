import styles from '../../styles/components/Button.module.css'
import { motion } from 'framer-motion';

export default function Button({ title, icon, onClick }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}

            className={styles.button}
            onClick={onClick}
        >
            {title && <a> {title} </a>}
            {icon && <i className={icon} />}
        </motion.div>
    );

}

export function FloatingButton({ hoverTitle, title, icon, onClick }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}

            className={styles.floatingButton}
            onClick={onClick}
        >
            <a title={hoverTitle}><i className={icon} /> {title}</a>
        </motion.div>
    );
}