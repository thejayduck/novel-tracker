// @ts-nocheck
import styles from "styles/SubmitPage.module.scss";

import Head from "next/head";
import genres from "genres.json";

import React, { useRef, useState } from "react";
import nextId from "react-id-generator";

import { useAlert } from "components/alertWrapper";
import PageBase from "components/pageBase";
import { Subtitle } from "components/subtitle";
import { NavigationButton } from "components/ui/button";
import { InputField } from "components/ui/inputField";
import { OptionSelect } from "components/ui/optionSelect";

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

  const [volumes, setVolumes] = useState<VolumeState[]>([]);
  const nativeTitleRef = useRef<HTMLInputElement>();
  const romanizedTitleRef = useRef<HTMLInputElement>();
  const englishTitleRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLTextAreaElement>();
  const authorNameRef = useRef<HTMLInputElement>();
  const releaseStatusRef = useRef<HTMLOptionElement>();
  const startDateRef = useRef<HTMLInputElement>();
  const endDateRef = useRef<HTMLInputElement>();
  async function onSubmit() {
    const bookDetails = {
      title_english: englishTitleRef.current.value,
      title_romanized: romanizedTitleRef.current.value,
      title_native: nativeTitleRef.current.value,
      description: descriptionRef.current.value,
      author: authorNameRef.current.value,
      // TODO
      cover_url: null,
      genre: null,
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
            <InputField title="Native" ref={nativeTitleRef} />
            <InputField title="Romanized" ref={romanizedTitleRef} />
            <InputField toolTip="Licensed only! Fan translated titles are NOT allowed." title="English" ref={englishTitleRef} />
          </div>
        </section>

        <section className={styles.section}>
          <Subtitle text="Description" />
          <div className={styles.sectionContainer}>
            <textarea rows={15} wrap="soft" ref={descriptionRef} />
          </div>
        </section>

        <section className={styles.section}>
          <Subtitle text="Other" />
          <div className={styles.sectionContainer}>
            <div className="flex">
              <InputField title="Author Name" ref={authorNameRef} />
              <OptionSelect
                title="Release Status"
                options={["Finished", "Releasing", "Cancelled", "Hiatus", "Coming Soon"]}
                ref={releaseStatusRef}
              />
              <OptionSelect
                title="Genre"
                options={
                  genres
                }
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
          <ul className={`${styles.sectionContainer} ${styles.volumeList} flex flexRight`}>
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
                onRemoveClicked={() => null}
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
