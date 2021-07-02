import styles from '../styles/components/footer.module.css'
import { useAppContext } from './appWrapper';
import { FooterButton } from './ui/button';

export default function Footer({ userInfo, setInfoPanel }) {
    const [state, setState] = useAppContext();

    return (
        <footer
            className={`${styles.footer} ${state.darkMode ? styles.dark : styles.light}`}
        >
            <div>
                {userInfo && <FooterButton title="Sign Out" text={userInfo.username} icon="fas fa-fw fa-sign-out-alt" href="/api/me/logout" />}

                <FooterButton
                    title="Toggle Theme"
                    icon={`${state.darkMode ? `fas fa-fw fa-sun` : `fas fa-fw fa-moon`}`}
                    onClick={() => setState(state => ({ ...state, darkMode: !state.darkMode }))}
                />

                <FooterButton title="Information" icon="fas fa-fw fa-info-circle" onClick={() => setInfoPanel(true)} />
                <FooterButton title="Follow the Development" icon="fab fa-fw fa-trello" href="https://trello.com/b/dPv92vJW/" />

            </div>
            {/* <div>
                <p>Books: {data.length}</p>
                <p className={styles.volumeCount} >Volumes Read: {data.reduce((acc, val) => acc + val.volume, 0)}</p>
                <p>Chapters Read: {data.reduce((acc, val) => acc + val.chapter, 0)}</p>
            </div> */}
        </footer>
    );
}