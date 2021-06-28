import styles from '../../styles/Book.module.css'
import PageBase from "../../components/pageBase";
import Button, { CardButton } from "../../components/ui/button";
import Head from "next/dist/next-server/lib/head";
import { getBookWithVolumes } from "../../lib/db";
import { motion } from "framer-motion";
import { serverSide_checkAuth } from '../../lib/serverHelpers';

export async function getServerSideProps(context) {
    const [auth, info] = await serverSide_checkAuth(context, false, false, false);

    if (!context.query.id) {
        throw {
            message: "No book id was passed"
        }
    }
    const book = await getBookWithVolumes(context.query.id);

    return auth || {
        props: {
            book,
            user_info: info,
        },
    };
}

export default function Book({ book, user_info }) {
    function convertDate(date) {
        if (date) {
            return new Date(date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
        } else {
            return "Unknown";
        }
    }

    return (
        <PageBase userInfo={user_info}>
            <Head>
                <title>Novel Tracker - {book.title}</title>

                {/* _book must be used because book is loaded via javascript */}
                <meta key='title' property="og:title" content={book.title} />
                <meta key='description' property="og:description" content={book.description} />
                <meta key='image' property="og:image" content={book.banner_url} />
                <meta key='card' name="twitter:card" content="summary_large_image" />

            </Head>

            <div>
                <div className={styles.infoWrap}>
                    <div className={styles.coverWrap}>
                        <img className={styles.cover} src={book.cover_url} />
                        {user_info && <Button text="Add Book" onClick={() => { window.alert("Add") }} />}
                        <br />
                        {user_info && <Button text="Edit Information" href={`/submitBook?id=${book.book_id}`} />}
                        <br />
                        <Button text="Back to Library" href="/" />
                        <ul className={styles.info}>
                            <li><span>Title (Romanized):<br />{book.title_romanized}</span></li>
                            <li><span>Title (Native):<br />{book.title_native}</span></li>
                            <hr />
                            <li><span>Total Volumes: 10</span></li>
                            <li><span>Total Chapters: 10</span></li><br />
                            <li><span>Start Date: {convertDate(book.start_date)}</span></li>
                            <li><span>End Date: {convertDate(book.end_date)}</span></li>
                            <li><span>Release Status: {book.release_status}</span></li>
                            <hr />
                            <li><span>Author: {book.author}</span></li>
                        </ul>
                    </div>
                    <div className={styles.contentContainer}>
                        <div className={styles.descriptionWrap}>
                            <h1 className={styles.title} title={book.title}>{book.title}</h1>
                            <h2 className={styles.descriptionTitle}>Description</h2>
                            <p className={styles.description}>{book.description}</p>
                        </div>
                        <div className={styles.volumeWrap}>
                            <h2>Volumes</h2>
                            <ul className={styles.volumeList}>
                                {book.volumes.map(volume => (
                                    <VolumeItem key={volume.volume_number} volume={volume} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </PageBase>
    );
}

function VolumeItem({ volume }) {
    return (
        <li className={styles.volumeItem}>
            <div>
                <p>Volume {volume.volume_number}</p>
                <img
                    className={styles.volumeCover}
                    src={volume.cover_url || "https://i.imgur.com/MgqRa43.jpg"}
                />
            </div>
            <div className={styles.volumeDetailsWrap}>
                <br />
                <h2>Chapters: {volume.chapter_count}</h2>
                <h2>Extras: {volume.extra_chapter_count}</h2>
                <div className={styles.volumeButton}>
                    <Button text="Start From" />
                </div>
            </div>
        </li>
    );
}