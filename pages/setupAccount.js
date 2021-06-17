import { useAppContext } from "../components/appWrapper";
import styles from "../styles/SetupAccount.module.css"

export default function SetupAccount() {
    const [state] = useAppContext();

    return (
        <main className={`${styles.main} ${state.darkMode ? styles.dark : styles.light}`} >
            <div>
                <img className={styles.logo} src='../book.svg' />
                <div className={styles.formSection} >
                    <h3>Please Enter Your Username to Finish Setting Up Your "Light Novel Tracker" Account </h3>
                    <input type="text" placeholder="Username..." autoComplete="off" min="0" />
                </div>
                <div className={styles.submit}>
                    <a>
                        Complete Account!
                    </a>
                    <i className="fas fa-user-alt" />
                </div>
            </div>
        </main >
    );
}