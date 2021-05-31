import styles from '../styles/NewBook.module.css'
import cardStyle from '../styles/BookCard.module.css'
import ResultCard from '../components/resultCard'
import jikanjs from 'jikanjs'
import { useState, useEffect } from 'react'
import { CardListWrapper } from './index'

// jikanjs.search("manga", "get").then(({ results }) => {
//   results.forEach(ln => {
//     data.push({
//       mal_id: ln.mal_id,
//       title: ln.title,
//       coverUrl: ln.image_url,
//       type: ln.type,
//       chapter: 1,
//       volume: 0,
//       status: "Reading",
//     });
//   });
// });

function SearchBar({ onSearchQueryChange }) {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <i className={`${styles.icon} fas fa-search ${styles.faSearch}`} />
        <input
          type="text"
          onChange={(e) => onSearchQueryChange(e.target.value)}
          placeholder="Search Manga/Novel..."
          name="search"
          maxLength="50"
        />
      </div>
    </div>
  );
}

export default function NewBook({ onAddClicked }) {

  const [userInput, setUserInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [queryTimeout, setQueryTimeout] = useState(null);

  useEffect(() => {
    clearTimeout(queryTimeout);
    if (userInput.length >= 3) {
      setQueryTimeout(setTimeout(() => {
        jikanjs
          .search("manga", userInput)
          .then(({ results }) => {
            setSearchResults(
              results.map((ln) => ({
                mal_id: ln.mal_id,
                title: ln.title,
                synopsis: ln.synopsis,
                coverUrl: ln.image_url,
                type: ln.type,
                chapter: 0,
                volume: 0,
                status: "Reading",
              }))
            );
          })
          .catch((e) => console.error(e));
      }, 600));
    } else {
      setSearchResults([]);
    }
  }, [userInput]);

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.container}>
          <SearchBar onSearchQueryChange={setUserInput} />
          <CardListWrapper>
            {searchResults.map((entry) => (
              <li key={entry.mal_id}>
                <div className={cardStyle.activityEntry}>
                  <ResultCard entry={entry} onAddClicked={onAddClicked} />
                </div>
              </li>
            ))}
          </CardListWrapper>
        </div>
      </div>
    </div>
  );
}