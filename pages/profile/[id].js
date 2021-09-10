import styles from 'styles/Profile.module.scss'

import { Subtitle } from "components/header";
import PageBase from "components/pageBase";
import { UserBig } from "components/userContainer";
import Head from 'next/head'
import { serverSide_checkAuth } from 'lib/serverHelpers';
import { useApi } from 'lib/clientHelpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export async function getServerSideProps(context) {
    const [redirect, info] = await serverSide_checkAuth(context, true, false, false);

    return redirect ? redirect : {
        props: {
            user_info: info,
        },
    }
}

export default function Profile({ user_info }) {
    const api = useApi();
    const router = useRouter()
    const { id } = router.query;

    const data = {
        reading_books: 20,
        finished_books: 20,
        planned_books: 20,
        dropped_books: 20,
    }

    const [userProfile, setUserProfile] = useState(null);
    useEffect(async () => {
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
                <Subtitle text="Statistics" />
                <section className={`${styles.statisticWrap} flex flexBetween`} >
                    <StatisticItem title="Reading" icon="bx bx-bookmark" stat={`${data.reading_books} Books`} />
                    <StatisticItem title="Finished" icon="bx bx-check-square" stat={`${data.finished_books} Books`} />
                    <StatisticItem title="Planning" icon="bx bx-calendar" stat={`${data.planned_books} Books`} />
                    <StatisticItem title="Dropped" icon="bx bx-trash-alt" stat={`${data.dropped_books} Books`} />
                </section>
            </PageBase>
        </>
    );
}

function StatisticItem({ icon, title, stat }) {
    return (
        <a href="#" className={`${styles.statisticItem} flex flexBetween`}>
            <div className={`flex flexRight`}>
                <i className={`${icon} fontLarger`} />
                <div className={styles.statistic}>
                    <span>{stat}</span>
                    <br />
                    <span className={`${styles.statName} fontMedium`} >{title}</span>
                </div >
            </div >
            <i className='bx bxs-down-arrow' />
        </a >
    )
}