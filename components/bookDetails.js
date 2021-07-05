import styles from '../styles/BookDetails.module.css'
import OverlayMenu from './overlayMenu';
import Button from './ui/button';

import { useAppContext } from './appWrapper';
import { useApi } from '../lib/clientHelpers';
import { useAlert } from './alertWrapper';

export default function BookDetails({ book, onExit, onAddClicked, onOutsideClicked, userInfo }) {
    const [state] = useAppContext();
    const api = useApi();
    const alert = useAlert();

    async function addBook() {
        await api.addBook(book.book_id, () => {
            alert.information("Added Book!");
        });
        onAddClicked();
    }

    return (
        <OverlayMenu
            className={`${styles.container}`}
            close={onOutsideClicked}
        >
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
            <div className={styles.buttonWrap}>
                {userInfo &&
                    <>
                        <Button text="Add" onClick={() => addBook()} />
                        <br />
                        <Button text="Edit" href={`/submitBook?id=${book.book_id}`} />
                        <br />
                    </>
                }
                <Button text="More" href={`/books/${book.book_id}`} />
                <br />
                <Button text="Close" onClick={() => onExit()} />
            </div>
        </OverlayMenu>
    );
}