import Head from 'next/head'
import styles from '../styles/Home.module.css'
import cardStyle from '../styles/BookCard.module.css'
import NewBook from './newBook'
import BookInfo from './bookInfo'
import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'

export function CardListWrapper({ data, children }) {
  return (
    <div className={styles.cardListContainer}>
      <ul className={styles.cardListFeed}>{children}</ul>
    </div>
  );
}

function NovelCard({ entry, onIncrement, onDecrement, onInfoClick, onDelete }) {
  return (
    <div className={cardStyle.wrap}>
      <div className={cardStyle.list}>
        <p title={entry.title} className={cardStyle.title}>
          {entry.title}
        </p>
        <img className={cardStyle.cover} src={entry.coverUrl} />
        <div className={cardStyle.details}>
          <div>
            <span className={cardStyle.status}>
              Current Chapter: {entry.chapter}
            </span>
            <hr />
            {/* <span className={styles.status}>Current Volume: {entry.volume}</span>
              <hr/>
              <span className={styles.status}>Status: {entry.status}</span>
              <hr/> */}
            <a
              onClick={onIncrement}
              title="Increase Progress"
              className="fas fa-plus"
            />
            <a
              onClick={onDecrement}
              title="Decrease Progress"
              className="fas fa-minus"
            />
            <a onClick={onInfoClick} title="Info" className="fas fa-info" />
            <a
              onClick={onDelete}
              title="Delete Book"
              style={{ color: '#e33131' }}
              className="fas fa-trash-alt"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function usePersistedState(key, defaultValue) {

  // const [state, setState] = useState(
  //   (JSON.parse(localStorage.getItem(key)) || defaultValue)
  // );
  // useEffect(() => {
  //   localStorage.setItem(key, JSON.stringify(state));
  // }, [key, state]);

  const [state, setState] = useState(defaultValue);
  return ([state, setState]);
}

export default function Home() {
  const [darkmode, setDarkmode] = usePersistedState("darkmode", false);
  const [newBookPanel, setNewBookPanel] = useState(false);
  const [data, setData] = useState([]);
  const [bookInfoPanel, setBookInfoPanel] = useState(false);
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);

  const removeBook = (id) => {
    setData(data.filter(target => target.mal_id !== id));
    
  };
  
  //#region Fuse
  const [query, setQuery] = useState('');

  const fuse = new Fuse(data, {
    keys: [
      'title',
      'synopsis'
    ],
  });

  const fuseResults = fuse.search(query);
  const bookResults = query ? fuseResults.map(result => result.item) : data;

  function onSearch({ currentTarget }) {
    setQuery(currentTarget.value);
  }
  //#endregion

  //#region Local Storage
  const exportData = () => {
    var element = document.createElement('a');
    element.style.display = 'none';
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
    element.setAttribute('download', 'data.json');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  const importData = (target) => {
    const reader = new FileReader();
    reader.addEventListener('load', ({target}) => {
      console.log(target.result);
      setData(JSON.parse(atob(target.result.replace("data:application/json;base64,", ""))));
      document.getElementById
    });
    reader.readAsDataURL(target);
  }

  useEffect(() => {
    const localData = localStorage.getItem('books');
    setData(localData ? JSON.parse(localData) : []);
  }, [])

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(data))
  }, [data])
  //#endregion

  const updateElementInData = (index, updateElementCallback) => {
    let new_data = [...data];
    updateElementCallback(new_data[index]);
    setData(new_data);
  };

  return (
    <div
      className={`${styles.container} ${darkmode ? styles.dark : styles.light}`}
    >
      <Head>
        <title>Book Library</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="public/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.searchContainer}>
          <div className={styles.searchBar}>
            <i className={`${styles.icon} fas fa-search ${styles.faSearch}`} />
            <input
              type="text"
              placeholder="Search..."
              name="search"
              maxLength="50"
              value={query}
              onChange={onSearch}
            />
          </div>
        </div>
        <CardListWrapper data={data}>
          {bookResults.map((entry, index) => (
            <li key={entry.mal_id}>
              <div className={cardStyle.activityEntry}>
                <NovelCard
                  entry={entry}
                  onIncrement={() =>
                    updateElementInData(index, (element) => element.chapter++)
                  }
                  onDecrement={() =>
                    updateElementInData(
                      index,
                      (element) =>
                        (element.chapter = Math.max(0, element.chapter - 1))
                    )
                  }
                  onInfoClick={() => {
                    setSelectedBookIndex(index);
                    setBookInfoPanel(!bookInfoPanel);
                  }}
                  onDelete={() => removeBook(entry.mal_id)}
                />
              </div>
            </li>
          ))}
        </CardListWrapper>
      </main>
      <footer
        className={`${styles.footer} ${darkmode ? styles.dark : styles.light}`}
      >
        <button title="Toggle Theme" className={`fas fa-moon ${styles.themeToggle}`} onClick={() => setDarkmode(!darkmode)} />
        <button title="Export Data" className={`fas fa-download ${styles.themeToggle}`} onClick={exportData} />
        <button title="Import Data" className={`fas fa-upload ${styles.themeToggle}`} 
          onClick={() => {
            var element = document.getElementById('importData');
            element.click();
          }} 
        />
        <input id="importData" style={{display: 'none'}} type="file" accept=".json" onChange={({target}) => {importData(target.files[0]); target.value=null}}/>
        <p>Books: {data.length}</p>
        <p className={styles.volumeCount} >Volumes Read: {data.reduce((acc, val) => acc + val.volume, 0)}</p>
        <p>Chapters Read: {data.reduce((acc, val) => acc + val.chapter, 0)}</p>
        <a
          title="Check Out TheJayDuck's Github"
          href="https://github.com/thejayduck"
          className="fab fa-github"
          target="_blank"
        />
        <a
          title="Check Out Nobbele's Github"
          href="https://github.com/nobbele"
          className="fab fa-github"
          target="_blank"
        />
      </footer>
      {newBookPanel && (
        <NewBook onAddClicked={(entry) => {
          if (!data.includes(entry))
            setData([...data, entry])
        }
        } />
      )}
      <div className={styles.newBook} onClick={() => setNewBookPanel(!newBookPanel)}>
        <a title="Add New Book" className="fas fa-plus" />
      </div>
      
      {bookInfoPanel && (
      <BookInfo 
        book={data[selectedBookIndex]}
        onChapterChange={
          ({ target }) => {
            updateElementInData(selectedBookIndex, (element) => element.chapter = Number.parseInt(target.value))
          }
        } 
        onVolumeChange={
          ({ target }) => {
            updateElementInData(selectedBookIndex, (element) => element.volume = Number.parseInt(target.value))
          }
        }
        onExit={() => setBookInfoPanel(!bookInfoPanel)}
        />
      )}
    </div>
  );
}
