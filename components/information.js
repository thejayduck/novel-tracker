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
                <h1> Developers </h1>
                <br />
                <div className={styles.buttonWrap}>
                    <Button icon="fab fa-github" href="https://github.com/thejayduck" text="TheJayDuck" />
                    <Button icon="fab fa-github" href="https://github.com/nobbele" text="nobbele" />
                </div>
                <br />
            </div>
        </OverlayMenu>
    );
}