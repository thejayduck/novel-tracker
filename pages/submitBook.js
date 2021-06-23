import styles from '../styles/SubmitBook.module.css';
import { InputField, OptionSelect } from '../components/ui/inputField';
import SubmitBookContainer, { DescriptionSection, VolumeFormSection } from '../components/submitBookContainer';
import { FloatingButton } from '../components/ui/button';
import PageBase from '../components/pageBase';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useQueryParams, useUser } from '../lib/clientHelpers';

export default function SubmitBook() {
    const query = useQueryParams();

    useUser({
        logged_in: true,
        be_mod: true,
        be_admin: false
    });

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

    useEffect(async () => {
        if (query?.id) {
            const response = await fetch(`/api/get_book?id=${query.id}`);
            const json = await response.json();
            const data = json.data;

            Object.keys(detailRefs).forEach(k => {
                const new_value = data[k];
                detailRefs[k].current.value = new_value;
            });
        }
    }, [query?.id])

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