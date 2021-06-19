import styles from '../../styles/components/InputField.module.css'

export default function InputField({ inputType, title, placeHolder, defaultValue, maxValue, onChange }) {
    return (
        <div className={styles.inputField}>
            <h3>{title}</h3>
            <input type={inputType} placeholder={placeHolder} autoComplete="off" min="0" max={maxValue} defaultValue={defaultValue} onInput={onChange} />
        </div>
    );
}