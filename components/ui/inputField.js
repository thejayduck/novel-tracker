import { forwardRef } from 'react';
import styles from '../../styles/components/InputField.module.css'

export const InputField = forwardRef(({ inputType, title, placeHolder, defaultValue, maxValue, maxLength, onChange }, ref) => {
    return (
        <div className={styles.inputField}>
            <h3 className={styles.title}>{title}</h3>
            <input ref={ref} type={inputType} placeholder={placeHolder} autoComplete="off" min="0" max={maxValue} maxLength={maxLength} defaultValue={defaultValue} onInput={onChange} />
        </div>
    );
});

export function InputFieldNonManaged({ inputType, title, placeHolder, defaultValue, maxValue, onChange, value }) {
    return (
        <div className={styles.inputField}>
            <h3 className={styles.title}>{title}</h3>
            <input type={inputType} placeholder={placeHolder} autoComplete="off" min="0" max={maxValue} defaultValue={defaultValue} onInput={onChange} value={value} />
        </div>
    );
}

export const OptionSelect = forwardRef(({ title, options, onChange }, ref) => {
    return (
        <div>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.customSelect} >
                <select ref={ref} onChange={onChange}>
                    {
                        options.map(q => (
                            <option key={q} value={q}>{q}</option>
                        ))
                    }
                </select>
            </div>
        </div>

    );
})