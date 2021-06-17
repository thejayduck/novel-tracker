import styles from '../styles/components/BookCard.module.css'

export default function ResultCard({ entry, onAddClicked, onDetailsClicked }) {
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
      {/*<div
        className={styles.addBook}
        onClick={() => onAddClicked(entry)}
      >
        <a
          title="Add Book to Library"
        >
          Add Book
        </a>
      </div>*/}
      <div
        className={styles.addBook}
        onClick={() => onDetailsClicked(entry)}
      >
        <a href="#" title="View Details">
          View Details
        </a>
      </div>
    </>
  );
}