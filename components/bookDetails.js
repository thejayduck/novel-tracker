import styles from '../styles/BookDetails.module.css'
import OverlayMenu from './overlayMenu';
import Button from './ui/button';

import { useAppContext } from './appWrapper';
import { useEffect, useState } from 'react';

export default function BookDetails({ book, onExit, onAddClicked, onOutsideClicked }) {
    const [state] = useAppContext();

    async function addBook() {
        const response = await fetch("/api/me/add_book", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                book_id: book.book_id,
            }),
        });
        const json = await response.json();
        if (json.status != "OK") {
            throw json;
        }

        onAddClicked();
    }

    return (
        <div>
            <OverlayMenu
                className={`${styles.container} ${state.darkMode ? styles.dark : styles.light}`}
                close={onOutsideClicked}
            >
                <div className={styles.infoWrapper}>
                    <div className={styles.banner}>
                        <img src={book.banner_url} />
                    </div>
                    <div className={styles.coverWrapper}>
                        <img className={styles.cover} src={book.cover_url} />
                        <Button title="Add Book" onClick={() => addBook()} />
                        <br />
                        <Button title="Edit Book" href={`/submitBook?id=${book.id}`} />
                    </div>
                    <div className={styles.info}>
                        <h1 title={book.title} className={styles.title}> {book.title} </h1>
                        <ul>
                            <li><a>Title (Romanized): {book.title_romanized}</a></li>
                            <li><a>Title (Native): {book.title_native}<hr /></a></li>
                            <li><a>Total Volumes: 10</a></li>
                            <li><a>Total Chapters: 10<hr /></a></li>
                            <li><a>Author: {book.author}</a></li>
                        </ul>
                    </div>
                </div>
                <br />
                {book.description &&
                    <div className={styles.descriptionWrapper}>
                        <h2>Description</h2>
                        <p className={styles.description}>{book.description}</p>
                    </div>
                }
                <Button title="Exit" onClick={() => onExit()} />
            </OverlayMenu>
        </div>
    );
}