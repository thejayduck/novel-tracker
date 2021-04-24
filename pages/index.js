import Head from 'next/head'
import styles from '../styles/Home.module.css'
import cardStyle from '../styles/BookCard.module.css'
import NewBook from './newBook'
import jikanjs from 'jikanjs'
import { useState, useEffect } from 'react'

const data = [...Array(66).keys()].map(n => ({
  title: "Pretty Boy Detective",
  coverUrl: "https://i.ibb.co/2dcp1RR/CQO6-Nvu-Uc-AAz-Q1-Y.jpg",
  chapter: 25,
  volume: 1,
  status: "Reading", //Reading, Paused, Dropped, Planning
}))

function NovelCard({ entry }) {
  return (
    <div className={cardStyle.activityEntry}>
      <div className={cardStyle.wrap}>
        <div className={cardStyle.list}>
          <p title={entry.title} className={cardStyle.title}>{entry.title}</p>
          <img className={cardStyle.cover} src={entry.coverUrl} />
          <div className={cardStyle.details}>
            <div>
              <span className={cardStyle.status}>Current Chapter: {entry.chapter}</span>
              <hr />
              {/* <span className={styles.status}>Current Volume: {entry.volume}</span>
              <hr/>
              <span className={styles.status}>Status: {entry.status}</span>
              <hr/> */}
              <a title="Increase Progress" className="fas fa-plus"></a>
              <a title="Decrease Progress" className="fas fa-minus"></a>
              <a title="Info" className="fas fa-info"></a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function usePersistedState(key, defaultValue) {
  /*const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);*/
  const [state, setState] = useState(defaultValue);
  return [state, setState];
}

export default function Home() {
  const [darkmode, setDarkmode] = usePersistedState("darkmode", true);
  const [overlay, setOverlay] = useState(false);

  return (
    <div className={`${styles.container} ${darkmode ? styles.dark : styles.light}`}>
      <Head>
        <title>Book Library</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="public/favicon.ico" />

      </Head>

      <main className={styles.main}>
        <div className={styles.searchContainer}>
          <form action="/" className={styles.searchBar}>
            <i className={`${styles.icon} fas fa-search ${styles.faSearch}`} />
            <input type="text" placeholder="Search..." name="search" maxLength="50" />
          </form>
        </div>
        <div className={styles.activityContainer}>
          <div className={styles.activityFeed}>
            {data.map(entry => (<NovelCard entry={entry} />))}
          </div>
        </div>
      </main>
      <footer className={`${styles.footer} ${darkmode ? styles.dark : styles.light}`}>
        <button onClick={() => setDarkmode(!darkmode)}>Theme</button>
        <p>Finished Books: x</p>
        <br />
        <p>Chapters Read: x</p>
        <br />
        <a title="Check Out My Github" href="https://github.com/thejayduck" className="fab fa-github" target="_blank" />
      </footer>
      {overlay && <NewBook/>}
      <div className={styles.newBook} onClick={()=> setOverlay(!overlay)}>
        <a title="Add New Book" className="fas fa-plus"/>
      </div>
    </div>
  )
}
