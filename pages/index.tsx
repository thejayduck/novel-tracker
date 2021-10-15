// @ts-nocheck
import Head from "next/head";

import React from "react";

// Components
import PageBase from "components/pageBase";

import { serverSide_checkAuth } from "lib/serverHelpers";

export async function getServerSideProps(context) {
  const [redirect, info] = await serverSide_checkAuth(context, true, false, false);

  console.log(info);

  return redirect || {
    redirect: {
      destination: `/user/${info.user_id}`,
      permanent: false,
    }
  };
}

export default function Home({ }) {
  return (
    <>
      <Head>
        <title>Library · Novel Tracker</title>
      </Head>
      <PageBase user_info={null}>
        <p>Redirecting to profile...</p>
      </PageBase>
    </>
  );
}