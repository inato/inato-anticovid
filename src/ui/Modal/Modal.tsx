import React from "react";

import { BodyPortal } from "./BodyPortal";
import { Backdrop } from "./Backdrop";
import { ModalBox, ModalSize, ModalAction } from "./ModalBox";

interface ModalProps {
  onRequestClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  size?: ModalSize;
  dismissible?: boolean;
  scrollable?: boolean;
}

export const Modal = ({
  onRequestClose,
  title,
  children,
  primaryAction,
  secondaryAction,
  size,
  dismissible = true,
  scrollable
}: ModalProps) => {
  return (
    <BodyPortal>
      <Backdrop
        onEscKeyDown={dismissible !== false ? onRequestClose : undefined}
        scrollable={scrollable}
      >
        <ModalBox
          title={title}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          onCloseIconClick={dismissible !== false ? onRequestClose : undefined}
          onOutsideClick={dismissible !== false ? onRequestClose : undefined}
          size={size}
          scrollable={scrollable}
        >
          {children}
        </ModalBox>
      </Backdrop>
    </BodyPortal>
  );
};
