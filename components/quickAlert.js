import styles from '../styles/components/QuickAlert.module.css'

const alertIcon = {
    'information': "fas fa-check",
    'error': "fas fa-check",
};

export default function QuickAlert({ message, icon, severity }) {

    return (
        <div className={styles.container}>
            <i className={alertIcon[severity]} />
            <a className={styles.message} title={message}>{message}</a>
        </div>
    );

}