import styles from '../styles/BookDetails.module.css'
import OverlayMenu from './overlayMenu';
import Button from './ui/button';

import { useAppContext } from './appWrapper';
import { useEffect, useState } from 'react';

export default function BookDetails({ book, onExit, onAddClicked }) {
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
                <div className={styles.infoWrapper}>
                    <div className={styles.banner}>
                        <img src={data?.banner_url} />
                    </div>
                    <div className={styles.coverWrapper}>
                        <img className={styles.cover} src={data?.cover_url} />
                        <Button title="Add Book" onClick={() => onAddClicked()} />
                    </div>
                    <div className={styles.info}>
                        <h1 title={data?.title} className={styles.title}> {data?.title} </h1>
                        <ul>
                            <li><a>Title (Romanized): {data?.title_romanized}</a></li>
                            <li><a>Title (Native): {data?.title_native}</a></li>
                            <li><a>Total Volumes: 10</a></li>
                            <li><a>Total Chapters: 10</a></li>
                            <li><a>Author: {data?.author}</a></li>
                        </ul>
                    </div>
                </div>
                {data?.description &&
                    <div className={styles.descriptionWrapper}>
                        <h2>Description</h2>
                        <p className={styles.description}>{data?.description}</p>
                    </div>
                }
                <Button title="Exit" onClick={() => onExit()} />
                <br />
            </OverlayMenu>
        </div>
    );
}