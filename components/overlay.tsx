import styles from "styles/components/OverlayMenu.module.scss";

import { DesktopOverlay } from "./desktopOverlay";
import { MobileOverlay } from "./overlayMenu";

// TODO TheJayDuck, detect mobile in code properly

export function Overlay({ children, onOutsideClick }) {
  return <>
    <DesktopOverlay title="Filter Results" className={styles.filterOverlay} flexDirection="flexRow">
      {children}
    </DesktopOverlay>
    <MobileOverlay title="Filter Results" onOutSideClick={onOutsideClick}>
      {children}
    </MobileOverlay>
  </>;
}
