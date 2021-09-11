import styles from 'styles/components/Subtitle.module.scss'

interface SubtitleProps {
    text: string,
    icon?: string,
}

export function Subtitle({ text, icon }: SubtitleProps) {
    return (
        <h2 className={styles.subtitle}>{text} <i className={`bx-pull-right ${icon}`} /></h2>
    )
}