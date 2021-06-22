import styles from '../styles/Home.module.css'
import PageBase from './pageBase';
import NewBook from '../components/newBook'

/* Components */
import SearchBar from '../components/searchBar'
import { FloatingButton } from '../components/ui/button'
import Footer from '../components/footer'
import CardListWrapper from '../components/cards/cardListWrapper';
import LibraryCard from '../components/cards/libraryCard';

/* Other Imports */
import Fuse from 'fuse.js'
import { useState, useEffect } from 'react'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { parse } from 'cookie'
import { getUserInfo, withUserId } from '../lib/db'
import { useDelayedState } from '../lib/clientHelpers';


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
  const info = await withUserId(token, async (user_id) => await getUserInfo(user_id));
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
  const [newBookPanel, setNewBookPanel] = useState(false);
  const [data, setData] = useState([]);

  const [query, setQuery] = useDelayedState('', 250);

  const fuse = new Fuse(data, {
    keys: [
      'title',
      'title_romanized'
    ],
  });

  const fuseResults = fuse.search(query);
  const bookResults = query ? fuseResults.map(result => result.item) : data;

  function onSearch(query) {
    setQuery(query);
  }

  async function updateData() {
    console.log("Updating data");
    const response = await fetch("/api/me/get_book_infos");
    const json = await response.json();
    if (json.status != "OK") {
      throw json;
    }
    const infos = json.data;
    setData(infos)
  }

  useEffect(updateData, [])


  return (
    <PageBase>
      <SearchBar onInput={onSearch} />
      <div className={styles.container}>
        <AnimateSharedLayout>
          <CardListWrapper
            data={data}
          >
            {bookResults.map(entry => (
              <LibraryCard
                key={entry.book_id}
                entry={entry}
                onDelete={() => updateData()}
              />
            ))}
          </CardListWrapper>
        </AnimateSharedLayout>
      </div>

      <Footer
        data={data}
        showModButtons={user_info.moderation_level >= 2}
      />
      <AnimatePresence>
        {newBookPanel && (
          <NewBook
            onAddClicked={() => updateData()}
            onOutsideClicked={() => setNewBookPanel(false)}
          />
        )}
      </AnimatePresence>
      <FloatingButton hoverTitle="Add New Book" icon="fas fa-plus" onClick={() => setNewBookPanel(!newBookPanel)} />

      {/* <QuickAlert message="A New Book Has Been Added!" icon="fas fa-check" /> */}

    </PageBase>
  );
}
