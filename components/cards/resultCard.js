import styles from '../../styles/components/CardElement.module.css'
import CardElement from './cardElement';
import Button from '../ui/button';

export default function ResultCard({ entry, onClick }) {
    return (
        <>
            <CardElement entry={entry}>
                <img className={styles.cover} src={entry?.coverUrl} />
                <div
                    className={styles.viewDetailsWrap}
                    onClick={() => onClick(entry)}
                >
                    <a className={styles.viewDetails} title="View Details">
                        View Details
                    </a>
                    <div className={styles.buttonWrap}>
                        <Button text="Add Book" icon="fas fa-plus" onClick={(e) => {
                            window.alert("Unimplemented");
                            e.stopPropagation();
                        }} />
                    </div>
                </div>
            </CardElement>
        </>
    );
}