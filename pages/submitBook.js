import AdminPanelContainer, { FormSection, DescriptionSection, VolumeFormSection } from '../components/adminPanelContainer';
import { useAppContext } from '../components/appWrapper';
import styles from '../styles/AdminPanel.module.css';
import { parse } from 'cookie';
import { getUserInfoFromToken } from '../lib/db';

export async function getServerSideProps(context) {
    const cookie_header = context.req.headers.cookie;
    if (!cookie_header) {
        return {
            redirect: {
                permanent: false,
                destination: '/error?reason=must_login',
            },
        }
    }

    const cookies = parse(cookie_header);
    const token = cookies.token;
    const info = await getUserInfoFromToken(token);
    if (info == null) {
        return {
            redirect: {
                permanent: false,
                destination: '/error?reason=must_login',
            },
        }
    }
    if (info.moderation_level < 2) {
        return {
            redirect: {
                permanent: false,
                destination: '/error?reason=mod_only',
            },
        }
    }

    return {
        props: {
            user_info: info,
        },
    };
}

export default function SubmitBook() {
    const [state] = useAppContext();

    return (
        <main className={`${styles.main} ${state.darkMode ? styles.dark : styles.light}`} >
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