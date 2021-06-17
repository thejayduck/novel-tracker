import styles from '../styles/components/footer.module.css'
import { useAppContext } from './appWrapper';
import LogoutButton from './logoutButton'
import FooterButton from './footerButton';

export default function Footer({ data, onExportDataClick, onImportDataClick }) {
    const [state, setState] = useAppContext();

    return (
        <footer
            className={`${styles.footer} ${state.darkMode ? styles.dark : styles.light}`}
        >
            <div>
                {<LogoutButton />}

                <FooterButton
                    title="Toggle Theme"
                    icon={`${state.darkMode ? `fas fa-sun` : `fas fa-moon`}`}
                    onClick={() => setState({ ...state, darkMode: !state.darkMode })}
                />
                <FooterButton title="Export Data" icon="fas fa-download" onClick={onExportDataClick} />
                <FooterButton title="Import Data" icon="fas fa-upload" onClick={onImportDataClick} />

            </div>
            <p>Books: {data.length}</p>
            <div>
                <p className={styles.volumeCount} >Volumes Read: {data.reduce((acc, val) => acc + val.volume, 0)}</p>
                <p>Chapters Read: {data.reduce((acc, val) => acc + val.chapter, 0)}</p>
            </div>
            <div>
                <FooterButton title="TheJayDuck's Github" icon="fab fa-github" href="https://github.com/thejayduck" />
                <FooterButton title="nobbele's Github" icon="fab fa-github" href="https://github.com/nobbele" />
            </div>
        </footer>
    );
}