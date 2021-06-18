import styles from '../styles/components/CardElement.module.css'
import { motion } from 'framer-motion';

export default function CardElement({ entry, children }) {
    return (
        <motion.li
            layout
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            key={entry.id}
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
                        <img className={styles.cover} src={entry?.coverUrl} />
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
    return (
        <CardElement entry={entry}>

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