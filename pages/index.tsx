// @ts-nocheck
import styles from "styles/Home.module.scss";

import dynamic from "next/dynamic";
import Head from "next/head";

import React from "react";

// Components
import PageBase from "components/pageBase";
import { Subtitle } from "components/subtitle";

import { serverSide_checkAuth, serverSide_checkAuth } from "lib/serverHelpers";


const BookCard = dynamic(() => import("../components/cards/volumeCard"));

export async function getServerSideProps(context) {
  const [redirect, info] = await serverSide_checkAuth(context, true, false, false);

  return redirect || {
    props: {
      user_info: info,
    },
  };
}

export default function Home({ user_info }) {
  return (
    <>
      <Head>
        <title>Library · Novel Tracker</title>
      </Head>
      <PageBase user_info={user_info}>
        <Section title="Reading" icon="bx bx-book-open" />
        <Section title="Planning" icon="bx bx-bookmarks" />
        <Section title="Finished" icon="bx bx-check" />
        <Section title="Dropped" icon="bx bx-trash-alt" />
      </PageBase>
    </>
  );
}

function Section({ title, icon }) {
  const book_ids = [];
  return (
    <section className={styles.section}>
      <Subtitle text={title} icon={icon} />
      <div className={`${styles.sectionContainer} flex`} >
        {
          book_ids.map(book_id => (
            <BookCard key={book_id} book_id={book_id} />
          ))
        }
      </div>
    </section>
  );
}