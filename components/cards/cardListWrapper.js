import styles from '../../styles/components/CardElement.module.css'

export default function CardListWrapper({ children }) {
    return (
        <div className={styles.cardListContainer}>
            <ul className={styles.cardListFeed}>
                {children}
            </ul>
        </div>
    );
}