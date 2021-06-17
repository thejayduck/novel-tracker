import styles from '../styles/BookDetails.module.css'
import OverlayMenu from './overlayMenu';
import { useAppContext } from './appWrapper';
import { useEffect, useState } from 'react';

export default function BookDetails({ book, onExit }) {
    const [state] = useAppContext();

    const [data, setData] = useState(null);

    useEffect(async () => {
        const response = await fetch(`/api/get_book?id=${book.id}`);
        const json = await response.json();
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
                            <a href="#" onClick={() => onExit()}>Exit</a>
                        </ul>
                    </div>
                </div>
                {data?.description ?
                    <div className={styles.descriptionWrapper}>
                        <h2>Description</h2>
                        <p className={styles.description}>{data?.description}</p>
                    </div> : <></>
                }
            </OverlayMenu>
        </div>
    );
}