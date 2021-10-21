import styles from "styles/components/Button.module.scss";

export interface ButtonProps {
  title?: string,
  text?: string,
  icon?: string,
  onClick?: () => void,
  href?: string,
  newTab?: boolean,
}

export function NavigationButton({ text, icon, onClick, href, newTab }: ButtonProps) {
  return (
    <a
      className={`flex flexBetween ${styles.button}`}
      title={text}
      href={href || "#"}
      target={newTab ? "_blank" : "_self"}
      onClick={onClick} rel="noreferrer"
    >
      {icon && <i className={icon} />}
      <span>{text}</span>
    </a>

  );
}