// @ts-nocheck
import styles from "styles/components/InputField.module.scss";

import { forwardRef } from "react";

interface InputFieldProps {
  title?: string,
  inputType?: string,
  placeHolder?: string,
  maxLength?: number,
  maxValue?: number, 
  defaultValue?: string,
  onChange?: () => void,
  pattern?: string,
  toolTip?: string
}

export const InputField = forwardRef<HTMLInputElement>(({ inputType, title, placeHolder, defaultValue, maxValue, maxLength, onChange, toolTip, pattern }, ref): InputFieldProps => {
  return (
    <div className={styles.inputFieldWrap}>
      <h3 className={styles.title} tooltip={toolTip} >{title}</h3>
      <input
        className={styles.inputField}
        ref={ref}
        type={inputType}
        placeholder={placeHolder}
        autoComplete="off"
        min="0"
        max={maxValue}
        maxLength={maxLength}
        defaultValue={defaultValue}
        onInput={onChange}
        pattern={pattern}
      />
    </div>
  );
});

InputField.displayName = "InputField";

export const OptionSelect = forwardRef(({ title, options, onChange }, ref) => {
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
