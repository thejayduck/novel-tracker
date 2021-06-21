import styles from '../styles/NewBook.module.css'

import CardListWrapper, { ResultCard } from './cardElement'
import SearchBar from './searchBar'
import { useState, useEffect } from 'react'
import OverlayMenu from './overlayMenu'
import { useAppContext } from './appWrapper'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import BookDetails from './bookDetails'

export default function NewBook({ onAddClicked, onOutsideClicked }) {
  const [state] = useAppContext();

  const [userInput, setUserInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [queryTimeout, setQueryTimeout] = useState(null);

  const [detailedBook, setDetailedBook] = useState(null);

  useEffect(() => {
    clearTimeout(queryTimeout);
    if (userInput !== null) {
      setQueryTimeout(setTimeout(async () => {
        const response = await fetch(`/api/search_book?title=${userInput}`);
        const json = await response.json();

        setSearchResults(json.map(q => ({
          id: q.id,
          title: q.title,
          coverUrl: q.cover_url,
        })));
      }, 600));
    } else {
      setSearchResults([]);
    }
  }, [userInput]);

  return (
    <div>
      <OverlayMenu
        className={`${styles.container} ${state.darkMode ? styles.dark : styles.light}`}
        close={onOutsideClicked}
      >
        <SearchBar onInput={(e) => setUserInput(e.target.value)} />
        <AnimateSharedLayout>
          <CardListWrapper>
            {searchResults.map(entry => (
              <ResultCard key={entry?.id} entry={entry} onAddClick={onAddClicked} onClick={entry => setDetailedBook(entry)} />
            ))}
          </CardListWrapper>
        </AnimateSharedLayout>
      </OverlayMenu>

      <AnimatePresence>
        {detailedBook && (
          <BookDetails
            book={detailedBook}
            onExit={() => setDetailedBook(null)}
            onOutsideClicked={() => setDetailedBook(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}