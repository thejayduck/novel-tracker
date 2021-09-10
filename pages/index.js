import styles from 'styles/Home.module.scss'

// Components
import PageBase from 'components/pageBase';
import { Subtitle } from 'components/header';
import { serverSide_checkAuth } from 'lib/serverHelpers'

import Head from 'next/head'
import dynamic from 'next/dynamic'

const BookCard = dynamic(() => import("../components/cards/bookCard"))

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
        <Section title="Reading" icon="bx bx-book-open" />
        <Section title="Planning" icon="bx bx-bookmarks" />
        <Section title="Finished" icon="bx bx-check" />
        <Section title="Dropped" icon="bx bx-trash-alt" />
      </PageBase>
    </>
  );
}

function Section({ title, icon }) {
  return (
    <section className={styles.section}>
      <Subtitle text={title} icon={icon} />
      <div className={`${styles.sectionContainer} flex`} >
        <BookCard />
      </div>
    </section>
  );
}