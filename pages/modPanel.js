import { useEffect, useState } from "react";
import PageBase from "../components/pageBase";
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
            {pendingBooks.map(pending_book => (
                <div>
                    <p>{pending_book.title}</p>
                    <p>{pending_book.submitted_by}</p>
                </div>
            ))}
        </PageBase>
    )
}