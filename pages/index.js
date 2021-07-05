// import styles from '../styles/Home.module.css'
import PageBase from '../components/pageBase';

/* Components */
import CardListWrapper from '../components/cards/cardListWrapper';
import LibraryCard from '../components/cards/libraryCard';

/* Other Imports */
import Fuse from 'fuse.js'
import { useState, useEffect, useMemo } from 'react'
import { AnimateSharedLayout } from 'framer-motion'
import { useApi, useDelayedState } from '../lib/clientHelpers';
import { serverSide_checkAuth } from '../lib/serverHelpers';

export async function getServerSideProps(context) {
  const [auth, info] = await serverSide_checkAuth(context, true, false, false);
  return auth || {
    props: {
      user_info: info,
    },
  };
}

export default function Home({ user_info }) {
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

  const api = useApi();

  async function updateData() {
    const infos = await api.getUserBookInfos();
    setData(infos)
  }

  useEffect(updateData, [])

  return (
    <PageBase onDataUpdate={updateData} userInfo={user_info} setSearchQuery={setQuery}>
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
    </PageBase>
  );
}
