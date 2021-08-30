import styles from '@styles/components/OverlayMenu.module.scss'

import { motion } from 'framer-motion'
import { UserSmall } from './userContainer'
import { Subtitle } from './header'
import { NavigationButton } from "@components/ui/button"
import NotificationItem from './notificationItem'
import { useEffect, useState } from 'react'

export function MobileOverlay({ title, onOutSideClick, children }) {
    return (
        <motion.div
            onClick={onOutSideClick}
            className={`mobile ${styles.mobileOverlayWrap}`}

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div onClick={(e) => e.stopPropagation()} className={styles.mobileOverlay}>
                <span>{title}</span>
                <div className={`${styles.children} flex`}>
                    {children}
                </div>
            </div>
        </motion.div>
    )
}

export function MobileMenu({ onOutSideClick }) {
    const [velocity, setVelocity] = useState();

    useEffect(() => {

        if (velocity <= -900) {
            console.log("hey");
            onOutSideClick()
        }

    }, [velocity])

    return (
        <motion.div
            className={`mobile ${styles.mobileMenuWrap}`}
            onClick={onOutSideClick}

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className={styles.mobileMenu}
                onClick={(e) => e.stopPropagation()}
                drag="x"
                dragConstraints={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
                onDragEnd={
                    (event, info) => {
                        setVelocity(info.velocity.x)
                        console.log(info)
                    }
                }

                initial={{ x: -200 }}
                animate={{ x: 0 }}
                exit={{ x: -500 }}
                transition={{ duration: 0.2 }}
            >
                <UserSmall />
                <div className={styles.menu}>
                    <section className="flex flexColumn" >
                        <Subtitle text="Pages" />
                        <NavigationButton href="/profile" icon="bx bx-library bx-sm" text="Library" />
                        <NavigationButton href="#" icon="bx bx-chat bx-sm" text="Forums" />
                    </section>
                    <section>
                        <Subtitle text="Notifications (1)" />
                        <ul className={`flex flexColumn ${styles.notificationWrap}`}>
                            <NotificationItem />
                        </ul>
                    </section>
                </div>
            </motion.div>
        </motion.div>
    )
}

export function DesktopOverlay({ title, children, className, flexDirection }) {
    return (
        <motion.div
            className={`floatingMenu desktop ${className} ${styles.desktopOverlay}`}

            initial={{
                translateY: -20,
                opacity: 0
            }}
            animate={{
                translateY: 0,
                opacity: 1
            }}
            exit={{
                translateY: -20,
                opacity: 0
            }}
        >
            <span>{title}</span>
            <div className={`${styles.children} flex ${flexDirection}`}>
                {children}
            </div>
        </motion.div>
    )
}