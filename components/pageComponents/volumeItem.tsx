// @ts-nocheck
import styles from "styles/SubmitPage.module.scss";

import React from "react";

import { InputField } from "components/ui/inputField";

interface VolumeItemProps {
  image: string,
  onCoverUrlChange: (newImage: string) => void,
  onChaptersCountChange: (newCount: number) => void,
  onRemoveClicked: () => void,
}

export default function VolumeItem({ image, onCoverUrlChange, onChaptersCountChange, onRemoveClicked }: VolumeItemProps) {
  return (
    <li className={styles.volumeItem}>
      <a className={styles.removeBook} title="Remove Volume" onClick={() => onRemoveClicked()}>
        <i className="bx bx-x bx-sm" /> 
      </a>
      <div className={`flex flexColumn ${styles.book}`}>
        <img className="skeleton" width={200} height={300} src={image || "https://dummyimage.com/200x300/000/ffffff.png&text=+No+Cover"} />
        <div className={`${styles.volumeDetails}`}>
          <InputField placeHolder="Image URL" inputType="url" onChange={(e: any) => onCoverUrlChange(e.target.value)} />
          <InputField title="Chapters" placeHolder="Chapters" inputType="number" maxValue="999" defaultValue="0" onChange={(e: any) => onChaptersCountChange(e.target.value)} />
          <InputField toolTip="'Prologue', 'Interlude', 'Epilogue' and others chapters count as Extras" title="Extras" placeHolder="Extras" inputType="number" maxValue="999" defaultValue="0" onChange={(e: any) => onChaptersCountChange(e.target.value)} />
        </div>
      </div>
    </li>
  );
}
