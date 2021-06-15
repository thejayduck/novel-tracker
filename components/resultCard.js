import cardStyle from '../styles/BookCard.module.css'

export default function ResultCard({ entry, onAddClicked }) {

  console.log(entry)

  return (
    <>
      <div className={cardStyle.wrap}>
        <div className={cardStyle.list}>
          <p
            title={`${entry.title}`}
            className={cardStyle.title}
          >
            {entry.title}
          </p>
          <img className={cardStyle.cover} src={entry.coverUrl} />
        </div>
      </div>
      <a
        title="Add Book to Library"
        className={cardStyle.addBook}
        href="#"
        onClick={() => {
          onAddClicked(entry)
          console.log(`Added Book ${entry.title}`)
        }}
      >
        Add Book
      </a>
    </>
  );
}