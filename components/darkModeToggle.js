import styles from '../styles/components/footer.module.css'
import { useAppContext } from "./appWrapper";

export default function DarkModeToggle() {

    const [state, setState] = useAppContext();

    return (
        <button title="Toggle Theme" className={`${state.darkMode ? `fas fa-sun` : `fas fa-moon`} ${styles.footerButton}`} onClick={() => setState({ ...state, darkMode: !state.darkMode })
        } />
    );
}
