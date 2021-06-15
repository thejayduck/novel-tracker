import OverlayMenu from '../components/overlayMenu';
import styles from '../styles/BookInfo.module.css'
import { useAppContext } from '../components/appWrapper';

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

  return (
    <div>
      <OverlayMenu
        className={`${styles.container} ${state.darkMode ? styles.dark : styles.light}`}
      >
        <div className={styles.cover}>
          <img src={book?.coverUrl} />
          <div className={styles.textContainer}>
            <h1 title={book?.title} className={styles.title}> {cutWord(book?.title, 55)} </h1>
            <h2>Synopsis</h2>
            <p className={styles.synopsis}>{book?.synopsis}</p>
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
              onInput={onVolumeChange}
            />
          </div>
        </div>
        <div className={styles.closeInfo} onClick={onExit}>
          <a title="Exit" className="fas fa-times" />
        </div>
      </OverlayMenu>
    </div>
  );
}