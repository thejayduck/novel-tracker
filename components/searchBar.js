import styles from '../styles/Searchbar.module.css'

export default function SearchBar({ onInput, query }) {
    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
                <i className={`${styles.icon} fas fa-search ${styles.faSearch}`} />
                <input
                    type="text"
                    placeholder="Search..."
                    name="search"
                    maxLength="50"
                    value={query}
                    onChange={onInput}
                />
            </div>
        </div>
    );
}