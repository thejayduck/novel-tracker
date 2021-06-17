import styles from '../styles/NewBook.module.css'
import cardStyle from '../styles/components/BookCard.module.css'

import ResultCard from '../components/resultCard'
import SearchBar from '../components/searchBar'
import { useState, useEffect } from 'react'
import { CardListWrapper } from './index'
import OverlayMenu from '../components/overlayMenu'
import { useAppContext } from '../components/appWrapper'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import BookDetails from '../components/bookDetails'

export default function NewBook({ onAddClicked }) {
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
      >
        <SearchBar onInput={(e) => setUserInput(e.target.value)} />
        <AnimateSharedLayout>
          <CardListWrapper>
            {searchResults.map(entry => (
              <motion.li
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                layout
                key={entry.id}
              >
                <div className={cardStyle.activityEntry}>
                  <ResultCard entry={entry} onAddClicked={onAddClicked} onDetailsClicked={entry => setDetailedBook(entry)} />
                </div>
              </motion.li>
            ))}
          </CardListWrapper>
        </AnimateSharedLayout>
      </OverlayMenu>

      <AnimatePresence>
        {detailedBook && (
          <BookDetails
            book={detailedBook}
            onExit={() => setDetailedBook(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}