import styles from '../styles/components/BookCard.module.css'

export default function ResultCard({ entry, onAddClicked }) {

  console.log(entry)

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.list}>
          <p
            title={`${entry.title}`}
            className={styles.title}
          >
            {entry.title}
          </p>
          <img className={styles.cover} src={entry.coverUrl} />
        </div>
      </div>
      <div
        className={styles.addBook}
        onClick={() => {
          onAddClicked(entry)
          console.log(`Added Book ${entry.title}`)
        }}
      >
        <a
          title="Add Book to Library"
        >
          Add Book
        </a>
      </div>
    </>
  );
}