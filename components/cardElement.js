import styles from '../styles/components/CardElement.module.css'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CardListWrapper({ children }) {
    return (
        <div className={styles.cardListContainer}>
            <ul className={styles.cardListFeed}>
                {children}
            </ul>
        </div>
    );
}

export function CardElement({ entry, children }) {

    return (
        <motion.li
            layout
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            whileTap={{
                scale: 0.98,
            }}
            whileHover={{
                scale: 1.05,
            }}
            transition={{
                type: "spring",
                duration: 0.5,
            }}
        >
            <div className={styles.activityEntry}>
                <div className={styles.wrap}>
                    <div className={styles.list}>
                        <p
                            title={`${entry?.title}`}
                            className={styles.title}
                        >
                            {entry?.title}
                        </p>
                        {children}
                    </div>
                </div>
            </div>

        </motion.li>
    );
}

export function ResultCard({ entry, onClick, onAddClick }) {
    return (
        <>
            <CardElement entry={entry}>
                <img className={styles.cover} src={entry?.coverUrl} />
                <div
                    className={styles.viewDetails}
                    onClick={() => onClick(entry)}
                >
                    <a href="#" title="View Details">
                        View Details
                    </a>
                </div>
            </CardElement>

        </>
    );
}

export function LibraryCard({ entry, onIncrement, onDecrement, onDelete }) {

    const [data, setData] = useState(null);

    useEffect(async () => {
        const response = await fetch(`/api/get_book?id=${entry.id}`);
        const json = await response.json();
        setData(json);
    }, [])

    return (
        <CardElement entry={data}>
            <img className={styles.cover} src={data?.cover_url} />
            <div className={styles.details}>
                <div>
                    <span className={styles.status}>
                        Current Chapter: {entry?.chapter}
                    </span>
                    <hr />
                    <div className={styles.quickEdit}>
                        <QuickButton title="Delete Book" icon="fas fa-trash-alt" onClick={onDelete} />
                        <div>
                            <QuickButton title="Decrease Progress" icon="fas fa-minus" onClick={onDecrement} />
                            <QuickButton title="Increase Progress" icon="fas fa-plus" onClick={onIncrement} />
                        </div>
                    </div>
                </div>
            </div>
        </CardElement>
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