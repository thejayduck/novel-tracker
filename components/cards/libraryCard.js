import styles from '../../styles/components/CardElement.module.css'

import CardElement from './cardElement';
import { CardButton } from '../ui/button';
import { InputFieldNonManaged } from '../ui/inputField';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useApi, useDelayedStateWithLive } from '../../lib/clientHelpers';

export default function LibraryCard({ entry: _entry, onDelete: _onDelete }) {

    const [editPanel, setEditPanel] = useState(false);
    const [entry, setEntry] = useState(_entry);

    const [chaptersRead, setChaptersRead, liveChaptersRead] = useDelayedStateWithLive(entry.chapters_read, 250);
    const [volumesRead, setVolumesRead, liveVolumesRead] = useDelayedStateWithLive(entry.volumes_read, 250);

    // TODO Update volumes properly when chapters are updated

    const api = useApi();

    useEffect(async () => {
        if (isNaN(chaptersRead)) {
            return;
        }

        const data = await api.updateChaptersRead(entry.book_id, chaptersRead);
        setEntry(entry => ({ ...entry, chapters_read: Number.parseInt(data.chapters_read), volumes_read: Number.parseInt(data.volumes_read) }));
    }, [chaptersRead]);

    useEffect(async () => {
        // TODO
    }, [volumesRead]);

    async function onDelete() {
        await api.deleteBook(entry.book_id);
        _onDelete();
    }

    return (
        <CardElement entry={entry}>
            {!editPanel &&
                <div className={styles.details}>
                    <span className={styles.status}>
                        Current Chapter: {liveChaptersRead}
                    </span>
                    <hr />
                    <div>
                        <div className={styles.cardButtonWrap}>
                            <CardButton title="Edit Progress" icon="fas fa-feather-alt" onClick={() => setEditPanel(true)} />
                            {/* <CardButton title="More Info" icon="fas fa-fw fa-info" href={`/books/${entry.book_id}`} /> */}
                        </div>
                        <div className={styles.cardButtonWrap}>
                            <CardButton title="Increase Progress" icon="fas fa-minus" onClick={() => setChaptersRead(Math.max(0, liveChaptersRead - 1))} />
                            <CardButton title="Decrease Progress" icon="fas fa-plus" onClick={() => setChaptersRead(liveChaptersRead + 1)} />
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
                        <InputFieldNonManaged title="Volumes" inputType="number" value={liveVolumesRead} onChange={({ target }) => setVolumesRead(target.value)} maxValue="200" />
                        <InputFieldNonManaged title="Chapters" inputType="number" value={liveChaptersRead} onChange={({ target }) => setChaptersRead(target.value)} maxValue="10000" />
                        <div className={styles.cardButtonWrap}>
                            <CardButton title="Close Editing" icon="fas fa-angle-left" onClick={() => setEditPanel(false)} />
                            <CardButton title="Delete Book" icon="fas fa-trash-alt" onClick={onDelete} />
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </CardElement>
    );
}