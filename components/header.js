import styles from '@styles/components/Header.module.scss'

export function Subtitle({ text, icon }) {
    return (
        <h2 className={styles.subtitle}>{text} <i className={`bx-pull-right ${icon}`} /></h2>
    )
}