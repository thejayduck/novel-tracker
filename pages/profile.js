import styles from '@styles/Profile.module.scss'

import { Subtitle } from "@components/header";
import PageBase from "@components/pageBase";
import { UserBig } from "@components/userContainer";
import Head from 'next/head'

export default function Profile({ data }) {

    data = {
        reading_books: 3,
        finished_books: 20,
        planned_books: 13,
        dropped_books: 0,
        username: "TheJayDuck"
    }

    return (
        <>
            <Head>
                <title>{data.username} · Novel Tracker</title>
            </Head>

            <PageBase>
                <section className="flex flexRight" >
                    <UserBig />
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