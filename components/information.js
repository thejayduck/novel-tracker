import styles from '../styles/Information.module.css'
import OverlayMenu from './overlayMenu'
import Button from './ui/button';

export default function Information({ onOutsideClicked }) {

    return (
        <OverlayMenu
            className={`${styles.container}`}
            close={onOutsideClicked}
        >
            <img width="128" height="128" src="/book.svg" />
            <br />
            <p>Hello and Thank You for Using 'Novel Tracker'</p>
            <br />
            <h1>How to Add 'Novel Tracker' to Your Homepage</h1>
            <div className={styles.tutorialWrap}>
                <div className={styles.tutorial}>
                    <h2>Chrome</h2>
                    <video muted={true} playsInline={true} src="/tutorial_CHROME.mp4" width="200px" autoPlay={true} loop={true} />
                </div>
                <div className={styles.tutorial}>
                    <h2>Edge</h2>
                    <video muted={true} playsInline={true} src="/tutorial_EDGE.mp4" width="200px" autoPlay={true} loop={true} />
                </div>
                <div className={styles.tutorial}>
                    <h2>Firefox</h2>
                    <video muted={true} playsInline={true} src="/tutorial_FIREFOX.mp4" width="200px" autoPlay={true} loop={true} />
                </div>
                <br />
            </div>
            <h1> Developers </h1>
            <br />
            <div className={styles.buttonWrap}>
                <Button icon="fab fa-fw fa-github" href="https://github.com/thejayduck" text="TheJayDuck" newTab={true} />
                <Button icon="fab fa-fw fa-github" href="https://github.com/nobbele" text="nobbele" newTab={true} />
            </div>
            <br />
        </OverlayMenu>
    );
}