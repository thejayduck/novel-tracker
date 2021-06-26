import { forwardRef } from 'react';
import styles from '../styles/components/SubmitBookContainer.module.css'
import { InputField } from './ui/inputField';

export default function SubmitBookContainer({ title, children, toolTip }) {
    return (
        <>
            <h2 tooltip={toolTip} className={styles.containerTitle}> {title} </h2>

            <div className={styles.container}>
                {children}
            </div>
        </>
    );
}

export function VolumeFormSection({ index }) {
    return (
        <li className={styles.volumeSection}>
            <h3>{index}</h3>
            <InputField title="Volume Cover" inputType="url" pattern="https://./*" />
            <InputField title="Chapters" inputType="number" defaultValue="0" />
            <InputField title="Extra Chapters" inputType="number" defaultValue="0" />
        </li>
    );
}

export const DescriptionSection = forwardRef(({ onChange }, ref) => {
    return (
        <>
            <h2 className={styles.containerTitle} > Description </h2>
            <div className={styles.container}>
                <textarea
                    ref={ref}
                    autoComplete="off"
                    spellCheck="off"
                    onChange={onChange}
                >
                </textarea>
            </div>
        </>
    );
})