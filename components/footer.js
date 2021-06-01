import styles from '../styles/Home.module.css'

export default function Footer({ data, darkmode, onDarkModeClick, onExportDataClick, onImportDataClick }) {
    return (
        <footer
            className={`${styles.footer} ${darkmode ? styles.dark : styles.light}`}
        >
            <div>
                <button title="Toggle Theme" className={`fas fa-moon ${styles.themeToggle}`} onClick={onDarkModeClick} />
                <button title="Export Data" className={`fas fa-download ${styles.themeToggle}`} onClick={onExportDataClick} />
                <button title="Import Data" className={`fas fa-upload ${styles.themeToggle}`} onClick={onImportDataClick} />
            </div>
            <p>Books: {data.length}</p>
            <div>
                <p className={styles.volumeCount} >Volumes Read: {data.reduce((acc, val) => acc + val.volume, 0)}</p>
                <p>Chapters Read: {data.reduce((acc, val) => acc + val.chapter, 0)}</p>
            </div>
            <a
                title="Check Out TheJayDuck's Github"
                href="https://github.com/thejayduck"
                className="fab fa-github"
                target="_blank"
            />
            <a
                title="Check Out nobbele's Github"
                href="https://github.com/nobbele"
                className="fab fa-github"
                target="_blank"
            />
        </footer>
    );
}