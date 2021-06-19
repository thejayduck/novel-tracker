import styles from '../styles/components/CardElement.module.css'
import InputField from './ui/inputField';
import Button from './ui/button';

import { AnimatePresence, motion } from 'framer-motion';
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
                    <a title="View Details">
                        View Details
                    </a>
                </div>
            </CardElement>

        </>
    );
}

export function LibraryCard({ entry, onIncrement, onDecrement, onChapterChange, onVolumeChange, onDelete }) {

    const [editPanel, setEditPanel] = useState(false);
    const [data, setData] = useState(null);

    useEffect(async () => {
        const response = await fetch(`/api/get_book?id=${entry.id}`);
        const json = await response.json();
        setData(json);
    }, [])

    return (
        <CardElement entry={data}>
            <img className={styles.cover} src={data?.cover_url} />
            {!editPanel &&
                <div className={styles.details}>
                    <div>
                        <span className={styles.status}>
                            Current Chapter: {entry?.chapter}
                        </span>
                        <hr />
                        <div className={styles.quickEdit}>
                            <div>
                                <QuickButton title="Edit Progress" icon="fas fa-feather-alt" onClick={() => setEditPanel(true)} />
                                <QuickButton title="Delete Book" icon="fas fa-trash-alt" onClick={onDelete} />
                            </div>
                            <div>
                                <QuickButton title="Decrease Progress" icon="fas fa-minus" onClick={onDecrement} />
                                <QuickButton title="Increase Progress" icon="fas fa-plus" onClick={onIncrement} />
                            </div>
                        </div>
                    </div>
                </div>
            }
            <AnimatePresence>
                {editPanel &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}

                        className={styles.editProgress}
                    >
                        <a title="Edit Progress">
                            <div className={styles.formSection}>
                                <InputField title="Volumes" inputType="number" defaultValue={entry?.volume} onChange={onVolumeChange} maxValue="200" />
                                <InputField title="Chapters" inputType="number" defaultValue={entry?.chapter} onChange={onChapterChange} maxValue="10000" />
                                <br />
                                <Button title="Close" onClick={() => setEditPanel(false)} />
                            </div>
                        </a>
                    </motion.div>
                }
            </AnimatePresence>
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