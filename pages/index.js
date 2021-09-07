import styles from 'styles/Home.module.scss'

// Components
import PageBase from 'components/pageBase';
import { Subtitle } from 'components/header';
import Head from 'next/head'
import { serverSide_checkAuth } from 'lib/serverHelpers'

export async function getServerSideProps(context) {
  const [redirect, info] = await serverSide_checkAuth(context, true, false, false);

  return redirect ? redirect : {
    props: {
      user_info: info,
    },
  }
}

export default function Home({ user_info }) {
  return (
    <>
      <Head>
        <title>Library · Novel Tracker</title>
      </Head>

      <PageBase user_info={user_info}>
        <section className={styles.section}>
          <Subtitle text="Reading" icon={`bx bx-book-open`} />
          <div className={styles.container} >

          </div>
        </section>
        <section className={styles.section}>
          <Subtitle text="Planning" icon={`bx bx-bookmarks`} />
          <div className={styles.container} >

          </div>
        </section>
        <section className={styles.section}>
          <Subtitle text="Finished" icon={`bx bx-check`} />
          <div className={styles.container} >

          </div>
        </section>
        <section className={styles.section}>
          <Subtitle text="Dropped" icon={`bx bx-trash-alt`} />
          <div className={styles.container} >

          </div>
        </section>
      </PageBase>
    </>
  );
}
