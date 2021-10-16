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

  const [readingBooks, setReadingBooks] = useState<string[] | null>(null);
  const [finishedBooks, setFinishedBooks] = useState<string[] | null>(null);
  const [plannedBooks, setPlannedBooks] = useState<string[] | null>(null);
  const [droppedBooks, setDroppedBooks] = useState<string[] | null>(null);

  const [requestBooks, setRequestBooks] = useState<"Reading" | "Finished" | "Planned" | "Dropped" | null>(null);

  useEffect(async () => {
    if (!requestBooks) {
      return;
    }

    let setter;
    if (requestBooks == "Reading") {
      setter = setReadingBooks;
    } else if (requestBooks == "Finished") {
      setter = setFinishedBooks;
    } else if (requestBooks == "Planned") {
      setter = setPlannedBooks;
    } else if (requestBooks == "Dropped") {
      setter = setDroppedBooks;
    } else {
      throw new Error(`Unknown request books type ${requestBooks}`);
    }

    const data: any = await api.searchBook("", {
      tracking_status: requestBooks
    });

    setter(data);
  }, [requestBooks]);

  const [userProfile, setUserProfile] = useState<GetUserInfoResponse>(null);
  useEffect(async () => {
    if (id == undefined) {
      return;
    }
    const userProfile = await api.getUserInfo(id);
    setUserProfile(userProfile);
  }, [id]);

  // TODO add book count for each in User model
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
          {/*
              TODO jay, can you deduplicate some of this.
              Make a new component that takes a 'books' prop (we'd pass readingBooks, finishedBooks, etc)
                and have it map like we do below.
              but keep the rest of the props the same and just repass them.
          */}
          <StatisticItem title="Reading" icon="bx bx-bookmark" stat={"?? Books"} onOpenChanged={(isOpen: bool) => isOpen && setRequestBooks("Reading")}>
            {readingBooks && readingBooks.map((book: any) => <Card key={book._id} data={book} />)}
          </StatisticItem>
          <StatisticItem title="Finished" icon="bx bx-check-square" stat={"?? Books"} onOpenChanged={(isOpen) => isOpen && setRequestBooks("Finished")}>
            {finishedBooks && finishedBooks.map((book: any) => <Card key={book._id} data={book} />)}
          </StatisticItem>
          <StatisticItem title="Planning" icon="bx bx-calendar" stat={"?? Books"} onOpenChanged={(isOpen) => isOpen && setRequestBooks("Planned")}>
            {plannedBooks && plannedBooks.map((book: any) => <Card key={book._id} data={book} />)}
          </StatisticItem>
          <StatisticItem title="Dropped" icon="bx bx-trash-alt" stat={"?? Books"} onOpenChanged={(isOpen) => isOpen && setRequestBooks("Dropped")}>
            {droppedBooks && droppedBooks.map((book: any) => <Card key={book._id} data={book} />)}
          </StatisticItem>
        </section>
      </PageBase>
    </>
  );
}
