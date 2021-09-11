// @ts-nocheck
import styles from 'styles/SubmitPage.module.scss'

// Components
import Head from 'next/head'

import React, { useRef, useState } from 'react';

import { useAlert } from 'components/alertWrapper';
import PageBase from 'components/pageBase';
import { Subtitle } from 'components/subtitle';
import { NavigationButton } from "components/ui/button";
import { InputField, OptionSelect } from 'components/ui/inputField';

import { useApi } from 'lib/clientHelpers';
import { serverSide_checkAuth } from 'lib/serverHelpers';

interface SubmitPageProps {
    book_id?: number,
    user_info: any,
}

export async function getServerSideProps(context) {
    const [redirect, info] = await serverSide_checkAuth(context, false, false, false);

    return redirect ? redirect : {
        props: {
            user_info: info,
        },
    }
}

export default function SubmitPage({ book_id, user_info }: SubmitPageProps) {
    if (book_id != undefined) {
        console.log("Editing existing book!");
    }

    const api = useApi();
    const alert = useAlert();

    interface VolumeState {
        cover_url: string | null,
        chapterCount: number,
    }
    const [volumes, setVolumes] = useState<VolumeState[]>([]);
    const nativeTitleRef = useRef<HTMLInputElement>();
    const romanizedTitleRef = useRef<HTMLInputElement>();
    const englishTitleRef = useRef<HTMLInputElement>();
    const descriptionRef = useRef<HTMLTextAreaElement>();
    const authorNameRef = useRef<HTMLInputElement>();
    const releaseStatusRef = useRef<HTMLOptionElement>();
    const startDateRef = useRef<HTMLInputElement>();
    const endDateRef = useRef<HTMLInputElement>();
    async function onSubmit() {
        const bookDetails = {
            title_english: englishTitleRef.current.value,
            title_romanized: romanizedTitleRef.current.value,
            title_native: nativeTitleRef.current.value,
            description: descriptionRef.current.value,
            author: authorNameRef.current.value,
            // TODO
            cover_url: null,
            // TODO
            banner_url: null,
            release_status: releaseStatusRef.current.value,
            start_date: startDateRef.current.value,
            end_date: endDateRef.current.value,
            volumes: volumes.map(volume => ({
                cover_url: volume.cover_url,
                chapters: volume.chapterCount,
                // TODO
                extras: 0,
            }))
        }
        console.log(bookDetails);
        const data = await api.submitBook(bookDetails, () => {
            alert.information("Submitted!");
        });
        console.log(data);
    }
    return (
        <>
            <Head>
                <title>Submit · Novel Tracker</title>
            </Head>

            <PageBase user_info={user_info}>
                <section className={styles.section}>
                    <Subtitle text="Titles" />

                    <div className={styles.sectionContainer}>
                        <InputField title="Native" ref={nativeTitleRef} />
                        <InputField title="Romanized" ref={romanizedTitleRef} />
                        <InputField toolTip="Licensed only! Fan translated titles are NOT allowed." title="English" ref={englishTitleRef} />
                    </div>
                </section>

                <section className={styles.section}>
                    <Subtitle text="Description" />
                    <div className={styles.sectionContainer}>
                        <textarea rows={15} wrap="soft" ref={descriptionRef} />
                    </div>
                </section>

                <section className={styles.section}>
                    <Subtitle text="Other" />
                    <div className={styles.sectionContainer}>
                        <div className="flex">
                            <InputField title="Author Name" ref={authorNameRef} />
                            {/* <InputField title="Status" placeHolder="TODO: option select" /> */}
                            <OptionSelect
                                title="Release Status"
                                options={['Finished', 'Releasing', 'Cancelled', 'Hiatus', 'Coming Soon']}
                                ref={releaseStatusRef}
                            />
                        </div>
                        <div className="flex">
                            <InputField title="Start Date" inputType="date" ref={startDateRef} />
                            <InputField title="End Date" inputType="date" ref={endDateRef} />
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <Subtitle text="Volumes (5)" />
                    <ul className={`${styles.sectionContainer} ${styles.volumeList} flex`}>
                        {volumes.map((volume, idx) => (
                            <VolumeItem
                                key={idx}
                                image={volume.cover_url}
                                onCoverUrlChange={newCover => {
                                    setVolumes(oldVolumes => {
                                        oldVolumes[idx].cover_url = newCover;
                                        return [...oldVolumes];
                                    })
                                }}
                                onChaptersCountChange={newChapterCount => {
                                    setVolumes(oldVolumes => {
                                        oldVolumes[idx].chapterCount = newChapterCount;
                                        return [...oldVolumes];
                                    })
                                }}
                            />
                        ))}
                        <div>
                            <a
                                title="New Volume"
                                className={`${styles.volumeItem} ${styles.placeholder} flex flexAround`}
                                onClick={() => {
                                    setVolumes(oldVolumes => {
                                        return [...oldVolumes, {
                                            cover_url: null,
                                            chapterCount: 0
                                        }]
                                    })
                                }}
                            >
                                <i className="bx bx-plus bx-md" />
                            </a>
                            <div className="skeleton skeletonText" />
                            <div className="skeleton skeletonText" />
                            <div className="skeleton skeletonText" />
                            <div className="skeleton skeletonText" />
                            <div className="skeleton skeletonText" />
                            <div className="skeleton skeletonText" />
                            <div className="skeleton skeletonText" />
                            <div className="skeleton skeletonText" />
                        </div>
                    </ul>
                </section>
                <NavigationButton text="Submit Book" icon="bx bx-subdirectory-left bx-sm" href={null} onClick={onSubmit} />
            </PageBase>
        </>
    )
}

interface VolumeItemProps {
    image: string,
    onCoverUrlChange: (newImage: string) => void,
    onChaptersCountChange: (newCount: number) => void,
}

function VolumeItem({ image, onCoverUrlChange, onChaptersCountChange }: VolumeItemProps) {
    return (
        <li className={styles.volumeItem}>
            <div className={`flex flexColumn ${styles.book}`}>
                <img className="skeleton" width={200} height={300} src={image} />
                <div className={`${styles.volumeDetails}`}>
                    <InputField placeHolder="Image URL" inputType="url" onChange={(e: any) => onCoverUrlChange(e.target.value)} />
                    {/* <InputField placeHolder="Volume" inputType="number" maxValue="99" /> */}
                    <InputField placeHolder="Chapters" inputType="number" maxValue="999" onChange={(e: any) => onChaptersCountChange(e.target.value)} />
                </div>
            </div>
        </li>
    )
}