import styles from '../../styles/components/CardElement.module.css'

export default function CardListWrapper({ children }) {
    return (
        <ul className={styles.cardListWrap}>
            {children}
        </ul>
    );
}