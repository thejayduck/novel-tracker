import PageBase from "./pageBase";
import styles from '../styles/Book.module.css'
import Button from "../components/ui/button";
import { getBook } from "../lib/db";
import { motion } from "framer-motion";
import Head from "next/dist/next-server/lib/head";

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

export default function Book({ book }) {
    return (
        <PageBase>
            <Head>
                <title>Novel Tracker - {book.title}</title>

                <meta key='title' property="og:title" content={book.title} />
                <meta key='description' property="og:description" content={book.description} />
                <meta key='image' property="og:image" content={book.banner_url} />
            </Head>

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
                        <Button title="Edit Information" onClick={() => { window.alert("Edit") }} />
                        <br />
                        <Button title="Back to Library" href="/" />
                        <ul>
                            <li><a>Title (Romanized):<br /> Honzuki no Gekokujou: Shisho ni Naru Tame ni wa Shudan wo Erandeiraremasen Dai 3-bu - Ryoushu no Youjo</a></li><br />
                            <li><a>Title (Native):<br /> 本好きの下剋上~司書になるためには手段を選んでいられません~第三部「領主の養女」<hr /></a></li>
                            <li><a>Total Volumes: 10</a></li>
                            <li><a>Total Chapters: 10</a></li><br />
                            <li><a>Start Date: 2015</a></li>
                            <li><a>End Date: 2017</a></li>
                            <li><a>Release Status: Releasing<hr /></a></li>
                            <li><a>Author: John Doe</a></li>
                        </ul>
                    </div>
                    <div className={styles.info}>
                        <h1 title={book.title} className={styles.title}>{book.title}</h1>
                        <div className={styles.descriptionWrapper}>
                            <h2>Description</h2>
                            <p className={styles.description}>{book.description}</p>
                        </div>
                        <div className={styles.volumeWrapper}>
                            <h2>Volumes</h2>
                            <ul className={styles.volumeList}>
                                {/* TODO */}
                                <VolumeItem />
                                {/* TODO */}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </PageBase>
    );
}

function VolumeItem() {
    return (
        <motion.li
            className={styles.volumeItem}
        // whileHover={{ scale: 1.05 }}
        // whileTap={{ scale: 1.05 }}
        // transition={{ type: "spring", duration: 0.2 }}
        >
            <div>
                <img
                    style={{ borderRadius: "var(--border)", objectFit: "contain", height: 250 }}
                    src="https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx87383-z7hT5qLqUSY2.jpg"
                />
                <h3>Volume [1]</h3>
                <a>Chapters: 100</a>
                <br />
                <a>Extra Chapters: 100</a>
                <Button title="Start From" href="/" />
            </div>
        </ motion.li>
    );
}