import styles from "../styles/ModPanel.module.css"

import PageBase from "../components/pageBase";
import Button from "../components/ui/button";

import { useEffect, useState } from "react";
import { serverSide_checkAuth } from "../lib/serverHelpers";

export async function getServerSideProps(context) {
    const [auth, info] = await serverSide_checkAuth(context, true, true, false);
    return auth || {
        props: {
            user_info: info
        },
    };
}


export default function ModPanel({ user_info }) {
    const [pendingBooks, setPendingBooks] = useState([]);
    useEffect(async () => {
        const response = await fetch("/api/me/get_pending_books");
        const json = await response.json();
        setPendingBooks(json.data);
    }, []);

    return (
        <PageBase userInfo={user_info}>
            <div className={styles.pageContent}>
                <div className={styles.submissionList}>
                    {/* <SubmissionItem /> */}
                    {pendingBooks.map(pending_book => (
                        <SubmissionItem pending_book={pending_book} />
                    ))}
                </div>
            </div>
        </PageBase>
    )
}

function SubmissionItem({ pending_book }) {
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
                <div>
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
                    <p>{pending_book.description}</p>
                </div>
            </div>
            <div className={styles.volumeList}>
                <VolumeItem />
            </div>
            <div className={styles.buttonWrap}>
                <Button icon="fas fa-check" text="Accept" onClick={() => window.alert("Accepted Book Submission")} />
                <Button icon="fas fa-times" text="Dismiss" onClick={() => window.alert("Dismissed Book Submission")} />
            </div>
        </div>
    );
}

function VolumeItem() {
    return (
        <div className={styles.volumeItem}>
            <img className={styles.volumeCover} src="https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx110801-P0va1ehMlNcL.jpg" />
            <div className={styles.volumeInfo}>
                <span>Volume 1</span><br />
                <span>Chapters: 20</span><br />
                <span>Extras: 20</span>
            </div>
        </div>
    );
}