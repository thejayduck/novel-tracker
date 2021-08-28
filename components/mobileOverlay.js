import styles from '../styles/components/MobileOverlay.module.scss'

export function MobileOverlay({ title, onOutSideClick, children }) {
    return (
        <div onClick={onOutSideClick} className={`${styles.mobileOverlayWrap} mobile`}>
            <div onClick={(e) => e.stopPropagation()} className={styles.mobileOverlay}>
                <span>{title}</span>
                <div className={`${styles.children} flex`}>
                    {children}
                </div>
            </div>
        </div>
    )
}