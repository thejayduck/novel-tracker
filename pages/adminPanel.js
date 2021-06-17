import Head from 'next/head';
import AdminPanelContainer, { FormSection, DescriptionSection, VolumeFormSection } from '../components/adminPanelContainer';
import { useAppContext } from '../components/appWrapper';
import styles from '../styles/AdminPanel.module.css'

export default function AdminPanel() {
    const [state] = useAppContext();

    return (
        <main className={`${styles.main} ${state.darkMode ? styles.dark : styles.light}`} >

            <Head>
                <title>Light Novel Tracker | ADMIN PANEL </title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            </Head>

            <div className={styles.pageContent}>
                <h2 className={styles.containerTitle} > Admin Panel - Submit Book <i className="fas fa-book" /> </h2>

                <AdminPanelContainer title="Titles">
                    <FormSection title="Title* (Licensed)" inputType="text" placeHolder="Licensed English Title" />
                    <FormSection title="Title Romanized" inputType="text" placeHolder="Romaji Title" />
                    <FormSection title="Title Native" inputType="text" placeHolder="Native Title" />
                </AdminPanelContainer>

                <DescriptionSection />

                <AdminPanelContainer title="Lengths">
                    <div>
                        <FormSection title="Volumes" inputType="number" defaultValue="0" maxValue="200" />
                        <div style={{
                            display: "flex",
                            flexFlow: "row wrap",
                            justifyContent: "center"
                        }}>
                            {/* <VolumeFormSection index="Volume [1]" /> */}
                        </div>
                    </div>
                </AdminPanelContainer>

                <AdminPanelContainer title="Publication Date">
                    <FormSection title="Start Date" inputType="date" />
                    <FormSection title="End Date" inputType="date" />
                </AdminPanelContainer>

                <AdminPanelContainer title="Other">
                    <FormSection title="Author*" inputType="text" />
                    <FormSection title="Cover Url" inputType="url" />
                    <FormSection title="Banner Url" inputType="text" />
                    <FormSection title="Anilist ID" inputType="number" maxValue="1000000" />
                    <FormSection title="MAL ID" inputType="number" maxValue="1000000" />
                </AdminPanelContainer>

                <br />
                <div className={styles.submit}>
                    <a>
                        Submit
                    </a>
                    <i className="fas fa-cloud-upload-alt" />
                </div>
                <br />
            </div>
        </main>
    );
}