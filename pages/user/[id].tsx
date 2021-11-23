// @ts-nocheck
import styles from "styles/Profile.module.scss";

import Head from "next/head";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

import PageBase from "components/pageBase";
import { Subtitle } from "components/subtitle";
import { UserBig } from "components/userBig";

import { GetUserInfoResponse, useApi } from "lib/clientHelpers";
import { serverSide_checkAuth } from "lib/serverHelpers";

import StatisticItem from "../../components/pageComponents/statisticItem";

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

    let setter: (data: string[]) => void;
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
      tracking_status: requestBooks,
      userId: id,
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
          <StatisticItem
            data={readingBooks}
            title="Reading"
            icon="bx bx-bookmark"
            stat={`${user_info.count_reading_books} Books`}
            onOpenChanged={(isOpen: bool) => isOpen && setRequestBooks("Reading")}
          />
          <StatisticItem
            data={finishedBooks}
            title="Finished"
            icon="bx bx-check-square"
            stat={`${user_info.count_finished_books} Books`}
            onOpenChanged={(isOpen) => isOpen && setRequestBooks("Finished")}
          />
          <StatisticItem
            data={plannedBooks}
            title="Planning"
            icon="bx bx-calendar"
            stat={`${user_info.count_planning_books} Books`}
            onOpenChanged={(isOpen) => isOpen && setRequestBooks("Planned")}
          />
          <StatisticItem
            data={droppedBooks}
            title="Dropped"
            icon="bx bx-trash-alt"
            stat={`${user_info.count_dropped_books} Books`}
            onOpenChanged={(isOpen: bool) => isOpen && setRequestBooks("Dropped")}
          />
        </section>
      </PageBase>
    </>
  );
}
