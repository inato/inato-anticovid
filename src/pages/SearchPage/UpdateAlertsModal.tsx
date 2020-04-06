import React from "react";

import { Modal } from "../../ui/Modal";

export const UpdateAlertsModal = ({
  isOpen,
  onRequestClose
}: {
  isOpen: boolean;
  onRequestClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      size="small"
      title="Get update alerts"
      onRequestClose={onRequestClose}
      primaryAction={{
        label: "Subscribe to updates",
        onClick: () => {
          // eslint-disable-next-line
          console.log(`Subscribe to updates button clicked`);
        }
      }}
      secondaryAction={{
        label: "Cancel",
        onClick: onRequestClose
      }}
    >
      <div>Coucou</div>
    </Modal>
  );
};
