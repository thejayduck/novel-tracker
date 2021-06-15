import styles from '../styles/NewBook.module.css'
import cardStyle from '../styles/BookCard.module.css'

import ResultCard from '../components/resultCard'
import SearchBar from '../components/searchBar'
import jikanjs from 'jikanjs'
import { useState, useEffect } from 'react'
import { CardListWrapper } from './index'
import OverlayMenu from '../components/overlayMenu'
import { useAppContext } from '../components/appWrapper'

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

export default function NewBook({ onAddClicked }) {

  const [state] = useAppContext();

  const [userInput, setUserInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [queryTimeout, setQueryTimeout] = useState(null);

  useEffect(() => {
    clearTimeout(queryTimeout);
    if (userInput !== null) {
      setQueryTimeout(setTimeout(async () => {
        const response = await fetch(`/api/search_book?title=${userInput}`);
        const json = await response.json();
        console.log(json);

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
        <CardListWrapper>
          {searchResults.map((entry) => (
            <li key={entry.mal_id}>
              <div className={cardStyle.activityEntry}>
                <ResultCard entry={entry} onAddClicked={onAddClicked} />
              </div>
            </li>
          ))}
        </CardListWrapper>
      </OverlayMenu>
    </div>
  );
}