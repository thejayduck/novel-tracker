import styles from '../styles/BookCard.module.css'

export default function BookCard({ entry, onIncrement, onDecrement, onInfoClick, onDelete }) {
    return (
        <div className={styles.wrap}>
            <div className={styles.list}>
                <p title={entry.title} className={styles.title}>
                    {entry.title}
                </p>
                <img className={styles.cover} src={entry.coverUrl} />
                <div className={styles.details}>
                    <div>
                        <span className={styles.status}>
                            Current Chapter: {entry.chapter}
                        </span>
                        <hr />
                        <div className={styles.quickEdit}>
                            <a
                                onClick={onIncrement}
                                title="Increase Progress"
                                className="fas fa-plus"
                            />
                            <a
                                onClick={onDecrement}
                                title="Decrease Progress"
                                className="fas fa-minus"
                            />
                            <a onClick={onInfoClick} title="Info" className="fas fa-info" />
                            <a
                                onClick={onDelete}
                                title="Delete Book"
                                style={{ color: '#e33131' }}
                                className="fas fa-trash-alt"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}