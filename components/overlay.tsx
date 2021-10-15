
import { PropsWithChildren } from "react";

import { useIsMobile } from "lib/clientHelpers";

import { DesktopOverlay } from "./desktopOverlay";
import { MobileOverlay } from "./overlayMenu";

export interface OverlayProps {
  title: string,
  flexDirection?: string,
  onOutsideClick: () => void,
  className?: string,
}

export default function Overlay({ children, onOutsideClick, className, title, flexDirection }: PropsWithChildren<OverlayProps>) {
  const isMobile = useIsMobile();

  return <>
    { isMobile 
      ? (<MobileOverlay title={title} onOutSideClick={onOutsideClick}>
        {children}
      </MobileOverlay>) 
      : (<DesktopOverlay title={title} className={className} flexDirection={flexDirection}>
        {children}
      </DesktopOverlay>)
    }
  </>;
}
