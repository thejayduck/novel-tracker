import styles from "styles/components/InputField.module.scss";

export function InputFieldNonManaged({ inputType, title, placeHolder, defaultValue, maxValue, onChange, value }) {
  return (
    <div className={styles.inputFieldWrap}>
      <h3 className={styles.title}>{title}</h3>
      <input className={styles.inputField} type={inputType} placeholder={placeHolder} autoComplete="off" min="0" max={maxValue} defaultValue={defaultValue} onInput={onChange} value={value} />
    </div>
  );
}
