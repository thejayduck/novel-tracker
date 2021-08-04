import styles from "../styles/ModPanel.module.css"

import PageBase from "../components/pageBase";
import Button from "../components/ui/button";

import { useEffect, useState } from "react";
import { serverSide_checkAuth } from "../lib/serverHelpers";
import { useAlert } from "../components/alertWrapper";
import { useApi } from "../lib/clientHelpers";

export async function getServerSideProps(context) {
    const [auth, info] = await serverSide_checkAuth(context, true, true, false);
    return auth || {
        props: {
            user_info: info
        },
    };
}


export default function ModPanel({ user_info }) {
    const alert = useAlert();
    const api = useApi();

    const [pendingBooks, setPendingBooks] = useState([]);
    useEffect(async () => {
        const data = await api.getPendingBooks();
        setPendingBooks(data);
    }, []);

    const acceptBook = async (pending_book) => {
        console.log(pending_book);
        await api.acceptBook(pending_book._id);
        setPendingBooks(prev => prev.filter(book => book._id != pending_book._id));
        alert.information("Book has been accepted!");
    };
    const denyBook = async (pending_book) => {
        await api.denyBook(pending_book._id);
        setPendingBooks(prev => prev.filter(book => book._id != pending_book._id));
        alert.information("Book has been denied!");
    };

    return (
        <PageBase userInfo={user_info}>
            <div className={styles.submissionList}>
                {pendingBooks.map(pending_book => (
                    <SubmissionItem key={pending_book._id} pending_book={pending_book} acceptBook={acceptBook} denyBook={denyBook} />
                ))}
            </div>
        </PageBase>
    )
}

function SubmissionItem({ pending_book, acceptBook, denyBook }) {
    function convertDate(date) {
        if (date) {
            return new Date(date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
        } else {
            return "Unknown";
        }
    }

    return (
        <div className={styles.submissionItem}>
            <div className={styles.headerWrap}>
                <div className={styles.coverWrap}>
                    <img className={styles.cover} src={pending_book.banner_url} />
                    <img className={styles.cover} src={pending_book.cover_url} />
                </div>
                <div className={styles.submissionDetails}>
                    <h2>Submitted By: {pending_book.submitted_by}</h2>
                    <h1>{pending_book.title}</h1>
                    <br />
                    <span>Title Romanized: {pending_book.title_romanized}</span><br />
                    <span>Title Native: {pending_book.title_native}</span><br />
                    <span>Start Date: {convertDate(pending_book.start_date)}</span><br />
                    <span>End Date: {pending_book.end_date ? convertDate(pending_book.end_date) : "Unknown"}</span><br />
                    <span>Status: {pending_book.release_status}</span><br />
                    <span>Author: {pending_book.author}</span>
                    <hr />
                    <h2>Description</h2>
                    <p className={styles.description} >{pending_book.description}</p>
                </div>
            </div>
            <ul className={styles.volumeList}>
                <VolumeItem />
            </ul>
            <div className={styles.buttonWrap}>
                <Button icon="fas fa-fw fa-check" text="Accept" onClick={() => acceptBook(pending_book)} />
                <Button icon="fas fa-fw fa-times" text="Dismiss" onClick={() => denyBook(pending_book)} />
            </div>
        </div>
    );
}

function VolumeItem() {
    return (
        <li className={styles.volumeItem}>
            <img className={styles.volumeCover} src="https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx110801-P0va1ehMlNcL.jpg" />
            <div className={styles.volumeInfo}>
                <span>Volume 1</span><br />
                <span>Chapters: 20</span><br />
                <span>Extras: 20</span>
            </div>
        </li>
    );
}