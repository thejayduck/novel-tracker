import styles from '../styles/BookDetails.module.css'
import OverlayMenu from '../components/overlayMenu';
import { useAppContext } from '../components/appWrapper';
import { useEffect, useState } from 'react';

export default function BookDetails({ book, onChapterChange, onVolumeChange, onExit }) {
    const [state] = useAppContext();

    const [data, setData] = useState(null);

    useEffect(async () => {
        const response = await fetch(`/api/get_book?id=${book.id}`);
        const json = await response.json();
        console.log(json);
        setData(json);
    }, [])

    return (
        <div>
            <OverlayMenu
                className={`${styles.container} ${state.darkMode ? styles.dark : styles.light}`}
            >
                {/* <div className={styles.banner}>
                    <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx120697-72Sf22C9PTQn.jpg" />
                </div> */}
                <div className={styles.infoWrapper}>
                    <div className={styles.banner}>
                        <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx120697-72Sf22C9PTQn.jpg" />
                    </div>
                    <img className={styles.cover} src={data?.cover_url} />
                    <div className={styles.info}>
                        <h1 title={data?.title} className={styles.title}> {data?.title} </h1>
                        <ul>
                            <li><a>Title (Romanized): Isekai Maou Sama</a></li>
                            <li><a>Title (Native): Isekai Maou Sama</a></li>
                            <li><a>Total Volumes: 10</a></li>
                            <li><a>Total Chapters: 10</a></li>
                            <li><a>Author: Nobbele Chousaki</a></li>
                        </ul>
                    </div>
                </div>
                {data?.description ?
                    <div className={styles.descriptionWrapper}>
                        <h2>Description</h2>
                        <p className={styles.description}>{data?.description}</p>
                    </div> : <></>
                }

                <div className={styles.status}>
                    <div>
                        <span className={styles.statusTitle}>Chapter</span>
                        <br />
                        <input
                            min="0"
                            type="number"
                            defaultValue={book?.chapter}
                            max="99999"
                            onInput={onChapterChange}
                        />
                    </div>
                    <div>
                        <span className={styles.statusTitle}>Volume</span>
                        <br />
                        <input
                            min="0"
                            type="number"
                            defaultValue={book?.volume}
                            max="9999"
                            onInput={onVolumeChange}
                        />
                    </div>
                </div>
            </OverlayMenu>
        </div>
    );
}