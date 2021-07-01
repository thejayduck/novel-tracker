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
                {userInfo && <FooterButton className={styles.footerButton} title="Sign Out" text={userInfo.username} icon="fas fa-fw fa-sign-out-alt" href="/api/me/logout" />}

                <FooterButton
                    className={styles.footerButton}
                    title="Toggle Theme"
                    icon={`${state.darkMode ? `fas fa-fw fa-sun` : `fas fa-fw fa-moon`}`}
                    onClick={() => setState(state => ({ ...state, darkMode: !state.darkMode }))}
                />

                <FooterButton className={styles.footerButton} title="Information" icon="fas fa-fw fa-info-circle" onClick={() => setInfoPanel(true)} />
            </div>
            {/* <div>
                <p>Books: {data.length}</p>
                <p className={styles.volumeCount} >Volumes Read: {data.reduce((acc, val) => acc + val.volume, 0)}</p>
                <p>Chapters Read: {data.reduce((acc, val) => acc + val.chapter, 0)}</p>
            </div> */}
        </footer>
    );
}