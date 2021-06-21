import PageBase from "./pageBase";
import styles from '../styles/bookInfo.module.css'
import Button from "../components/ui/button";
import { getBook } from "../lib/db";

export async function getServerSideProps(context) {
    if (!context.query.id) {
        throw {
            message: "No book id was passed"
        }
    }

    const book = await getBook(context.query.id);

    return {
        props: {
            book,
        },
    };
}

export default function BookInfo({ book }) {
    return (
        <PageBase>
            <div
                style={{
                    minHeight: "100vh",
                    height: "100%",
                    width: "100%"
                }}
            >
                <div className={styles.bannerWrapper}>
                    <img src={book.banner_url} />
                </div>
                <div className={styles.infoWrapper}>
                    <div className={styles.coverWrapper}>
                        <img className={styles.cover} src={book.cover_url} />
                        <Button title="Add Book" onClick={() => { window.alert("Add") }} />
                        <br />
                        <Button title="Edit Book" onClick={() => { window.alert("Edit") }} />
                        <br />
                        <Button title="Back to Library" href="/" />
                    </div>
                    <div className={styles.info}>
                        <h1 title={book.title} className={styles.title}>{book.title}</h1>
                        <div className={styles.descriptionWrapper}>
                            <h2>Description</h2>
                            <p className={styles.description}>{book.description}</p>
                        </div>
                        <div className={styles.volumeWrapper}>
                            <h2>Volumes</h2>
                            <div className={styles.volumeList}>
                                {/* TODO */}
                                <div>
                                    <h3>Volume [1]</h3>
                                    <a>Chapter Count: 100</a>
                                    <br />
                                    <a>Extra Chapters: 10000</a>
                                </div>
                                {/* TODO */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </PageBase>
    );
}