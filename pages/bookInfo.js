import OverlayMenu from '../components/overlayMenu';
import styles from '../styles/BookInfo.module.css'
import { useAppContext } from '../components/appWrapper';
import { useEffect, useState } from 'react';

function cutWord(text, limit) {
  if (text === null)
    return null;
  if (text === undefined)
    return undefined;

  if (text.length > limit)
    return text.substring(0, limit) + "...";
  else
    return text;
}

export default function BookInfo({ book, onChapterChange, onVolumeChange, onExit }) {

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
        <div className={styles.cover}>
          <img src={data?.cover_url} />
          <div className={styles.textContainer}>
            <h1 title={data?.title} className={styles.title}> {cutWord(data?.title, 55)} </h1>
            <h2>Synopsis</h2>
            <p className={styles.synopsis}>{cutWord(data?.description, 350)}</p>
          </div>
        </div>
        <div className={styles.status}>
          <div>
            <span className={styles.statusTitle}>Chapter</span>
            <br />
            <input
              min="0"
              type="number"
              defaultValue={book?.chapter}
              max="100000000"
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
              max="999"
              onInput={onVolumeChange}
            />
          </div>
          {/* <div>
            <span className={styles.statusTitle}>Status</span>
            <br />
            <select>
              <option value="reading">Reading</option>
              <option value="finished">Finished</option>
              <option value="planning">Planning</option>
              <option value="dropped">Dropped</option>
            </select>
          </div> */}
        </div>
        <div className={styles.closeInfo} onClick={onExit}>
          <a title="Exit" className="fas fa-times" />
        </div>
      </OverlayMenu>
    </div>
  );
}