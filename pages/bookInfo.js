import styles from '../styles/BookInfo.module.css'

function cutWord(text){
  if(text.length > 55)
    return text.substring(0,55) + "...";
  else
    return text;
}

const data = ({
  title: "title",
  synopsis: "synopsis",
  coverUrl: "",
  chapter: 0,
  volume: 0,
  status: "None",
});

export default function BookInfo({ book = data, onChapterChange, onVolumeChange, onExit }) {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.cover}>
            <img src={book.coverUrl}/>
            <div className={styles.textContainer}>
              <h1 title={book.title} className={styles.title}> {cutWord(book.title)} </h1>
              <h2>Synopsis</h2>
              <p className={styles.synopsis}>{book.synopsis}</p>
            </div>
          </div>
          <div className={styles.status}>
            <div>
              <span className={styles.statusTitle}>Chapter</span>
              <br/>
              <input
                min="0"
                type="number"
                defaultValue={book.chapter}
                onInput={onChapterChange}
              />
            </div>
            <div>
              <span className={styles.statusTitle}>Volume</span>
              <br/>
              <input
                min="0"
                type="number"
                defaultValue={book.volume}
                onInput={onVolumeChange}
              />
            </div>
          </div>
          <div className={styles.closeInfo} onClick={onExit}>
            <a title="Exit" className="fas fa-times" />
          </div>
        </div>
      </div>
    </div>
  );
}