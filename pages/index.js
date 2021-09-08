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

import BookCard from '../components/cards/bookCard';

const data = {
  title: "That Mysterious Transfer Student Molests People On The Train, Because My Imouto Is A Lovecraftian Horror!",
  image: "http://source.unsplash.com/200x300/?nature"
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
        <BookCard data={data} />
      </div>
    </section>
  );
}