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
  onClick?: () => void,
}

export const InputField = forwardRef<HTMLInputElement>(({ inputType, title, placeHolder, defaultValue, maxValue, maxLength, onChange, toolTip, pattern, onClick }, ref): InputFieldProps => {
  return (
    <div className={styles.inputFieldWrap} onClick={onClick}>
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
