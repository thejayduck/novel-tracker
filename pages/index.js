import styles from '../styles/Home.module.css'
import cardStyle from '../styles/components/BookCard.module.css'

import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import BookCard from '../components/bookCard'
import Footer from '../components/footer'
import SearchBar from '../components/searchBar'
import NewBook from './newBook'
import BookDetails from '../components/bookDetails'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useAppContext } from '../components/appWrapper'
import Button from '../components/ui/button'
import { parse } from 'cookie'
import { getUserInfoFromToken } from '../lib/db'


export function CardListWrapper({ children }) {
  return (
    <div className={styles.cardListContainer}>
      <ul className={styles.cardListFeed}>{children}</ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookie_header = context.req.headers.cookie;
  if (!cookie_header) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }

  const cookies = parse(context.req.headers.cookie);
  const token = cookies.token;
  const info = await getUserInfoFromToken(token);
  if (info == null) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }

  return {
    props: {
      user_info: info,
    },
  };
}

export default function Home({ user_info }) {

  const [state] = useAppContext();
  const [newBookPanel, setNewBookPanel] = useState(false);
  const [data, setData] = useState([]);

  const removeBook = (id) => {
    setData(data.filter(target => target.id !== id));

  };

  const [query, setQuery] = useState('');

  const fuse = new Fuse(data, {
    keys: [
      'title',
      'description'
    ],
  });

  const fuseResults = fuse.search(query);
  const bookResults = query ? fuseResults.map(result => result.item) : data;

  function onSearch({ currentTarget }) {
    setQuery(currentTarget.value);
  }

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
    reader.addEventListener('load', ({ target }) => {
      setData(JSON.parse(atob(target.result.replace("data:application/json;base64,", ""))));
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


  const updateElementInData = (index, updateElementCallback) => {
    let new_data = [...data];
    updateElementCallback(new_data[index]);
    setData(new_data);
  };


  return (
    <div
      className={`${styles.container} ${state.darkMode ? styles.dark : styles.light}`}
    >
      <main className={styles.main}>
        <SearchBar onInput={onSearch} query={query} />
        <AnimateSharedLayout>
          <CardListWrapper
            data={data}
          >
            {bookResults.map((entry, index) => (
              <motion.li
                layout
                key={entry.id}>
                <div className={cardStyle.activityEntry}>
                  <BookCard
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
                    onDelete={() => removeBook(entry.id)}
                  />
                </div>
              </motion.li>
            ))}
          </CardListWrapper>
        </AnimateSharedLayout>

      </main>
      <Footer
        data={data}
        showModButtons={user_info.moderation_level >= 2}
        onExportDataClick={exportData}
        onImportDataClick={() => {
          var element = document.getElementById('importData');
          element.click();
        }}
      />
      <input id="importData" style={{ display: 'none' }} type="file" accept=".json" onChange={({ target }) => { importData(target.files[0]); target.value = null }} />
      <AnimatePresence>
        {newBookPanel && (
          <NewBook onAddClicked={(entry) => {
            if (!data.map(q => q.id).includes(entry.id))
              setData([...data, { id: entry.id, chapter: 0, volume: 0 }])
          }
          } />
        )}
      </AnimatePresence>

      {/* <Button icon="fas fa-plus" onClick={() => setNewBookPanel(!newBookPanel)} /> */}

      <div className={styles.newBook} onClick={() => setNewBookPanel(!newBookPanel)}>
        <a title="Add New Book" className="fas fa-plus" />
      </div>
    </div>
  );
}
