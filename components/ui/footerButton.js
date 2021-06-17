import styles from '../../styles/components/footer.module.css'

export default function FooterButton({ title, icon, onClick, href }) {
    return (
        <a
            title={title}
            className={` ${styles.footerButton}`}
            onClick={onClick}
            href={href}
        ><i className={icon} /></a>
    );
}