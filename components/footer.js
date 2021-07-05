import styles from '../styles/components/footer.module.css'
import { FooterButton } from './ui/button';

function flipTheme(theme) {
    if (theme == 'light')
        return 'dark';
    if (theme == 'dark')
        return 'light';
}

export default function Footer({ userInfo, setInfoPanel, currentTheme, setTheme }) {
    return (
        <footer
            className={styles.footer}
        >
            <div className={styles.elementWrap}>
                {userInfo && <FooterButton title="Sign Out" text={userInfo.username} icon="fas fa-fw fa-sign-out-alt" href="/api/me/logout" />}

                <FooterButton
                    title="Toggle Theme"
                    icon={`${currentTheme ? `fas fa-fw fa-sun` : `fas fa-fw fa-moon`}`}
                    onClick={() => {
                        setTheme(prev => flipTheme(prev));
                    }}
                />

                <FooterButton title="Information" icon="fas fa-fw fa-info-circle" onClick={() => setInfoPanel(true)} />
                <FooterButton title="Follow the Development" icon="fab fa-fw fa-trello" href="https://trello.com/b/dPv92vJW/" newTab={true} />

            </div>
            {/* <div className={styles.elementWrap}>
                <p>Books: {data.length}</p>
                <p>Volumes Read: {data.reduce((acc, val) => acc + val.volume, 0)}</p>
                <p>Chapters Read: {data.reduce((acc, val) => acc + val.chapter, 0)}</p>
            </div> */}
        </footer>
    );
}