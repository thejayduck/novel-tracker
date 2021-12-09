// @ts-nocheck
import styles from "styles/ModPanel.module.scss";

import React, { useEffect, useState } from "react";

import { useAlert } from "components/alertWrapper";
import PageBase from "components/pageBase";

import { useApi } from "lib/clientHelpers";
import { serverSide_checkAuth } from "lib/serverHelpers";

import SubmissionItem from "../components/pageComponents/submissionItem";

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
    <PageBase user_info={user_info}>
      <div className={`${styles.submissionList} flex flexColumn`}>
        {pendingBooks.map(pending_book => (
          <SubmissionItem key={pending_book._id} pending_book={pending_book} acceptBook={acceptBook} denyBook={denyBook} />
        ))}
      </div>
    </PageBase>
  );
}