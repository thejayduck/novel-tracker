import styles from '../styles/components/QuickAlert.module.css'

const alertIcon = {
    'information': "fas fa-fw fa-check",
    'error': "fas fa-fw fa-exclamation",
};

export default function QuickAlert({ message, severity }) {

    return (
        <div className={styles.container}>
            <i className={`${alertIcon[severity]} ${styles.icon}`} />
            <a className={styles.message} title={message}>{message}</a>
        </div>
    );

}