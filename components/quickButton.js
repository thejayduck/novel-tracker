import styles from '../styles/components/CardElement.module.css'

export default function QuickButton({ title, icon, onClick }) {
    return (
        <>
            <a
                className={styles.quickButton}
                onClick={onClick}
                title={title}
            >
                <i className={icon} />
            </a>
        </>
    );
}