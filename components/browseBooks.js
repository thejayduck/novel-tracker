import styles from '../styles/BrowseBooks.module.css'

import SearchBar from './searchBar'
import OverlayMenu from './overlayMenu'
import BookDetails from './bookDetails'
import CardListWrapper from './cards/cardListWrapper'
import ResultCard from './cards/resultCard'

import { useState, useEffect } from 'react'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { useApi, useDelayedState } from '../lib/clientHelpers';

export default function BrowseBooks({ onAddClicked, onOutsideClicked, userInfo }) {
  const [userInput, setUserInput] = useDelayedState("", 250);
  const [searchResults, setSearchResults] = useState([]);

  const [detailedBook, setDetailedBook] = useState(null);

  const api = useApi();


  useEffect(async () => {
    const data = await api.searchBook(userInput);

    setSearchResults(data.map(q => ({
      book_id: q._id,
      title: q.title,
      cover_url: q.cover_url,
    })));
  }, [userInput]);

  async function onDetailsClick(entry) {
    const data = await api.getBook(entry.book_id);
    setDetailedBook(data);
  }

  return (
    <>
      <OverlayMenu
        className={`${styles.container}`}
        close={onOutsideClicked}
      >
        {/* <InputField onChange={e => setUserInput(e.target.value)} /> */}

        <SearchBar onInput={setUserInput} />
        <AnimateSharedLayout>
          <CardListWrapper>
            {searchResults.map(entry => (
              <ResultCard userInfo={userInfo}
                key={entry.book_id}
                entry={entry}
                onAddClick={onAddClicked}
                onClick={entry => onDetailsClick(entry)} />
            ))}
          </CardListWrapper>
        </AnimateSharedLayout>
      </OverlayMenu>

      <AnimatePresence>
        {detailedBook && (
          <BookDetails
            userInfo={userInfo}
            book={detailedBook}
            onExit={() => setDetailedBook(null)}
            onOutsideClicked={() => setDetailedBook(null)}
            onAddClicked={() => onAddClicked()}
          />
        )}
      </AnimatePresence>
    </>
  );
}