import styles from '../styles/NewBook.module.css'

import SearchBar from './searchBar'
import { useState, useEffect } from 'react'
import OverlayMenu from './overlayMenu'
import { useAppContext } from './appWrapper'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import BookDetails from './bookDetails'
import CardListWrapper from './cards/cardListWrapper'
import ResultCard from './cards/resultCard'
import { useDelayedState } from '../lib/clientHelpers';

export default function NewBook({ onAddClicked, onOutsideClicked }) {
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
      coverUrl: q.cover_url,
    })));
  }, [userInput]);

  async function onDetailsClick(entry) {
    const response = await fetch(`/api/get_book?id=${entry.book_id}`);
    const json = await response.json();
    setDetailedBook(json.data)
  }

  return (
    <div>
      <OverlayMenu
        className={`${styles.container} ${state.darkMode ? styles.dark : styles.light}`}
        close={onOutsideClicked}
      >
        <SearchBar onInput={setUserInput} />
        <AnimateSharedLayout>
          <CardListWrapper>
            {searchResults.map(entry => (
              <ResultCard key={entry.book_id} entry={entry} onAddClick={onAddClicked} onClick={entry => onDetailsClick(entry)} />
            ))}
          </CardListWrapper>
        </AnimateSharedLayout>
      </OverlayMenu>

      <AnimatePresence>
        {detailedBook && (
          <BookDetails
            book={detailedBook}
            onExit={() => setDetailedBook(null)}
            onOutsideClicked={() => setDetailedBook(null)}
            onAddClicked={() => onAddClicked()}
          />
        )}
      </AnimatePresence>
    </div>
  );
}