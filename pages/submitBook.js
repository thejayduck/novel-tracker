import styles from '../styles/SubmitBook.module.css';
import InputField, { OptionSelect } from '../components/ui/inputField';
import SubmitBookContainer, { DescriptionSection, VolumeFormSection } from '../components/submitBookContainer';
import { parse } from 'cookie';
import { getUserInfoFromId, withUserId } from '../lib/db';
import { FloatingButton } from '../components/ui/button';
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
                    <InputField title="Title (Licensed*)" inputType="text" placeHolder="Licensed English Title" />
                    <InputField title="Title Romanized" inputType="text" placeHolder="Romaji Title" />
                    <InputField title="Title Native" inputType="text" placeHolder="Native Title" />
                </SubmitBookContainer>

                <DescriptionSection />

                <SubmitBookContainer title="Lengths">
                    <div>
                        <InputField title="Volumes" inputType="number" defaultValue="0" maxValue="200" />
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
                    <InputField title="Start Date" inputType="date" />
                    <InputField title="End Date" inputType="date" />
                    <OptionSelect title="Release Status" options={['Finished', 'Releasing', 'Cancelled', 'Hiatus']} />
                </SubmitBookContainer>

                <SubmitBookContainer title="Other">
                    <InputField title="Author*" inputType="text" />
                    <InputField title="Cover Url" inputType="url" />
                    <InputField title="Banner Url" inputType="text" />
                    <InputField title="AniList ID" inputType="number" maxValue="1000000" />
                    <InputField title="MAL ID" inputType="number" maxValue="1000000" />
                </SubmitBookContainer>

                <br />

                <FloatingButton
                    title="Submit"
                    icon="fas fa-cloud-upload-alt"
                    onClick={() => { window.alert("Book Submitted") }}
                />
                <br />
            </div>
        </PageBase>
    );
}