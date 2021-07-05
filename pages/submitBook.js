import styles from '../styles/SubmitBook.module.css';
import { InputField, OptionSelect } from '../components/ui/inputField';
import SubmitBookContainer, { DescriptionSection, VolumeFormSection } from '../components/submitBookContainer';
import Button from '../components/ui/button';
import PageBase from '../components/pageBase';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { serverSide_checkAuth } from "../lib/serverHelpers";
import { getBook } from '../lib/db';
import { useApi } from '../lib/clientHelpers';
import { useAlert } from '../components/alertWrapper';

export async function getServerSideProps(context) {
    const [auth, info] = await serverSide_checkAuth(context, true, false, false);

    let existing_book = null;
    if (context.query.id) {
        const id = Number.parseInt(context.query.id);
        existing_book = await getBook(id);
    }

    return auth || {
        props: {
            user_info: info,
            existing_book,
        },
    };
}

export default function SubmitBook({ user_info, existing_book }) {
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

    useEffect(() => {
        if (existing_book) {
            Object.keys(detailRefs).forEach(k => {
                const new_value = existing_book[k];
                detailRefs[k].current.value = new_value;
            });
        }
    }, [existing_book]);

    const router = useRouter();
    const api = useApi();
    const alert = useAlert();

    async function onSubmit() {

        const book_details = Object.fromEntries(Object.entries(detailRefs).map(([k, v]) => {
            const val = v.current.value;
            return [k, val === "" ? null : val];
        }));
        if (existing_book) {
            book_details.book_id = existing_book.book_id;
        }
        await api.submitBook(book_details, () => {
            alert.information("Book successfully submitted!");
        });
        router.push(`/`);
    }

    return (
        <PageBase userInfo={user_info}>
            <div className={styles.pageContent}>
                <h2 className={styles.containerTitle} >Submit Book <i className="fas fa-fw fa-feather-alt" /></h2>

                <SubmitBookContainer title="Titles">
                    <InputField
                        ref={detailRefs.title}
                        title="English Title*"
                        inputType="text"
                        placeHolder="Licensed English Title"
                        toolTip="Licensed English Title (Fan Translated Titles are NOT Allowed)"
                    />
                    <InputField
                        ref={detailRefs.title_romanized}
                        title="Title Romanized*"
                        inputType="text"
                        placeHolder="Romanized Title"
                        toolTip="Licensed Romanized Title"
                    />
                    <InputField
                        ref={detailRefs.title_native}
                        title="Title Native*"
                        inputType="text"
                        placeHolder="Native Title"
                    />
                </SubmitBookContainer>

                <DescriptionSection ref={detailRefs.description} />

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
                        pattern="https?://.+"
                    />
                    <InputField
                        ref={detailRefs.banner_url}
                        title="Banner Url"
                        inputType="text"
                        pattern="https?://.+"
                    />
                </SubmitBookContainer>
                <br />
                <div>
                    <Button icon="fas fa-fw fa-cloud-upload-alt" text="Submit Book" onClick={onSubmit} />
                </div>
                <br />
            </div>
        </PageBase>
    );
}