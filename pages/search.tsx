// @ts-nocheck
import styles from "styles/Search.module.scss";

import dynamic from "next/dynamic";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import genres from "genres.json";

import React, { useEffect, useState } from "react";

import Overlay from "components/overlay";
import PageBase from "components/pageBase";
import { Subtitle } from "components/subtitle";
import { InputFieldNonManaged } from "components/ui/inputFieldNonManaged";
import { OptionSelect } from "components/ui/optionSelect";

import { useApi, useDelayedState } from "lib/clientHelpers";
import { serverSide_checkAuth } from "lib/serverHelpers";

const VolumeCard = dynamic(() => import("components/cards/card"));

export async function getServerSideProps(context) {
  const [redirect, info] = await serverSide_checkAuth(context, false, false, false);

  return redirect ? redirect : {
    props: {
      user_info: info,
    },
  };
}

export default function Search({ user_info }) {
  const [filterMenu, setFilterMenu] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useDelayedState<string>(null, 500);
  const [filter, setFilter] = useState({
    year: "Any",
    genre: "Any",
    releaseStatus: "Any",
  });

  const api = useApi();

  useEffect(() => {
    if (searchQuery != null && searchQuery.length > 0) {
      api.searchBook(searchQuery, filter, books => {
        setSearchResults(books);
      });
    } else {
      // TODO api to list all books?
      api.searchBook("", filter, books => {
        setSearchResults(books);
      });
    }
  }, [searchQuery, filter]);

  return (
    <>
      <Head>
        <title>Search · Novel Tracker</title>
      </Head>

      <PageBase user_info={user_info}>
        <div className={`${styles.inputWrap} flex`}>
          <InputFieldNonManaged placeHolder="Search..." onChange={(e: unknown) => setSearchQuery(e.target.value)} />
          <a onClick={() => setFilterMenu(prev => !prev)} className={"fontLarge"} ><i className='bx bx-filter-alt' /></a>

          <AnimatePresence>
            {filterMenu &&
              <Overlay className={styles.filterOverlay} title="Filter Results" onOutsideClick={() => setFilterMenu(false)} >
                <OptionSelect
                  title="Release Status"
                  options={["Any", "Finished", "Releasing", "Cancelled", "Hiatus", "Coming Soon"]}
                  onChange={(e: unknown) => setFilter(oldFilter => ({ ...oldFilter, releaseStatus: e.target.value }))}
                />
                <OptionSelect
                  title="Genre"
                  options={
                    genres
                  }
                  onChange={(e: unknown) => setFilter(oldFilter => ({ ...oldFilter, genre: e.target.value }))}
                />
                <OptionSelect
                  title="Year"
                  options={[
                    "Any",
                    ...[...Array(20).keys()].map((n: number) => (new Date(Date.now()).getUTCFullYear() + 1) - n)
                  ]}
                  onChange={(e: unknown) => setFilter(oldFilter => ({ ...oldFilter, year: e.target.value }))}
                />
              </Overlay>
            }
          </AnimatePresence>
        </div>
        <Subtitle text="Results" />
        <div className={`${styles.results} flex flextRight`}>
          {
            searchResults.map(searchResult => (
              <VolumeCard key={searchResult._id} data={searchResult} />
            ))
          }
        </div>
      </PageBase >
    </>
  );
}