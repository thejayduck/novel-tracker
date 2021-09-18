//@ts-nocheck
import styles from "styles/SubmitPage.module.scss";

import Head from "next/head";

import PageBase from "components/pageBase";
import { Subtitle } from "components/subtitle";
import { NavigationButton } from "components/ui/button";
import { InputField, OptionSelect } from "components/ui/inputField";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings · Novel Tracker</title>
      </Head>

      <PageBase>
        <section className={styles.section}>
          <Subtitle text="Account" />

          <div className={styles.sectionContainer}>
            <InputField title="User Name" />
            <OptionSelect
              title="Visibility"
              options={[
                "Public",
                "Private",
                "Followers Only",
              ]}
            />
          </div>
        </section>
        <section className={styles.section}>
          <Subtitle text="Customization" />

          <div className={`${styles.sectionContainer}`}>
            <div>
              <OptionSelect
                title="Title Language"
                options={[
                  "English",
                  "Romanized",
                  "Native",
                ]}
              />
              <InputField title="Border Radius" inputType="number" defaultValue={5} />
              <InputField title="Blur Amount" inputType="number" defaultValue={10} />
            </div>
            <div className="flex">
              <InputField title="Accent" inputType="color" defaultValue="#854dff" />
              <InputField title="Accent Dark" inputType="color" defaultValue="#570099" />
            </div>
            <div className="flex">
              <InputField title="Background" inputType="color" defaultValue="#ffffff" />
              <InputField title="Background Secondary" inputType="color" defaultValue="#f2f2f2" />
            </div>
            <div className="flex">
              <InputField title="ScrollBar Thumb" inputType="color" defaultValue="#854dff" />
              <InputField title="ScrollBar Track" inputType="color" defaultValue="#000" />
            </div>
            <div className="flex">
              <InputField title="Selection" inputType="color" defaultValue="#854dff" />
              <InputField title="Alert" inputType="color" defaultValue="#ff1a1a" />
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <Subtitle text="Other Actions" />

          <div className={`${styles.sectionContainer} flex`}>
            <NavigationButton text="Delete Library" icon="bx bx-bookmark-minus bx-sm" />
            <NavigationButton text="Delete Account" icon="bx bxs-user-x bx-sm" />
          </div>
        </section>
      </PageBase>
    </>
  );
}