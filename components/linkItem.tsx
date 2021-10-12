import styles from "styles/components/Navigation.module.scss";

export function LinkItem({ icon, title, text, href, onClick }) {
  return (
    <li className={styles.linkItem}>
      <a title={title} href={href} onClick={onClick}>
        {text && <span>{title}</span>}
        {icon && <i className={`${icon} bx-sm`} />}
      </a>
    </li>
  );
}