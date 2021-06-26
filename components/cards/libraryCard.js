import styles from '../../styles/components/CardElement.module.css'
import CardElement from './cardElement';
import { CardButton } from '../ui/button';
import { InputFieldNonManaged } from '../ui/inputField';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDelayedStateWithLive } from '../../lib/clientHelpers';

export default function LibraryCard({ entry: _entry, onDelete: _onDelete }) {

    const [editPanel, setEditPanel] = useState(false);
    const [entry, setEntry] = useState(_entry);

    const [chaptersRead, setChaptersRead, liveChaptersRead] = useDelayedStateWithLive(entry.chapters_read, 250);
    const [volumesRead, setVolumesRead, liveVolumesRead] = useDelayedStateWithLive(entry.volumes_read, 250);

    useEffect(async () => {
        if (isNaN(chaptersRead)) {
            return;
        }

        const response = await fetch("/api/me/update_chapters_read", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                book_id: entry.book_id,
                new_chapters_read: chaptersRead,
            }),
        });
        const json = await response.json();
        if (json.status != "OK") {
            throw json;
        }
        setEntry(entry => ({ ...entry, chapters_read: Number.parseInt(json.data.chapters_read), volumes_read: Number.parseInt(json.data.volumes_read) }));
    }, [chaptersRead]);

    useEffect(async () => {
        // TODO
    }, [volumesRead]);

    async function onDelete() {
        const response = await fetch("/api/me/delete_book", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                book_id: entry.book_id,
            }),
        });
        const json = await response.json();
        if (json.status != "OK") {
            throw json;
        }

        _onDelete();
    }

    return (
        <CardElement entry={entry}>
            <img width="192" height="256" className={styles.cover} src={entry?.cover_url} alt={`${entry.title.split(' ')[0]} Cover`} />
            {!editPanel &&
                <div className={styles.details}>
                    <div>
                        <span className={styles.status}>
                            Current Chapter: {liveChaptersRead}
                        </span>
                        <hr />
                        <div className={styles.cardButtonWrapper}>
                            <div>
                                <CardButton title="Edit Progress" icon="fas fa-feather-alt" onClick={() => setEditPanel(true)} />
                            </div>
                            <div>
                                <CardButton title="Increase Progress" icon="fas fa-minus" onClick={() => setChaptersRead(Math.max(0, liveChaptersRead - 1))} />
                                <CardButton title="Decrease Progress" icon="fas fa-plus" onClick={() => setChaptersRead(liveChaptersRead + 1)} />
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
                        transition={{ duration: 0.2 }}
                        className={`${styles.details} ${styles.editPanel}`}
                    >
                        <div>
                            <InputFieldNonManaged title="Volumes" inputType="number" value={liveVolumesRead} onChange={({ target }) => setVolumesRead(target.value)} maxValue="200" />
                            <InputFieldNonManaged title="Chapters" inputType="number" value={liveChaptersRead} onChange={({ target }) => setChaptersRead(target.value)} maxValue="10000" />
                            <hr />
                            <div className={styles.cardButtonWrapper}>
                                <div>
                                    <CardButton title="Close Editing" icon="fas fa-angle-left" onClick={() => setEditPanel(false)} />
                                    <CardButton title="Delete Book" icon="fas fa-trash-alt" onClick={onDelete} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </CardElement>
    );
}