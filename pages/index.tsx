// @ts-nocheck
import styles from "styles/Home.module.scss";

import dynamic from "next/dynamic";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";

import React, { useState } from "react";

// Components
import PageBase from "components/pageBase";
import { Subtitle } from "components/subtitle";

import { serverSide_checkAuth } from "lib/serverHelpers";


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
        <div className="flex flexColumn">
          <Section title="Reading [20]" icon="bx bx-book-open" />
          <Section title="Planning [20]" icon="bx bx-bookmarks" />
          <Section title="Finished [20]" icon="bx bx-check" />
          <Section title="Dropped [20]" icon="bx bx-trash-alt" />
        </div>
      </PageBase>
    </>
  );
}

function Section({ icon, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const book_ids = [];

  return (
    <motion.div onClick={() => setIsOpen(prev => !prev)} className={`${styles.sectionItem} flex flexColumn`}>
      <Subtitle text={title} icon={icon} />
      <AnimatePresence>
        {isOpen &&
          <motion.div
            className={`${styles.sectionItemList} flex flexRow`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "max-content", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}

            transition={{ duration: 0.5 }}
          >
            <BookCard />
            {
              book_ids.map(book_id => (
                <BookCard key={book_id} book_id={book_id} />
              ))
            }
          </motion.div>
        }
      </AnimatePresence>
    </motion.div>
  );
}