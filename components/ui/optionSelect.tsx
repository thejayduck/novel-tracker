// @ts-nocheck
import styles from "styles/components/InputField.module.scss";

import { forwardRef } from "react";

export interface OptionSelectProps {
  title: string,
  options: string[],
  onChange: any, // TODO
}

export const OptionSelect = forwardRef(({ title, options, onChange }: OptionSelectProps, ref) => {
  return (
    <div>
      <h3 className={styles.title}>{title}</h3>
      <select className={styles.customSelect} ref={ref} onChange={onChange}>
        {
          options.map(q => (
            <option key={q} value={q}>{q}</option>
          ))
        }
      </select>
    </div>

  );
});

OptionSelect.displayName = "OptionSelect";