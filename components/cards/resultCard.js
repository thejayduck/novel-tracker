import styles from '../../styles/components/CardElement.module.css'
import CardElement from './cardElement';

export default function ResultCard({ entry, onClick }) {
    return (
        <>
            <CardElement entry={entry}>
                <img className={styles.cover} src={entry?.coverUrl} />
                <div
                    className={styles.viewDetails}
                    onClick={() => onClick(entry)}
                >
                    <a title="View Details">
                        View Details
                    </a>
                </div>
            </CardElement>

        </>
    );
}