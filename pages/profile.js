import styles from '../styles/Profile.module.scss'

import { Subtitle } from "../components/header";
import PageBase from "../components/pageBase";
import { UserBig } from "../components/userContainer";

export default function Profile() {
    return (
        <PageBase>
            <section className="flex flexRight" >
                <UserBig />
            </section>
            <Subtitle text="Statistics" />
            <section className={`${styles.statisticWrap} flex flexBetween`} >
                <StatisticItem title="Reading" icon="bx bx-bookmark" statName="2 Books" />
                <StatisticItem title="Finished" icon="bx bx-check-square" statName="20 Books" />
                <StatisticItem title="Planning" icon="bx bx-calendar" statName="30 Books" />
            </section>
        </PageBase>
    );
}

function StatisticItem({ icon, title, statName }) {
    return (
        <a href="#" className={`${styles.statisticItem} flex flexBetween`}>
            <div className={`flex flexRight`}>
                <i className={`${icon} fontLarger`} />
                <div className={styles.statistic}>
                    <span>{statName}</span>
                    <br />
                    <span className={`${styles.statName} fontMedium`} >{title}</span>
                </div >
            </div >
            <i className='bx bxs-down-arrow' />
        </a >
    )
}