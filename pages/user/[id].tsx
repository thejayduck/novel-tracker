// @ts-nocheck
import styles from "styles/Profile.module.scss";

import Head from "next/head";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

import Card from "components/cards/card";
import PageBase from "components/pageBase";
import { Subtitle } from "components/subtitle";
import { UserBig } from "components/userBig";

import { GetUserInfoResponse, useApi } from "lib/clientHelpers";
import { serverSide_checkAuth } from "lib/serverHelpers";

import { StatisticItem } from "./statisticItem";

export async function getServerSideProps(context) {
  const [redirect, info] = await serverSide_checkAuth(context, false, false, false);

  return redirect ? redirect : {
    props: {
      user_info: info,
    },
  };
}

export default function Profile({ user_info }) {
  const api = useApi();
  const router = useRouter();
  const { id } = router.query;

  const data = {
    reading_books: 20,
    finished_books: 20,
    planned_books: 20,
    dropped_books: 20,
  };

  const [userProfile, setUserProfile] = useState<GetUserInfoResponse>(null);
  useEffect(async () => {
    if (id == undefined) {
      return;
    }
    const userProfile = await api.getUserInfo(id);
    setUserProfile(userProfile);
  });

  const [readingBooks, setReadingBooks] = useState();

  return (
    <>
      <Head>
        <title>{userProfile ? userProfile.username : "Loading..."} · Novel Tracker</title>
      </Head>

      <PageBase user_info={user_info}>
        <section className="flex flexRight" >
          <UserBig userProfile={userProfile} />
        </section>
        <Subtitle text="Library" />
        <section className={`${styles.statisticWrap} flex flexBetween flexColumn`} >
          <StatisticItem title="Reading" icon="bx bx-bookmark" stat={`${data.reading_books} Books`} onOpenChanged={async (isOpen) => {
            if (isOpen) {
              const books = await api.searchBook("", { mine: true, tracking_status: "Reading" });
              setReadingBooks(books);
            } else {
              setReadingBooks([]);
            }
          }}>
            {readingBooks && readingBooks.map((book: any) => <Card key={book._id} data={book} />)}
          </StatisticItem>
          <StatisticItem title="Finished" icon="bx bx-check-square" stat={`${data.finished_books} Books`} />
          <StatisticItem title="Planning" icon="bx bx-calendar" stat={`${data.planned_books} Books`} />
          <StatisticItem title="Dropped" icon="bx bx-trash-alt" stat={`${data.dropped_books} Books`} />
        </section>
      </PageBase>
    </>
  );
}

