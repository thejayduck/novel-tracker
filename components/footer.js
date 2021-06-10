import styles from '../styles/components/footer.module.css'
import { useAppContext } from './appWrapper';
import DarkModeToggle from './darkModeToggle'

export default function Footer({ data, onExportDataClick, onImportDataClick }) {

    const [state] = useAppContext();

    return (
        <footer
            className={`${styles.footer} ${state.darkMode ? styles.dark : styles.light}`}
        >
            <div>
                <DarkModeToggle />
                <button title="Export Data" className={`fas fa-download ${styles.footerButton}`} onClick={onExportDataClick} />
                <button title="Import Data" className={`fas fa-upload ${styles.footerButton}`} onClick={onImportDataClick} />
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