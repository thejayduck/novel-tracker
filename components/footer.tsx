// @ts-nocheck
import styles from 'styles/components/footer.module.scss'

function flipTheme(theme) {
    if (theme == 'light')
        return 'dark';
    if (theme == 'dark')
        return 'light';
}

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <span className={styles.title}>Novel Tracker</span>

                <ul className={styles.social}>
                    <li><a aria-label="Github - TheJayDuck" target="_blank" title="Github - TheJayDuck" href="https://github.com/thejayduck" rel="noreferrer"><i className={"bx bxl-github bx-sm"} /></a></li>
                    <li><a aria-label="Trello" target="_blank" title="Trello" href="https://trello.com/b/dPv92vJW" rel="noreferrer"><i className={"bx bxl-trello bx-sm"} /></a></li>
                    <li><a aria-label="Github - nobbele" target="_blank" title="Github - nobbele" href="https://github.com/nobbele" rel="noreferrer"><i className={"bx bxl-github bx-sm"} /></a></li>
                </ul>
            </div>
        </footer>
    );
}