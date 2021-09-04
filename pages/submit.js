import styles from '@styles/SubmitPage.module.scss'

import PageBase from '@components/pageBase';
import { InputField } from '@components/ui/inputField';
import { Subtitle } from '@components/header';


export default function SubmitPage() {
    return (
        <PageBase>
            <section className={styles.section}>
                <Subtitle text="Titles" />

                <div className={styles.sectionContainer}>
                    <InputField title="Native" />
                    <InputField title="Romanized" />
                    <InputField toolTip="Licensed Only! Fan translated titles are NOT allowed." title="English" />
                </div>
            </section>

            <section className={styles.section}>
                <Subtitle text="Description" />
                <div className={styles.sectionContainer}>
                    <textarea rows={15} wrap="soft" />
                </div>
            </section>

            <section className={styles.section}>
                <Subtitle text="Other" />
                <div className={styles.sectionContainer}>
                    <InputField title="Author Name" />
                    <InputField title="Status" placeHolder="TODO: option select" />
                    <InputField title="Start Date" inputType="date" />
                    <InputField title="End Date" inputType="date" />
                </div>
            </section>

            <section className={styles.section}>
                <Subtitle text="Volumes" />
                <ul className={`${styles.sectionContainer} ${styles.volumeList} flex`}>
                    <VolumeItem data={data} />
                    <VolumeItem data={data} />
                    <VolumeItem data={data} />
                    <VolumeItem data={data} />
                    <VolumeItem data={data} />
                </ul>
            </section>
        </PageBase>
    )
}

const data = {
    title: "That Mysterious Transfer Student Molests People On The Train, Because My Imouto Is A Lovecraftian Horror!",
    image: "http://source.unsplash.com/200x300/?nature"
}


function VolumeItem({ data }) {
    return (
        <li className={styles.volumeItem}>
            <div className={`flex flexColumn ${styles.book}`}>
                <img className="skeleton" width={200} height={300} src={data.image} />
                <div className={`${styles.volumeDetails}`}>
                    <InputField title="Image URL" />
                    <InputField title="Volume" />
                    <InputField title="Chapters" />
                </div>
            </div>
        </li>
    )
}