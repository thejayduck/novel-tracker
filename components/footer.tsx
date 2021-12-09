// @ts-nocheck
import styles from "styles/components/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.title}>Novel Tracker</span>

        <div className={`${styles.social} flexEvenly flex`}>
          <section >
            <h3>Developers</h3>
            <a aria-label="Github - TheJayDuck" target="_blank" title="Github - TheJayDuck" href="https://github.com/thejayduck" rel="noreferrer">
                TheJayDuck
            </a>
            <a aria-label="Github - nobbele" target="_blank" title="Github - nobbele" href="https://github.com/nobbele" rel="noreferrer">
                nobbele
            </a>
          </section>

          <section>
            <h3>Navigation</h3>
            <a aria-label="FAQ" title="FAQ" href="/">
                FAQ
            </a>
            <a aria-label="Report Bug" title="Report Bug" target="_blank" href="https://github.com/thejayduck/novel-tracker/issues" rel="noreferrer">
                Report Bug              
            </a>
          </section>

          <section>
            <h3>Other</h3>
            <a aria-label="Trello" target="_blank" title="Trello" href="https://trello.com/b/dPv92vJW" rel="noreferrer">
                Trello
            </a>
            <a aria-label="Source Code" target="_blank" title="Github" href="https://github.com/thejayduck/novel-tracker/" rel="noreferrer">
                Source Code
            </a>
          </section>
        </div>
        
      </div>
    </footer>
  );
}