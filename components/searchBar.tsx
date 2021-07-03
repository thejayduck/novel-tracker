import styles from '../styles/components/Searchbar.module.css'

interface SearchBarProps {
    onInput: (query: string) => void,
}

export default function SearchBar({ onInput }: SearchBarProps) {
    return (
        <div className={styles.searchBar}>
            <i className={`${styles.icon} fas fa-fw fa-search`} />
            <input
                className={styles.inputField}
                type="text"
                placeholder="Search..."
                name="search"
                onChange={e => onInput(e.target.value)}
            />
        </div>
    );
}