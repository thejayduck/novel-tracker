import styles from '../styles/components/footer.module.css'
import { useAppContext } from './appWrapper';
import FooterButton from './ui/footerButton';

export default function Footer({ data, showModButtons }) {
    const [state, setState] = useAppContext();

    return (
        <footer
            className={`${styles.footer} ${state.darkMode ? styles.dark : styles.light}`}
        >
            <div>
                <FooterButton title="Sign Out" icon="fas fa-user-alt-slash" href="/api/me/logout" />

                {showModButtons && <FooterButton
                    title="Submit Book"
                    icon="fas fa-feather-alt"
                    href="/submitBook"
                />}

                <FooterButton
                    title="Toggle Theme"
                    icon={`${state.darkMode ? `fas fa-sun` : `fas fa-moon`}`}
                    onClick={() => setState({ ...state, darkMode: !state.darkMode })}
                />

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