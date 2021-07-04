import styles from '../styles/BrowseBooks.module.css'

import SearchBar from './searchBar'
import OverlayMenu from './overlayMenu'
import BookDetails from './bookDetails'
import CardListWrapper from './cards/cardListWrapper'
import ResultCard from './cards/resultCard'

import { useState, useEffect } from 'react'
import { useAppContext } from './appWrapper'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { useDelayedState } from '../lib/clientHelpers';

export default function BrowseBooks({ onAddClicked, onOutsideClicked, userInfo }) {
  const [state] = useAppContext();

  const [userInput, setUserInput] = useDelayedState("", 250);
  const [searchResults, setSearchResults] = useState([]);

  const [detailedBook, setDetailedBook] = useState(null);


  useEffect(async () => {
    const response = await fetch(`/api/search_book?title=${userInput}`);
    const json = await response.json();

    setSearchResults(json.map(q => ({
      book_id: q.book_id,
      title: q.title,
      cover_url: q.cover_url,
    })));
  }, [userInput]);

  async function onDetailsClick(entry) {
    const response = await fetch(`/api/get_book?id=${entry.book_id}`);
    const json = await response.json();
    setDetailedBook(json.data)
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