import styles from '../styles/Information.module.css'
import { useAppContext } from './appWrapper';
import OverlayMenu from './overlayMenu'

export default function Information({ onOutsideClicked }) {
    const [state] = useAppContext();

    return (
        <div>
            <OverlayMenu
                className={`${styles.container} ${state.darkMode ? styles.dark : styles.light}`}
                close={onOutsideClicked}
            >
                <div>
                    <p>Hello There</p>
                </div>
            </OverlayMenu>
        </div>
    );
}