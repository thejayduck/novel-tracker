import styles from '../styles/SubmitBook.module.css';
import SubmitBookContainer, { FormSection, DescriptionSection, VolumeFormSection } from '../components/submitBookContainer';
import { parse } from 'cookie';
import { getUserInfoFromId, withUserId } from '../lib/db';
import PageBase from './pageBase';

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
    const info = await withUserId(token, async (user_id) => await getUserInfoFromId(user_id));
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
    return (
        <PageBase>
            <div className={styles.pageContent}>
                <h2 className={styles.containerTitle} >Submit Book <i className="fas fa-feather-alt" /></h2>

                <SubmitBookContainer title="Titles">
                    <FormSection title="Title* (Licensed)" inputType="text" placeHolder="Licensed English Title" />
                    <FormSection title="Title Romanized" inputType="text" placeHolder="Romaji Title" />
                    <FormSection title="Title Native" inputType="text" placeHolder="Native Title" />
                </SubmitBookContainer>

                <DescriptionSection />

                <SubmitBookContainer title="Lengths">
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
                </SubmitBookContainer>

                <SubmitBookContainer title="Publication Date">
                    <FormSection title="Start Date" inputType="date" />
                    <FormSection title="End Date" inputType="date" />
                </SubmitBookContainer>

                <SubmitBookContainer title="Other">
                    <FormSection title="Author*" inputType="text" />
                    <FormSection title="Cover Url" inputType="url" />
                    <FormSection title="Banner Url" inputType="text" />
                    <FormSection title="Anilist ID" inputType="number" maxValue="1000000" />
                    <FormSection title="MAL ID" inputType="number" maxValue="1000000" />
                </SubmitBookContainer>

                <br />
                <div className={styles.submit}>
                    <a>
                        Submit
                    </a>
                    <i className="fas fa-cloud-upload-alt" />
                </div>
                <br />
            </div>
        </PageBase>
    );
}