import styles from '../styles/SubmitBook.module.css';
import { InputField, OptionSelect } from '../components/ui/inputField';
import SubmitBookContainer, { DescriptionSection, VolumeFormSection } from '../components/submitBookContainer';
import { parse } from 'cookie';
import { getUserInfo, withUserId } from '../lib/db';
import { FloatingButton } from '../components/ui/button';
import PageBase from '../components/pageBase';
import { useRef, useState } from 'react';
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
    const detailRefs = {
        title: useRef(null),
        title_romanized: useRef(null),
        title_native: useRef(null),

        description: useRef(null),

        start_date: useRef(null),
        end_date: useRef(null),
        release_status: useRef(null),

        author: useRef(null),
        cover_url: useRef(null),
        banner_url: useRef(null),
    }

    const router = useRouter();

    async function onSubmit() {
        const book_details = Object.fromEntries(Object.entries(detailRefs).map(([k, v]) => {
            const val = v.current.value;
            return [k, val === "" ? null : val];
        }));
        const response = await fetch("/api/create_book", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                book_details: book_details,
            }),
        });
        const json = await response.json();
        if (json.status != "OK") {
            throw json;
        }
        router.push(`/book?id=${json.id}`);
    }

    return (
        <PageBase>
            <div className={styles.pageContent}>
                <h2 className={styles.containerTitle} >Submit Book <i className="fas fa-feather-alt" /></h2>

                <SubmitBookContainer title="Titles" toolTip="Please Enter *Official* Titles of the Book.">
                    <InputField
                        ref={detailRefs.title}
                        title="Title (Licensed*)"
                        inputType="text"
                        placeHolder="Licensed English Title"
                    />
                    <InputField
                        ref={detailRefs.title_romanized}
                        title="Title Romanized"
                        inputType="text"
                        placeHolder="Romanized Title"
                    />
                    <InputField
                        ref={detailRefs.title_native}
                        title="Title Native"
                        inputType="text"
                        placeHolder="Native Title"
                    />
                </SubmitBookContainer>

                <DescriptionSection
                    ref={detailRefs.description}
                />

                <SubmitBookContainer title="Lengths">
                    <div>
                        <InputField title="Volumes" inputType="number" defaultValue="0" maxValue="200" />
                        <div className={styles.volumeWrapper}>
                            {/* <VolumeFormSection index="Volume [1]" /> */}
                        </div>
                    </div>
                </SubmitBookContainer>

                <SubmitBookContainer title="Publication Date">
                    <InputField
                        ref={detailRefs.start_date}
                        title="Start Date"
                        inputType="date"
                    />
                    <InputField
                        ref={detailRefs.end_date}
                        title="End Date"
                        inputType="date"
                    />
                    <OptionSelect
                        ref={detailRefs.release_status}
                        title="Release Status"
                        options={['Finished', 'Releasing', 'Cancelled', 'Hiatus']}
                    />
                </SubmitBookContainer>

                <SubmitBookContainer title="Other">
                    <InputField
                        ref={detailRefs.author}
                        title="Author*"
                        inputType="text"
                    />
                    <InputField
                        ref={detailRefs.cover_url}
                        title="Cover Url"
                        inputType="url"
                    />
                    <InputField
                        ref={detailRefs.banner_url}
                        title="Banner Url"
                        inputType="text"
                    />
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