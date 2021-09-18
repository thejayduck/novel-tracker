// @ts-nocheck
import styles from "styles/Search.module.scss";

import dynamic from "next/dynamic";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";

import React, { useEffect, useState } from "react";

import { DesktopOverlay, MobileOverlay } from "components/overlayMenu";
// Components
import PageBase from "components/pageBase";
import { Subtitle } from "components/subtitle";
import { InputFieldNonManaged, OptionSelect } from "components/ui/inputField";

import { useApi, useDelayedState } from "lib/clientHelpers";
import { serverSide_checkAuth } from "lib/serverHelpers";

const VolumeCard = dynamic(() => import("components/cards/volumeCard"));

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
    console.log(filter);
    if (searchQuery != null && searchQuery.length > 0) {
      api.searchBook(searchQuery, filter, books => {
        console.log(books);
        setSearchResults(books);
      });
    } else {
      // TODO api to list all books?
      api.searchBook("", filter, books => {
        console.log(books);
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
              <DesktopOverlay title="Filter Results" className={styles.filterOverlay}>
                <OptionSelect
                  title="Release Status"
                  options={["Any", "Finished", "Releasing", "Cancelled", "Hiatus", "Coming Soon"]}
                  onChange={(e: unknown) => setFilter(oldFilter => ({ ...oldFilter, releaseStatus: e.target.value }))}
                />
                <OptionSelect
                  title="Genre"
                  options={[
                    "Any",
                    "Action",
                    "Demons",
                    "Game",
                    "Horror",
                    "Mecha",
                    "Police",
                    "Sci-Fi",
                    "Shounen Ai",
                    "Supernatural",
                    "Adventure",
                    "Gender Bender",
                    "Josei",
                    "Military",
                    "Psychological",
                    "Seinen",
                    "Slice of Life",
                    "Thriller",
                    "Drama",
                    "Harem",
                    "Kids",
                    "Music",
                    "Romance",
                    "Shoujo",
                    "Space",
                    "Vampire",
                    "Comedy",
                    "Ecchi",
                    "Hentai",
                    "Magic",
                    "Mystery",
                    "Samurai",
                    "Shoujo Ai",
                    "Sports",
                    "Yaoi",
                    "Dementia",
                    "Fantasy",
                    "Historical",
                    "Martial Arts",
                    "Parody",
                    "School",
                    "Shounen",
                    "Super Power",
                    "Yuri",
                  ]}
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
              </DesktopOverlay>
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

        <AnimatePresence>
          {filterMenu && //TODO JayDuck, fix this to be consistent with desktop
            <MobileOverlay title={"Filter Results"} onOutSideClick={() => setFilterMenu(false)} >
              <OptionSelect
                title="Release Status"
                options={["All", "Finished", "Releasing", "Cancelled", "Hiatus", "Coming Soon"]}
              />
              <OptionSelect
                title="Genre"
                options={[
                  "Any",
                  "Action",
                  "Demons",
                  "Game",
                  "Horror",
                  "Mecha",
                  "Police",
                  "Sci-Fi",
                  "Shounen Ai",
                  "Supernatural",
                  "Adventure",
                  "Gender Bender",
                  "Josei",
                  "Military",
                  "Psychological",
                  "Seinen",
                  "Slice of Life",
                  "Thriller",
                  "Drama",
                  "Harem",
                  "Kids",
                  "Music",
                  "Romance",
                  "Shoujo",
                  "Space",
                  "Vampire",
                  "Comedy",
                  "Ecchi",
                  "Hentai",
                  "Magic",
                  "Mystery",
                  "Samurai",
                  "Shoujo Ai",
                  "Sports",
                  "Yaoi",
                  "Dementia",
                  "Fantasy",
                  "Historical",
                  "Martial Arts",
                  "Parody",
                  "School",
                  "Shounen",
                  "Super Power",
                  "Yuri",
                ]}
              />
              <OptionSelect
                title="Year"
                options={[
                  "Any",
                  "2022",
                  "2021",
                  "2020"
                ]}
              />
            </MobileOverlay>
          }
        </AnimatePresence>

      </PageBase >
    </>
  );
}