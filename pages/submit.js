import styles from '@styles/SubmitPage.module.scss'

// Components
import PageBase from '@components/pageBase';
import { InputField } from '@components/ui/inputField';
import { Subtitle } from '@components/header';

const data = {
    title: "That Mysterious Transfer Student Molests People On The Train, Because My Imouto Is A Lovecraftian Horror!",
    image: "http://source.unsplash.com/200x300/?nature"
}

export default function SubmitPage() {
    return (
        <PageBase>
            <section className={styles.section}>
                <Subtitle text="Titles" />

                <div className={styles.sectionContainer}>
                    <InputField title="Native" />
                    <InputField title="Romanized" />
                    <InputField toolTip="Licensed only! Fan translated titles are NOT allowed." title="English" />
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
                    <div className="flex">
                        <InputField title="Author Name" />
                        <InputField title="Status" placeHolder="TODO: option select" />
                    </div>
                    <div className="flex">
                        <InputField title="Start Date" inputType="date" />
                        <InputField title="End Date" inputType="date" />
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <Subtitle text="Volumes (5)" />
                <ul className={`${styles.sectionContainer} ${styles.volumeList} flex`}>
                    <VolumeItem data={data} />
                    <VolumeItem data={data} />
                    <VolumeItem data={data} />
                    <VolumeItem data={data} />
                    <VolumeItem data={data} />
                    <a title="New Volume" className={`${styles.volumeItem} ${styles.placeholder} flex flexAround`}>
                        <i className="bx bx-plus bx-md" />

                    </a>
                </ul>
            </section>
        </PageBase>
    )
}

function VolumeItem({ data }) {
    return (
        <li className={styles.volumeItem}>
            <div className={`flex flexColumn ${styles.book}`}>
                <img className="skeleton" width={200} height={300} src={data.image} />
                <div className={`${styles.volumeDetails}`}>
                    <InputField placeHolder="Image URL" inputType="url" />
                    {/* <InputField placeHolder="Volume" inputType="number" maxValue="99" /> */}
                    <InputField placeHolder="Chapters" inputType="number" maxValue="999" />
                </div>
            </div>
        </li>
    )
}