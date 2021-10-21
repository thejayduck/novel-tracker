// @ts-nocheck
import styles from "styles/components/Card.module.scss";

import { AnimatePresence } from "framer-motion";

import React, { useState } from "react";

import Overlay from "components/overlay";
import { NavigationButton } from "components/ui/button";
import { InputField } from "components/ui/inputField";
import { OptionSelect } from "components/ui/optionSelect";

import Card, { CardProps } from "./card";

export default function LibraryCard({ data }: CardProps) {
  const [editOverlay, setEditOverlay] = useState(false);

  return (
    <Card data={data} isClickable={true}>
      <a title="Edit Book" className={styles.editButton} onClick={() => setEditOverlay(prev => !prev)}>
        <i className="bx bxs-pencil bx-sm" />
      </a>

      <AnimatePresence>
        {editOverlay && <Overlay title={`Edit Book - ${data.title_native}`} onOutsideClick={() => setEditOverlay(false)} className={styles.editOverlay} flexDirection="flexColumn">
          <InputField title="Chapters" inputType="number" />
          <InputField title="Volumes" inputType="number" />
          <OptionSelect
            title="Set As"
            options={["Reading", "Finished", "Planning", "Dropped"]}
          />
          <NavigationButton icon="bx bxs-trash-alt bx-sm" text="Remove Book" onClick={() => acceptBook(pending_book)} />
        </Overlay>}
      </AnimatePresence>
    </Card>
  );
}