import styles from "styles/components/Navigation.module.scss";

export interface LinkItem {
  icon: string,
  title: string,
  text: string,
  href: string,
  onClick: () => void,
}

export function LinkItem({ icon, title, text, href, onClick }) {
  return (
    <li className={styles.linkItem}>
      <a title={title} href={href} onClick={onClick}>
        {icon && <i className={`${icon} bx-sm`} />}
        {text && <span>{title}</span>}
      </a>
    </li>
  );
}