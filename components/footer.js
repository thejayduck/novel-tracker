import styles from '../styles/components/footer.module.css'
import { useAppContext } from './appWrapper';
import { FooterButton } from './ui/button';
import Information from './information';

export default function Footer({ data, showModButtons }) {
    const [state, setState] = useAppContext();

    return (
        <footer
            className={`${styles.footer} ${state.darkMode ? styles.dark : styles.light}`}
        >
            <div>
                <FooterButton className={styles.footerButton} title="Sign Out" text="TheJayDuck" icon="fas fa-sign-out-alt" href="/api/me/logout" />

                {/* {showModButtons && <FooterButton
                    title="Submit Book"
                    icon="fas fa-feather-alt"
                    href="/submitBook"
                />} */}

                <FooterButton
                    className={styles.footerButton}
                    title="Toggle Theme"
                    icon={`${state.darkMode ? `fas fa-sun` : `fas fa-moon`}`}
                    href="javascript:void(0);"
                    onClick={() => setState(state => ({ ...state, darkMode: !state.darkMode }))}
                />

                <FooterButton className={styles.footerButton} title="Information" icon="fas fa-info-circle" href="javascript:void(0);" />
                {/* <FooterButton title="TheJayDuck's Github" icon="fab fa-github" href="https://github.com/thejayduck" />
                <FooterButton title="nobbele's Github" icon="fab fa-github" href="https://github.com/nobbele" /> */}
            </div>
            {/* <div>
                <p>Books: {data.length}</p>
                <p className={styles.volumeCount} >Volumes Read: {data.reduce((acc, val) => acc + val.volume, 0)}</p>
                <p>Chapters Read: {data.reduce((acc, val) => acc + val.chapter, 0)}</p>
            </div> */}
        </footer>
    );
}