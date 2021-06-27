import styles from '../styles/Home.module.css'
import PageBase from '../components/pageBase';
import NewBook from '../components/newBook'
import Information from '../components/information';

/* Components */
import TopNav from '../components/topNav';
import Footer from '../components/footer'
import CardListWrapper from '../components/cards/cardListWrapper';
import LibraryCard from '../components/cards/libraryCard';
import QuickAlert from '../components/quickAlert';

/* Other Imports */
import Fuse from 'fuse.js'
import { useState, useEffect, useMemo } from 'react'
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
  // const [addBookPanel, setAddBookPanel] = useState(false);
  // const [informationPanel, setInformationPanel] = useState(false);
  const [data, setData] = useState([]);

  const [query, setQuery] = useDelayedState('', 250);

  const bookResults = useMemo(() => {
    if (!query) {
      return data;
    }
    const fuse = new Fuse(data, {
      keys: [
        'title',
        'title_romanized'
      ],
    });
    const fuseResults = fuse.search(query);
    return fuseResults.map(result => result.item);
  }, [query, data]);

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
    <PageBase onDataUpdate={updateData} userInfo={user_info} setSearchQuery={setQuery}>
      {/* <TopNav
        showModButtons={user_info.moderation_level >= 2}
        onAddBook={() => setAddBookPanel(prev => !prev)}
        onSubmitBook={`/submitBook`}
        onSearch={e => setQuery(e.target.value)}
      /> */}
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

      {/* {informationPanel && <Information />}

      <AnimatePresence>
        {addBookPanel && (
          <NewBook
            onAddClicked={() => updateData()}
            onOutsideClicked={() => setAddBookPanel(false)}
          />
        )}
      </AnimatePresence> */}
      {/* <Footer data={data} /> */}

      {/* <QuickAlert message="A New Book Has Been Added!" icon="fas fa-check" /> */}

    </PageBase>
  );
}
