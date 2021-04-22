import Head from 'next/head'
import styles from '../styles/newPage.module.css'

export default function Data() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Book Library</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
        <meta name="mobile-web-app-capable" content="yes"/>
      </Head>

      <main className={styles.main}>
        <div className={styles.searchContainer}>
          <form action="/" className={styles.searchBar}>
            <input type="text" placeholder="Search" name="search"/>
            {/* <button type="submit"><i class="fa fa-search"></i></button> */}
          </form>
        </div>
        <div className={styles.activityFeed}>
          <div className={styles.activityEntry}>
            <div className={styles.wrap}>
              <div className={styles.list}>
                <img className={styles.cover} src="https://i.ibb.co/2dcp1RR/CQO6-Nvu-Uc-AAz-Q1-Y.jpg"/>
                <div className={styles.details}>
                  <div className={styles.title}>Pretty Boy Detective</div>
                  <div className={styles.status}>Current Chapter: 25</div>
                </div>
                <div className={styles.progress}>
                  <a className={`${styles.icon} fas fa-plus ${styles.faPlus}`}></a>
                  <a className={`${styles.icon} fas fa-minus ${styles.faMinus}`}></a>
                </div>
              </div>

            </div>
          </div>
        
        
        
        </div>
      </main>
      <a className={styles.newBook} href="/newBook">
        Add New Book
      </a>

      <footer className={styles.footer}>
        <p>Total Pages Read: x</p>
        <p>Finished Books: x</p>
      </footer>
    </div>
  )
}
