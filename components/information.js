import styles from '../styles/Information.module.css'
import { useAppContext } from './appWrapper';
import OverlayMenu from './overlayMenu'
import Button from './ui/button';

export default function Information({ onOutsideClicked }) {
    const [state] = useAppContext();

    return (
        <OverlayMenu
            className={`${styles.container} ${state.darkMode ? styles.dark : styles.light}`}
            close={onOutsideClicked}
        >
            <div className={styles.main}>
                <img className={styles.icon} src="/book.svg" />
                <br />
                <p>Hello and Thank You for Using 'Novel Tracker'</p>
                <br />
                <h1>How to Add 'Novel Tracker' to Your Homepage</h1>
                <div className={styles.tutorialWrap}>
                    <div className={styles.tutorial}>
                        <h2>Edge</h2>
                        <img src="/tutorial_EDGE.gif" />
                    </div>
                    <div className={styles.tutorial}>
                        <h2>Firefox</h2>
                        <img src="/tutorial_FIREFOX.gif" />
                    </div>
                    <div className={styles.tutorial}>
                        <h2>Chrome</h2>
                        <img src="/tutorial_CHROME.gif" />
                    </div>
                </div>
                <br />
                <h1> Developers </h1>
                <br />
                <div className={styles.buttonWrap}>
                    <Button icon="fab fa-fw fa-github" href="https://github.com/thejayduck" text="TheJayDuck" />
                    <Button icon="fab fa-fw fa-github" href="https://github.com/nobbele" text="nobbele" />
                </div>
                <br />
            </div>
        </OverlayMenu>
    );
}