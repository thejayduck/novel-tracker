import styles from '../styles/components/SubmitBookContainer.module.css'

export default function SubmitBookContainer({ title, children }) {
    return (
        <>
            <div className={styles.aboutWrapper}>
                {/* <div className={styles.aboutContainer}>Haha about go brrr</div> */}
                <h2 className={styles.containerTitle}> {title} </h2>
                {/* <i class="far fa-question-circle" /> */}
            </div>
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
            <FormSection title="Chapters" inputType="number" defaultValue="0" />
            <FormSection title="Extra Chapters" inputType="number" defaultValue="0" />
        </div>
    );
}

export function DescriptionSection() {
    return (
        <>
            <h2 className={styles.containerTitle} > Description </h2>
            <textarea
                className={styles.container}
                autoComplete="off"
                spellCheck="off"
            >
            </textarea>
        </>
    );
}