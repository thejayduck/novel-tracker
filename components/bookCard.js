import { useEffect, useState } from 'react';
import styles from '../styles/components/BookCard.module.css'

export default function BookCard({ entry, onIncrement, onDecrement, onInfoClick, onDelete }) {

    const [data, setData] = useState(null);

    useEffect(async () => {
        const response = await fetch(`/api/get_book?id=${entry.id}`);
        const json = await response.json();
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
                            <QuickButton title="Book Info" icon="fas fa-info" onClick={onInfoClick} />
                            <QuickButton title="Delete Book" icon="fas fa-trash-alt" onClick={onDelete} />
                            <div>
                                <QuickButton title="Decrease Progress" icon="fas fa-minus" onClick={onDecrement} />
                                <QuickButton title="Increase Progress" icon="fas fa-plus" onClick={onIncrement} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuickButton({ title, icon, onClick }) {
    return (
        <>
            <a
                onClick={onClick}
                title={title}
            >
                <i className={icon} />
            </a>
        </>
    );
}