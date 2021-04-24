import styles from '../styles/NewBook.module.css'
import cardStyle from '../styles/BookCard.module.css'
import jikanjs from 'jikanjs'

const data = [...Array(0).keys()].map(n => ({
  title: "Pretty Boy Detective",
  coverUrl: "https://i.ibb.co/2dcp1RR/CQO6-Nvu-Uc-AAz-Q1-Y.jpg",
  chapter: 25,
  volume: 1,
  status: "Reading", //Reading, Paused, Dropped, Planning
}))

jikanjs.search("manga", "Pretty Boy").then(({ results }) => {
  results.forEach(ln => {
    data.push({
      mal_id: ln.mal_id,
      title: ln.title,
      coverUrl: ln.image_url,
      type: ln.type,
      chapter: 1,
      volume: 0,
      status: "Reading",
    });
  });
});

function NovelCard({ entry }) {
  return (
    <div className={cardStyle.activityEntry}>
      <div className={cardStyle.wrap}>
        <div className={cardStyle.list}>
          <p title={`${entry.title} | ${entry.type}`} className={cardStyle.title}>{entry.title}</p>
          <img className={cardStyle.cover} src={entry.coverUrl} />
        </div>
      </div>
        <a title="Add Book to Library" className={cardStyle.addBook} href="/">Add Book</a>
    </div>
  );
}
export default function NewBook() {
    return (
    <div>
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.searchContainer}>
                    <form action="/" className={styles.searchBar}>
                        <i className={`${styles.icon} fas fa-search ${styles.faSearch}`} />
                        <input type="text" placeholder="Search Manga/Novel..." name="search" maxLength="50" />
                    </form>
                </div>
                <div className={styles.searchResultContainer}>
                    <div className={styles.searchResultFeed}>
                        {data.map(entry => (<NovelCard entry={entry} />))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}