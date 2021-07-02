import styles from '../styles/BookDetails.module.css'
import OverlayMenu from './overlayMenu';
import Button from './ui/button';

import { useAppContext } from './appWrapper';

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
                <div>
                    <div className={styles.headerWrap}>
                        <img className={styles.banner} src={book.banner_url ? book.banner_url : book.cover_url} />
                        <div className={styles.header}>
                            <div className={styles.coverWrapper}>
                                <img className={styles.cover} src={book.cover_url} />
                                <br />

                            </div>
                            <div className={styles.titleWrapper}>
                                <ul className={styles.detailList}>
                                    <h2 className={styles.title} title={book.title}> {book.title} </h2>
                                    <li><span>Title (Romanized): {book.title_romanized}</span></li>
                                    <li><span>Title (Native): {book.title_native}<hr /></span></li>
                                    <li><span>Total Volumes: 10</span></li>
                                    <li><span>Total Chapters: 10<hr /></span></li>
                                    <li><span>Author: {book.author}</span></li>
                                </ul>
                            </div>
                        </div>
                        {book.description &&
                            <div className={styles.descriptionWrap}>
                                <h2>Description</h2>
                                <p className={styles.description}>{book.description}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.buttonWrap}>
                    <Button text="Add" onClick={() => addBook()} />
                    <br />
                    <Button text="Edit" href={`/submitBook?id=${book.book_id}`} />
                    <br />
                    <Button text="More" href={`/books/${book.book_id}`} />
                    <br />
                    <Button text="Close" onClick={() => onExit()} />
                </div>
            </OverlayMenu>
        </div>
    );
}