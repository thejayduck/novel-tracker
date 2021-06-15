import { useEffect, useState } from 'react';
import styles from '../styles/BookCard.module.css'

export default function BookCard({ entry, onIncrement, onDecrement, onInfoClick, onDelete }) {

    const [data, setData] = useState(null);

    useEffect(async () => {
        const response = await fetch(`/api/get_book?id=${entry.id}`);
        const json = await response.json();
        console.log(json);
        setData(json);
    }, [])

    return (
        <div className={styles.wrap}>
            <div className={styles.list}>
                <p title={data?.title} className={styles.title}>
                    {data?.title}
                </p>
                <img className={styles.cover} src={data?.cover_url} />
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