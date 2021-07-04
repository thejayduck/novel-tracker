import styles from '../../styles/components/Button.module.css'
import { motion } from 'framer-motion';

export interface ButtonProps {
    title: string,
    text: string,
    icon: string,
    onClick: () => void,
    href: string,
    newTab: boolean,
}

export default function Button({ text, icon, onClick, href, newTab }: ButtonProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}

            className={styles.button}
            onClick={onClick}
        >
            <a 
                href={href || "#"} 
                target={newTab ? "_blank" : "_self"} 
            >
                {icon && <i className={`${icon} ${text && styles.icon}`} />}{text}
            </a>
        </motion.div>
    );
}

export function FooterButton({ title, text, icon, onClick, href, newTab }: ButtonProps) {
    return (
        <a
            title={title}
            className={styles.footerButton}
            onClick={onClick}
            href={href}
            tabIndex={0}
            target={newTab ? "_blank" : "_self"}
        ><i className={`${icon} ${text && styles.icon}`} />{text}</a>
    );
}

export function CardButton({ title, icon, onClick, href }: ButtonProps) {
    return (
        <>
            <a
                className={styles.cardButton}
                onClick={onClick}
                href={href}
                title={title}
            >
                <i className={`${styles.cardButtonIcon} ${icon}`} />
            </a>
        </>
    );
}