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
    return (
        <div className={styles.submissionItem}>
            <div className={styles.headerWrap}>
                <img className={styles.cover} src={pending_book.cover_url} />
                <div>
                    <h2>Submitted By: {pending_book.submitted_by}</h2>
                    <h1>{pending_book.title}</h1>
                    <p>
                        {pending_book.description}
                    </p>
                    <span>{pending_book.title_romanized}</span><br />
                    <span>{pending_book.title_native}</span><br />
                    <span>{pending_book.start_date}</span><br />
                    <span>{pending_book.end_date ? pending_book.end_date : "No End Date"}</span><br />
                    <span>{pending_book.release_status}</span><br />
                    <span>{pending_book.author}</span>
                </div>
            </div>
            <div className={styles.volumeList}>
                <VolumeItem />
            </div>
            <div className={styles.buttonWrap}>
                <Button icon="fas fa-check" text="Accept" />
                <Button icon="fas fa-times" text="Dismiss" />
            </div>
        </div>
    );
}

function VolumeItem() {
    return (
        <div className={styles.volumeItem}>
            <img className={styles.volumeCover} src="https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx110801-P0va1ehMlNcL.jpg" />
            <div>
                <span>Volume 1</span><br />
                <span>Chapter Count 20</span><br />
                <span>Extras Count 20</span>
            </div>
        </div>
    );
}