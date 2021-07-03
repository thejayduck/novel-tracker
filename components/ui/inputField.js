import { forwardRef } from 'react';
import styles from '../../styles/components/InputField.module.css'

export const InputField = forwardRef(({ inputType, title, placeHolder, defaultValue, maxValue, maxLength, onChange, toolTip, pattern }, ref) => {
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

export function InputFieldNonManaged({ inputType, title, placeHolder, defaultValue, maxValue, onChange, value }) {
    return (
        <div className={styles.inputFieldWrap}>
            <h3 className={styles.title} >{title}</h3>
            <input className={styles.inputField} type={inputType} placeholder={placeHolder} autoComplete="off" min="0" max={maxValue} defaultValue={defaultValue} onInput={onChange} value={value} />
        </div>
    );
}

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
})