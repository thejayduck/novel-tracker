import styles from "styles/ModPanel.module.scss";

import React from "react";

import Card from "components/cards/card";
import convertDate from "components/helper/convertDate";
import { Subtitle } from "components/subtitle";
import { NavigationButton } from "components/ui/button";

export default function SubmissionItem({ pending_book, acceptBook, denyBook }) {
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
        <p className={styles.description}>{pending_book.description}</p>
      </div>
      <Subtitle text="Volumes" />
      <ul className={`${styles.volumeList} flex flexRow flexRight`}>
        {pending_book.volumes.map(volume => (
          <Card key={volume._id} data={volume} />
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
