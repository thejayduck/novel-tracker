// @ts-nocheck
import styles from "styles/SubmitPage.module.scss";

import Head from "next/head";
import genreList from "genres.json";
import remarkGfm from "remark-gfm";

import React, { useEffect, useRef, useState } from "react";
import nextId from "react-id-generator";
import ReactMarkdown from "react-markdown";

import { useAlert } from "components/alertWrapper";
import PageBase from "components/pageBase";
import { Subtitle } from "components/subtitle";
import { NavigationButton } from "components/ui/button";
import { CustomDropdown } from "components/ui/customDropdown";
import { InputField } from "components/ui/inputField";

import { useApi } from "lib/clientHelpers";
import { serverSide_checkAuth } from "lib/serverHelpers";

import VolumeItem from "../components/pageComponents/volumeItem";

interface SubmitPageProps {
  book_id?: number,
  user_info: any,
}

export async function getServerSideProps(context) {
  const [redirect, info] = await serverSide_checkAuth(context, false, false, false);

  return redirect ? redirect : {
    props: {
      user_info: info,
    },
  };
}

export default function SubmitPage({ book_id, user_info }: SubmitPageProps) {
  if (book_id != undefined) {
    console.log("Editing existing book.");
  }

  const api = useApi();
  const alert = useAlert();

  interface VolumeState {
    cover_url: string | null,
    chapterCount: number,
    id: string,
  }

  interface GenreState {
    name: string | null,
    id: string,
  }

  // References
  const [volumes, setVolumes] = useState<VolumeState[]>([]);
  const nativeTitleRef = useRef<HTMLInputElement>();
  const romanizedTitleRef = useRef<HTMLInputElement>();
  const englishTitleRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLTextAreaElement>();
  const [description, setDescription] = useState<string | null>(null);
  const authorNameRef = useRef<HTMLInputElement>();
  const releaseStatusRef = useRef<HTMLOptionElement>();
  const [genres, setGenres] = useState<GenreState[]>(() => [{name: null, id: nextId("genre")}]);
  const startDateRef = useRef<HTMLInputElement>();
  const endDateRef = useRef<HTMLInputElement>();
  const bannerRef = useRef<HTMLInputElement>();
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  useEffect(() => {
    setBannerUrl(bannerRef.current?.value);
  }, [bannerRef.current?.value]);

  useEffect(() => {
    setDescription(descriptionRef.current?.value);
  }, [descriptionRef.current?.value]);

  console.log("re-render");
  async function onSubmit() {
    const bookDetails = {
      title_english: englishTitleRef.current.value,
      title_romanized: romanizedTitleRef.current.value,
      title_native: nativeTitleRef.current.value,
      description: descriptionRef.current.value,
      author: authorNameRef.current.value,
      // TODO
      cover_url: null,
      banner_url: bannerRef.current.value,
      genres: genres[0],
      release_status: releaseStatusRef.current.value,
      start_date: startDateRef.current.value,
      end_date: endDateRef.current.value,
      volumes: volumes.map(volume => ({
        cover_url: volume.cover_url,
        chapters: volume.chapterCount,
        // TODO
        extras: 0,
      }))
    };
    await api.submitBook(bookDetails, () => {
      alert.information("Submitted!");
    });
  }

  return (
    <>
      <Head>
        <title>Submit · Novel Tracker</title>
      </Head>

      <PageBase user_info={user_info}>
        <section className={styles.section}>
          <Subtitle text="Titles" />

          <div className={styles.sectionContainer}>
            <InputField 
              title="Native" 
              ref={nativeTitleRef} 
              placeHolder="本好きの下剋上 ~司書になるためには手段を選んでいられません~ 第一部「兵士の娘」"
            />
            <InputField 
              title="Romanized" 
              ref={romanizedTitleRef} 
              placeHolder="Honzuki no Gekokujou: Shisho ni Naru Tame ni wa Shudan wo Erandeiraremasen Dai 1-bu - Heishi no Musume"
            />
            <InputField
              toolTip="Licensed only! Fan translated titles are NOT allowed."
              title="English" ref={englishTitleRef}
              placeHolder="Ascendance of a Bookworm ~I'll do anything to become a librarian~ Part 1 Daughter of a Soldier"
            />
          </div>
        </section>

        <section className={styles.section}>
          <Subtitle text="Description" />
          <div className={`${styles.sectionContainer} ${styles.descriptionSection} flex flexAround`}>
            <textarea rows={15} wrap="soft" ref={descriptionRef} onChange={() => setDescription(descriptionRef.current.value)} />
            <div className={"desktop"}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <Subtitle text="Genres" />
          <div className={`${styles.sectionContainer} flex flexRight flexWrap`}>
            {
              genres.map((genre, idx) => (
                <CustomDropdown 
                  key={genre.id} 
                  options={genreList} 
                  placeHolder="Genre"

                  onSelect={(s) => {
                    if(idx == genres.length - 1) {
                      setGenres(oldGenres => {
                        oldGenres[idx].name = s;
                        return [...oldGenres, {name: null, id: nextId("genre")}];
                      });
                    }
                  }}
                  onClear={() => setGenres([...genres.filter((_, i) => i != idx)])}
                />
              ))
            }
          </div>
        </section>

        <section className={styles.section}>
          <Subtitle text="Other" />
          <InputField toolTip="Preferred Resolution is 1600x600" title="Banner Url" ref={bannerRef} onChange={() => {
            setBannerUrl(bannerRef.current.value);
          }} />
          <div className={styles.sectionContainer}>
            <img
              className={`${styles.bannerPreview} skeleton`}
              width="100%"
              height="auto"
              src={bannerUrl || "https://dummyimage.com/1600x600/000/ffffff.png&text=+No+Cover"}
              onError={() => {
                setBannerUrl("https://dummyimage.com/1600x600/000/ffffff.png&text=+Invalid+Cover");
              }}
            />
            <div className="flex">
              <InputField placeHolder="First Name - Last Name" title="Author Name" ref={authorNameRef} />
              <CustomDropdown
                title="Release Status"
                options={["Finished", "Releasing", "Cancelled", "Hiatus", "Coming Soon"]} 
                onSelect={() => null}
                onClear={() => null}
              />

            </div>
            <div className="flex">
              <InputField title="Start Date" inputType="date" ref={startDateRef} />
              <InputField title="End Date" inputType="date" ref={endDateRef} />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <Subtitle text={`Volumes ${volumes.length}`} />
          <ul className={`${styles.sectionContainer} ${styles.volumeList} unorderedList flex flexRight`}>
            <div>
              <a
                title="Add Volume"
                className={`${styles.volumeItem} ${styles.placeholder} flex flexAround`}
                onClick={() => {
                  setVolumes(oldVolumes => {
                    return [...oldVolumes, {
                      cover_url: null,
                      chapterCount: 0,
                      id: nextId("volume"),
                    }];
                  });
                }}
              >
                <i className="bx bx-plus bx-lg" />
              </a>
            </div>
            {volumes.map((volume, idx) => (
              <VolumeItem
                key={volume.id}
                onRemoveClicked={() => setVolumes([...volumes.filter((item, i) => i != idx)])}
                image={volume.cover_url}
                onCoverUrlChange={newCover => {
                  setVolumes(oldVolumes => {
                    oldVolumes[idx].cover_url = newCover;
                    return [...oldVolumes];
                  });
                }}
                onChaptersCountChange={newChapterCount => {
                  setVolumes(oldVolumes => {
                    oldVolumes[idx].chapterCount = newChapterCount;
                    return [...oldVolumes];
                  });
                }}
              />
            ))}
          </ul>
        </section>
        <NavigationButton text="Submit Book" icon="bx bx-subdirectory-left bx-sm" href={null} onClick={onSubmit} />
      </PageBase>
    </>
  );
}
