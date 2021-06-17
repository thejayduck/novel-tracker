import styles from '../../styles/components/Button.module.css'

export default function Button({ title, icon, onClick }) {
    return (
        <div
            className={styles.button}
            onClick={onClick}
        >
            {title && <a> {title} </a>}
            {icon && <i className={icon} />}
        </div>
    );

}