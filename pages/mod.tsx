// @ts-nocheck
import styles from "styles/ModPanel.module.scss";

import React, { useEffect, useState } from "react";

import { useAlert } from "components/alertWrapper";
import VolumeCard from "components/cards/volumeCard";
import convertDate from "components/helper/convertData";
import PageBase from "components/pageBase";
import { Subtitle } from "components/subtitle";
import { NavigationButton } from "components/ui/button";

import { useApi } from "lib/clientHelpers";
import { serverSide_checkAuth } from "lib/serverHelpers";

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
    <PageBase user_info={user_info}>
      <div className={`${styles.submissionList} flex flexColumn`}>
        {pendingBooks.map(pending_book => (
          <SubmissionItem key={pending_book._id} pending_book={pending_book} acceptBook={acceptBook} denyBook={denyBook} />
        ))}
      </div>
    </PageBase>
  );
}

function SubmissionItem({ pending_book, acceptBook, denyBook }) {
  return (
    <div className={styles.submissionItem}>
      <div className={styles.submissionDetails}>
        <h2>Submission By: {pending_book.submitted_by}</h2>
        <h1>{pending_book.title}</h1>
        <br />
        <span>Title Romanized: {pending_book.title_romanized}</span><br />
        <span>Title Native: {pending_book.title_native}</span><br />
        <span>Start Date: {convertDate(pending_book.start_date)}</span><br />
        <span>End Date: {pending_book.end_date ? convertDate(pending_book.end_date) : "Unknown"}</span><br />
        <span>Genre: {pending_book.release_status}</span><br />
        <span>Status: {pending_book.release_status}</span><br />
        <span>Author: {pending_book.author}</span>
        <Subtitle text="Description" />
        <p className={styles.description} >{pending_book.description}</p>
      </div>
      <Subtitle text="Volumes" />
      <ul className={`${styles.volumeList} flex flexRow flexRight`}>
        {pending_book.volumes.map(volume => (
          <VolumeCard key={volume._id} data={volume} />
        ))}
      </ul>
      <Subtitle text="Actions" />
      <div className={`${styles.buttonWrap} flex`}>
        <NavigationButton icon="bx bx-check bx-sm" text="Accept" onClick={() => acceptBook(pending_book)} />
        <NavigationButton icon="bx bx-x bx-sm" text="Dismiss" onClick={() => denyBook(pending_book)} />
      </div>
    </div>
  );
}