import styles from '../styles/Book.module.css'
import PageBase from "../components/pageBase";
import Button from "../components/ui/button";
import { motion } from "framer-motion";
import Head from "next/dist/next-server/lib/head";
import { createBookInfo } from "../lib/types";
import { useEffect, useState } from 'react';
import { useQueryParams } from '../lib/clientHelpers';

export default function Book() {
    const query = useQueryParams();
    const [book, setBook] = useState(null);

    useEffect(async () => {
        if (query != null) {
            const response = await fetch(`/api/get_book?id=${query.id}`);
            const json = await response.json();
            const data = createBookInfo(json.data);
            setBook(data);
        }
    }, [query]);


    function convertDate(date) {
        return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <PageBase>
            <Head>
                <title>Novel Tracker - {book ? book.title : "Loading"}</title>

                <meta key='title' property="og:title" content={book ? book.title : "Loading"} />
                <meta key='description' property="og:description" content={book ? book.description : "Loading"} />
                <meta key='image' property="og:image" content={book?.banner_url} />
            </Head>

            <div className={styles.pageWrapper}>
                <div className={styles.bannerWrapper}>
                    <img src={book?.banner_url} />
                </div>
                <div className={styles.infoWrapper}>
                    <div className={styles.coverWrapper}>
                        <img className={styles.cover} src={book?.cover_url} />
                        <Button title="Add Book" onClick={() => { window.alert("Add") }} />
                        <br />
                        <Button title="Edit Information" onClick={() => { window.alert("Edit") }} />
                        <br />
                        <Button title="Back to Library" href="/" />
                        <ul>
                            <li><a>Title (Romanized):<br />{book ? book.title_romanized : "Loading"}</a></li><br />
                            <li><a>Title (Native):<br />{book ? book.title_native : "Loading"}<hr /></a></li>
                            <li><a>Total Volumes: 10</a></li>
                            <li><a>Total Chapters: 10</a></li><br />
                            <li><a>Start Date: {book ? convertDate(book.start_date) : "Loading"}</a></li>
                            <li><a>End Date: {book ? convertDate(book.end_date) : "Loading"}</a></li>
                            <li><a>Release Status: {book ? book.release_status : "Loading"}<hr /></a></li>
                            <li><a>Author: {book ? book.author : "Loading"}</a></li>
                        </ul>
                    </div>
                    <div className={styles.info}>
                        <h1 title={book ? book.title : "Loading"} className={styles.title}>{book ? book.title : "Loading"}</h1>
                        <div className={styles.descriptionWrapper}>
                            <h2>Description</h2>
                            <p className={book ? book.description : "Loading"}>{book ? book.description : "Loading"}</p>
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
                    className={styles.volumeCover}
                    src="https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx87383-z7hT5qLqUSY2.jpg"
                />
                <h3>Volume [1]</h3>
                <a>Chapters: 100</a>
                <br />
                <a>Extra Chapters: 100</a>
                <Button title="Start From" />
            </div>
        </ motion.li>
    );
}