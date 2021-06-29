import styles from '../styles/components/QuickAlert.module.css'
import { motion } from 'framer-motion';

export default function QuickAlert({ message, icon }) {

    return (
        <div className={styles.container}>
            <i className={icon} />
            <a className={styles.message} title={message}>{message}</a>
        </div>
    );

}