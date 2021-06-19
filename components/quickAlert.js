import styles from '../styles/components/QuickAlert.module.css'
import { motion } from 'framer-motion';

export default function QuickAlert({ title, message, icon }) {

    return (
        <motion.div
            className={styles.container}
            initial={{
                y: 200,
            }}
            animate={{
                y: 0,
            }}
            transition={{ duration: 1 }}
        >
            <div>
                <i className={icon} />
                <a>{message}</a>
            </div>
        </motion.div>
    );

}