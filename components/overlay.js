import styles from '../styles/components/Overlay.module.scss'

export function MobileOverlay({ title, onOutSideClick, children }) {
    return (
        <div onClick={onOutSideClick} className={`mobile ${styles.mobileOverlayWrap}`}>
            <div onClick={(e) => e.stopPropagation()} className={styles.mobileOverlay}>
                <span>{title}</span>
                <div className={`${styles.children} flex`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export function DesktopOverlay({ title, children, className }) {
    return (
        <div className={`floatingMenu desktop ${className} ${styles.desktopOverlay}`} >
            <span>{title}</span>
            <div className={`${styles.children} flex flexColumn`}>
                {children}
            </div>
        </div>
    )
}