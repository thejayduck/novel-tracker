    // @ts-nocheck
import styles from "styles/Profile.module.scss";

import Head from "next/head";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

import React, { useEffect, useState } from "react";

import VolumeCard from "components/cards/volumeCard";
import PageBase from "components/pageBase";
import { Subtitle } from "components/subtitle";
import { UserBig } from "components/userContainer";

import { GetUserInfoResponse, useApi } from "lib/clientHelpers";
import { serverSide_checkAuth } from "lib/serverHelpers";

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
                    <StatisticItem title="Reading" icon="bx bx-bookmark" stat={`${data.reading_books} Books`} />
                    <StatisticItem title="Finished" icon="bx bx-check-square" stat={`${data.finished_books} Books`} />
                    <StatisticItem title="Planning" icon="bx bx-calendar" stat={`${data.planned_books} Books`} />
                    <StatisticItem title="Dropped" icon="bx bx-trash-alt" stat={`${data.dropped_books} Books`} />
                </section>
            </PageBase>
        </>
    );
}

function StatisticItem({ icon, title, stat, children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <a className={`${styles.statisticItem} flex flexBetween`} onClick={() => setIsOpen(prev => !prev)}>
                <div className={"flex flexRight"}>
                    <i className={`${icon} fontLarger`} />
                    <div className={styles.statistic}>
                        <span>{stat}</span>
                        <br />
                        <span className={`${styles.statName} fontMedium`} >{title}</span>
                    </div >
                </div >
                <motion.i
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className='bx bxs-down-arrow' 
                />
            </a>
            <AnimatePresence>
                {isOpen &&
                    <motion.div
                        className={`flex ${styles.bookContainer}`}
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "max-content"}}
                        exit={{opacity: 0, height: 0}}
                        transition={{stiffness: 100}}
                    >
                        { children }
                    </motion.div>
                }
            </AnimatePresence>
        </>
    );
}