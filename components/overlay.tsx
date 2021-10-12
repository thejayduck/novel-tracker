import { DesktopOverlay } from "./desktopOverlay";
import { MobileOverlay } from "./overlayMenu";

// TODO TheJayDuck, detect mobile in code properly

export function Overlay({ children, onOutsideClick, className }) {
  return <>
    <DesktopOverlay title="Filter Results" className={className} flexDirection="flexRow">
      {children}
    </DesktopOverlay>
    <MobileOverlay title="Filter Results" onOutSideClick={onOutsideClick}>
      {children}
    </MobileOverlay>
  </>;
}
