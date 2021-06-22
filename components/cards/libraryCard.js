import styles from '../../styles/components/CardElement.module.css'
import { InputFieldNonManaged } from '../ui/inputField';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import CardElement from './cardElement';
import QuickButton from '../quickButton';

export default function LibraryCard({ entry: _entry, onDelete: _onDelete }) {

    const [editPanel, setEditPanel] = useState(false);
    const [entry, setEntry] = useState(_entry);

    async function onVolumeChange(new_value) {
        throw {
            message: "Unimplemented"
        }
    }

    async function onChapterChange(new_value) {
        if (isNaN(new_value)) {
            return;
        }

        const response = await fetch("/api/me/update_chapters_read", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                book_id: entry.book_id,
                new_chapters_read: new_value,
            }),
        });
        const json = await response.json();
        if (json.status != "OK") {
            throw json;
        }
        setEntry({ ...entry, chapters_read: Number.parseInt(json.data.chapters_read), volumes_read: Number.parseInt(json.data.volumes_read) });
    }

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
            <img className={styles.cover} src={entry?.cover_url} />
            {!editPanel &&
                <div className={styles.details}>
                    <div>
                        <span className={styles.status}>
                            Current Chapter: {entry?.chapters_read}
                        </span>
                        <hr />
                        <div className={styles.quickEdit}>
                            <div>
                                <QuickButton title="Edit Progress" icon="fas fa-feather-alt" onClick={() => setEditPanel(true)} />
                            </div>
                            <div>
                                <QuickButton title="Decrease Progress" icon="fas fa-minus" onClick={() => onChapterChange(entry.chapters_read = Math.max(0, entry.chapters_read - 1))} />
                                <QuickButton title="Increase Progress" icon="fas fa-plus" onClick={() => onChapterChange(entry.chapters_read + 1)} />
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
                        transition={{ duration: 0.05 }}
                        className={styles.details}
                        style={{ height: "88%", opacity: 1 }}
                    >
                        <div>
                            <InputFieldNonManaged title="Volumes" inputType="number" value={entry.volumes_read} onChange={({ target }) => onVolumeChange(target.value)} maxValue="200" />
                            <InputFieldNonManaged title="Chapters" inputType="number" value={entry.chapters_read} onChange={({ target }) => onChapterChange(target.value)} maxValue="10000" />
                            <hr />
                            <div className={styles.quickEdit}>
                                <div>
                                    <QuickButton title="Close Editing" icon="fas fa-angle-left" onClick={() => setEditPanel(false)} />
                                    <QuickButton title="Delete Book" icon="fas fa-trash-alt" onClick={onDelete} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </CardElement>
    );
}