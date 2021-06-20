import styles from '../../styles/components/InputField.module.css'

export default function InputField({ inputType, title, placeHolder, defaultValue, maxValue, onChange }) {
    return (
        <div className={styles.inputField}>
            <h3 className={styles.title}>{title}</h3>
            <input type={inputType} placeholder={placeHolder} autoComplete="off" min="0" max={maxValue} defaultValue={defaultValue} onInput={onChange} />
        </div>
    );
}

export function OptionSelect({ title, options }) {
    return (
        <div>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.customSelect} >
                <select>
                    {
                        options.map((q, idx) => (
                            <option value={idx}>{q}</option>
                        ))
                    }
                </select>
            </div>
        </div>

    );
}