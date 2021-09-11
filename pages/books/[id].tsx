// @ts-nocheck
import styles from 'styles/Book.module.scss'

import PageBase from "components/pageBase"
import { Subtitle } from "../../components/subtitle"

import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useApi } from 'lib/clientHelpers'
import { useEffect, useState } from 'react'
import { GetBookResponse } from 'lib/clientHelpers'
import { useRouter } from 'next/dist/client/router'
import { serverSide_checkAuth } from 'lib/serverHelpers'

const VolumeCard = dynamic(() => import("components/cards/volumeCard"))

export async function getServerSideProps(context) {
    const [redirect, info] = await serverSide_checkAuth(context, false, false, false);

    return redirect ? redirect : {
        props: {
            user_info: info,
        },
    }
}

export default function Book({ user_info }) {
    const router = useRouter()
    const { id } = router.query;

    const api = useApi();
    const [book, setBook] = useState<GetBookResponse | null>(null);
    useEffect((async () => {
        if (id == undefined) {
            return;
        }
        const api_book = await api.getBook(id);
        setBook(api_book);
    }) as any, [id]);
    return (
        <>
            <Head>
                <title>Book · Novel Tracker</title>
            </Head>
            <PageBase user_info={user_info}>

                <section className={`${styles.headerWrap} flex flexColumn`}>
                    <img className={`${styles.background} skeleton`} src="http://source.unsplash.com/200x300/?nature" />
                    <div>
                        <img className="skeleton" src="https://dummyimage.com/200x300/0c92eb/fff" />
                    </div>
                    <h1>{book?.title_english || "Loading..."}</h1>
                    <span className="fontSmall">{book?.title_romanized || "Loading..."}</span>
                    <span className="fontSmall">{book?.title_native || "Loading..."}</span>
                </section>
                <section className={`${styles.detailsWrap}`}>
                    <Subtitle text="About" />
                    <div className={`${styles.details} flex`}>
                        <DetailItem title="Author" value={book?.author || "Loading..."} />
                        <DetailItem title="Volumes" value={book?.volumes.length || "Loading..."} />
                        <DetailItem
                            title="Chapters"
                            value={book && book.volumes.reduce((acc, volume) => {
                                return acc + volume.chapters;
                            }, 0)}
                        />
                        <DetailItem title="Status" value="Finished" />
                        <DetailItem title="Start Date" value="Jan 25, 2015" />
                        <DetailItem title="End Date" value="Jun 25, 2015" />
                    </div>
                    {/* TODO make description constant size */}
                    <p>{book?.description || "Loading..."}</p>
                    <Subtitle text={`Volumes (3)`} />
                    <div className={`${styles.volumeList} flex`}>
                        {book && book.volumes.map(volume => (<VolumeCard key={volume.cover_url} data={volume} />))}
                    </div>
                </section>
            </PageBase>
        </>
    )
}

function DetailItem({ title, value }) {
    return (
        <div className={`${styles.detailItem}`}>
            <h3>{title}</h3>
            <span>{value}</span>
        </div>
    )
}