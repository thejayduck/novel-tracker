import styles from '../styles/components/NotificationItem.module.scss'

export default function NotificationItem(data) {
    return (
        <li className={`flex flexRight ${styles.notificationItem}`}>
            <img className="skeleton" alt="Notification Image" width={48} height={48} src={`http://source.unsplash.com/48x48/?nature`} />
            <div className={styles.newIndicator}>New</div>
            <p>Incididunt reprehenderit consectetur dolor labore dolor eu esse fugiat do exercitation elit amet culpa consequat.</p>
        </li>
    )
}