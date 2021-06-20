import styles from '../styles/components/SubmitBookContainer.module.css'
import InputField from './ui/inputField';
import ToolTip from './ui/toolTip';

export default function SubmitBookContainer({ title, children, toolTip }) {
    return (
        <>
            <ToolTip toolTip={toolTip}>
                <h2 className={styles.containerTitle}> {title} </h2>
            </ToolTip>

            <div className={styles.container}>
                {children}
            </div>
        </>
    );
}

export function VolumeFormSection({ index }) {
    return (
        <div className={styles.volumeSection}>
            <h3>{index}</h3>
            <InputField title="Chapters" inputType="number" defaultValue="0" />
            <InputField title="Extra Chapters" inputType="number" defaultValue="0" />
        </div>
    );
}

export function DescriptionSection({ onChange }) {
    return (
        <>
            <h2 className={styles.containerTitle} > Description </h2>
            <textarea
                className={styles.container}
                autoComplete="off"
                spellCheck="off"
                onChange={onChange}
            >
            </textarea>
        </>
    );
}