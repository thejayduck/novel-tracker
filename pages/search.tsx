// @ts-nocheck
import styles from "styles/Search.module.scss";

import dynamic from "next/dynamic";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";

import React, { useState } from "react";

import { DesktopOverlay, MobileOverlay } from "components/overlayMenu";
// Components
import PageBase from "components/pageBase";
import { Subtitle } from "components/subtitle";
import { InputFieldNonManaged, OptionSelect } from "components/ui/inputField";

import { serverSide_checkAuth } from "lib/serverHelpers";

const BookCard = dynamic(() => import("components/cards/volumeCard"));

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

  return (
    <>
      <Head>
        <title>Search · Novel Tracker</title>
      </Head>

      <PageBase user_info={user_info}>
        <div className={`${styles.inputWrap} flex`}>
          <InputFieldNonManaged placeHolder="Search..." />
          <a onClick={() => setFilterMenu(prev => !prev)} className={"fontLarge"} ><i className='bx bx-filter-alt' /></a>

          <AnimatePresence>
            {filterMenu &&
                            <DesktopOverlay title="Filter Results" className={styles.filterOverlay}>
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
                                  "2022",
                                  "2021",
                                  "2020"
                                ]}
                              />   
                            </DesktopOverlay>
            }
          </AnimatePresence>
        </div>
        <Subtitle text="Results" />
        <div className={`${styles.results} flex flextRight`}>
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>

        <AnimatePresence>
          {filterMenu &&
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