import styles from '../styles/components/Searchbar.module.css'

interface SearchBarProps {
    onInput: (query: string) => void,
}

export default function SearchBar({ onInput }: SearchBarProps) {
    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
                <i className={`${styles.icon} fas fa-search ${styles.faSearch}`} />
                <input
                    type="text"
                    placeholder="Search..."
                    name="search"
                    maxLength={50}
                    onChange={e => onInput(e.target.value)}
                />
            </div>
        </div>
    );
}