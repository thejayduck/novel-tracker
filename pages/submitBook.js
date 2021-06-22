import styles from '../styles/SubmitBook.module.css';
import InputField, { OptionSelect } from '../components/ui/inputField';
import SubmitBookContainer, { DescriptionSection, VolumeFormSection } from '../components/submitBookContainer';
import { parse } from 'cookie';
import { getUserInfo, withUserId } from '../lib/db';
import { FloatingButton } from '../components/ui/button';
import PageBase from './pageBase';
import { useState } from 'react';
import { useRouter } from 'next/router';

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
    const info = await withUserId(token, async (user_id) => await getUserInfo(user_id));
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

    let existing_book = null;
    if (context.query.id) {
        // TODO
        throw {
            message: "Unimplemented"
        }
    }

    return {
        props: {
            user_info: info,
            existing_book,
        },
    };
}

export default function SubmitBook({ existing_book }) {
    // TODO get via id or something instead of having a state
    // TODO must be done so that the default values actually apply
    const [bookDetails, setBookDetails] = useState(existing_book || {
        cover_url: null,
        title: null,
        title_romanized: null,
        title_native: null,
        description: null,
        author: null,
        start_date: null,
        end_date: null,
        banner_url: null,
        release_status: null,
    });

    const router = useRouter();

    async function onSubmit() {
        const response = await fetch("/api/create_book", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                book_details: bookDetails,
            }),
        });
        const json = await response.json();
        if (json.status != "OK") {
            throw json;
        }
        router.push(`/bookInfo?id=${json.id}`);
    }

    return (
        <PageBase>
            <div className={styles.pageContent}>
                <h2 className={styles.containerTitle} >Submit Book <i className="fas fa-feather-alt" /></h2>

                <SubmitBookContainer title="Titles" toolTip="Please Enter *Official* Titles of the Book.">
                    <InputField title="Title (Licensed*)" inputType="text" placeHolder="Licensed English Title" onChange={({ target }) => setBookDetails({ ...bookDetails, title: target.value })} />
                    <InputField title="Title Romanized" inputType="text" placeHolder="Romanized Title" onChange={({ target }) => setBookDetails({ ...bookDetails, title_romanized: target.value })} />
                    <InputField title="Title Native" inputType="text" placeHolder="Native Title" onChange={({ target }) => setBookDetails({ ...bookDetails, title_native: target.value })} />
                </SubmitBookContainer>

                <DescriptionSection onChange={({ target }) => setBookDetails({ ...bookDetails, description: target.value })} />

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
                    <InputField title="Start Date" inputType="date" onChange={({ target }) => setBookDetails({ ...bookDetails, start_date: target.value })} />
                    <InputField title="End Date" inputType="date" onChange={({ target }) => setBookDetails({ ...bookDetails, end_date: target.value })} />
                    <OptionSelect title="Release Status" options={['Finished', 'Releasing', 'Cancelled', 'Hiatus']} onChange={({ target }) => setBookDetails({ ...bookDetails, release_status: target.value })} />
                </SubmitBookContainer>

                <SubmitBookContainer title="Other">
                    <InputField title="Author*" inputType="text" onChange={({ target }) => setBookDetails({ ...bookDetails, author: target.value })} />
                    <InputField title="Cover Url" inputType="url" onChange={({ target }) => setBookDetails({ ...bookDetails, cover_url: target.value })} />
                    <InputField title="Banner Url" inputType="text" onChange={({ target }) => setBookDetails({ ...bookDetails, banner_url: target.value })} />
                </SubmitBookContainer>

                <br />

                <FloatingButton
                    title="Submit"
                    icon="fas fa-cloud-upload-alt"
                    onClick={onSubmit}
                />
                <br />
            </div>
        </PageBase>
    );
}