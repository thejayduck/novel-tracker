// @ts-nocheck
import styles from "styles/Book.module.scss";

import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";

import React, { useEffect, useState } from "react";

import convertDate from "components/helper/convertData";
import { DesktopOverlay, MobileOverlay } from "components/overlayMenu";
import PageBase from "components/pageBase";
import { Subtitle } from "components/subtitle";
import { NavigationButton } from "components/ui/button";

import { GetBookResponse, useApi } from "lib/clientHelpers";
import { serverSide_checkAuth } from "lib/serverHelpers";

const VolumeCard = dynamic(() => import("components/cards/card"));

export async function getServerSideProps(context) {
  const [redirect, info] = await serverSide_checkAuth(context, false, false, false);

  return redirect ? redirect : {
    props: {
      user_info: info,
    },
  };
}

export default function Book({ user_info }) {
  const router = useRouter();
  const { id } = router.query;
  const [onOverlayOpen, setOnOverlayOpen] = useState(false);

  const api = useApi();
  const [book, setBook] = useState<GetBookResponse | null>(null);
  useEffect((async () => {
    if (id == undefined) {
      return;
    }
    const api_book = await api.getBook(id);
    setBook(api_book);
  }) as any, [id]);

  return (
    <>
      <Head>
        <title>{book?.title_english || "Book"} · Novel Tracker</title>
      </Head>
      <PageBase user_info={user_info}>

        <section className={`${styles.headerWrap} flex flexColumn`}>
          <img className={`${styles.background} skeleton`} src={book?.banner_url} />
          <div>
            <img className="skeleton" width={200} height={300} src={book?.cover_url} />
            <NavigationButton text="Add to Library" icon="bx bx-list-plus bx-sm" onClick={() => setOnOverlayOpen(prev => !prev)} />
          </div>
          <h1>{book?.title_english || "Loading..."}</h1>
          <span className="fontSmall">{book?.title_romanized || "Loading..."}</span>
          <span className="fontSmall">{book?.title_native || "Loading..."}</span>
        </section>
        <section className={`${styles.detailsWrap}`}>
          <Subtitle text="About" />
          <div className={`${styles.details} flex`}>
            <DetailItem title="Author" value={book?.author || "Loading..."} />
            <DetailItem title="Volumes" value={book?.volumes.length || "Loading..."} />
            <DetailItem
              title="Chapters"
              value={book && book.volumes.reduce((acc, volume) => {
                return acc + volume.chapters;
              }, 0)}
            />
            <DetailItem title="Status" value="Finished" />
            <DetailItem title="Start Date" value={convertDate(book?.start_date)} />
            <DetailItem title="End Date" value={convertDate(book?.end_date)} />
          </div>
          <p>{book?.description || "Loading..."}</p>
          <Subtitle text={`Volumes [${book?.volumes.length}]`} />
          <div className={`${styles.volumeList} flex`}>
            {book && book.volumes.map(volume => (<VolumeCard key={volume.cover_url} data={volume} />))}
          </div>
        </section>

        <AnimatePresence>
          {onOverlayOpen &&
            <DesktopOverlay title={"Add Book As"} className={styles.addOverlay} flexDirection="flexColumn">
              <NavigationButton icon="bx bx-bookmark bx-sm" text="Reading" />
              <NavigationButton icon="bx bx-calendar bx-sm" text="Planning" />
              <NavigationButton icon="bx bx-check-square bx-sm" text="Finished" />
              <NavigationButton icon="bx bx-trash-alt bx-sm" text="Dropped" />
            </DesktopOverlay>
          }
        </AnimatePresence>

        <AnimatePresence>
          {onOverlayOpen &&
            <MobileOverlay title={"Add Book As"} onOutSideClick={() => setOnOverlayOpen(false)}>
              <NavigationButton icon="bx bx-bookmark bx-sm" text="Reading" />
              <NavigationButton icon="bx bx-calendar bx-sm" text="Planning" />
              <NavigationButton icon="bx bx-check-square bx-sm" text="Finished" />
              <NavigationButton icon="bx bx-trash-alt bx-sm" text="Dropped" />
            </MobileOverlay>
          }
        </AnimatePresence>

      </PageBase>
    </>
  );
}

function DetailItem({ title, value }) {
  return (
    <div className={`${styles.detailItem}`}>
      <h3>{title}</h3>
      <span>{value}</span>
    </div>
  );
}