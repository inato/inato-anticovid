import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { ModalProvider, ThemeProvider } from "../../hooks";

import { Modal } from ".";

describe("Modal", () => {
  describe("Modal", () => {
    it("should trigger onRequestClose when the close button is clicked", () => {
      const onRequestCloseSpy = jest.fn();
      const { getByTestId } = render(
        <ThemeProvider>
          <ModalProvider>
            <Modal onRequestClose={onRequestCloseSpy} />
          </ModalProvider>
        </ThemeProvider>
      );

      const closeIcon = getByTestId("close-icon");

      fireEvent.click(closeIcon);

      expect(onRequestCloseSpy).toHaveBeenCalled();
    });

    it("should render the primaryButton and call onPrimaryButtonClicked properly", () => {
      const onPrimaryButtonClickSpy = jest.fn();
      const { getByText } = render(
        <ThemeProvider>
          <ModalProvider>
            <Modal
              primaryAction={{
                label: "primaryButtonLabel",
                onClick: onPrimaryButtonClickSpy
              }}
            />
          </ModalProvider>
        </ThemeProvider>
      );

      const primaryButton = getByText("primaryButtonLabel");

      fireEvent.click(primaryButton);

      expect(onPrimaryButtonClickSpy).toHaveBeenCalled();
    });

    it("should render the secondaryButton and call onSecondaryButtonClicked properly", () => {
      const onSecondaryButtonClickSpy = jest.fn();
      const { getByText } = render(
        <ThemeProvider>
          <ModalProvider>
            <Modal
              secondaryAction={{
                label: "secondaryButtonLabel",
                onClick: onSecondaryButtonClickSpy
              }}
            />
          </ModalProvider>
        </ThemeProvider>
      );

      const secondaryButton = getByText("secondaryButtonLabel");

      fireEvent.click(secondaryButton);

      expect(onSecondaryButtonClickSpy).toHaveBeenCalled();
    });

    it("should trigger onRequestClose when we click outside the modal", () => {
      const onRequestCloseSpy = jest.fn();
      render(
        <ThemeProvider>
          <ModalProvider>
            <Modal onRequestClose={onRequestCloseSpy} />
          </ModalProvider>
        </ThemeProvider>
      );

      document.dispatchEvent(new Event("mousedown"));

      expect(onRequestCloseSpy).toHaveBeenCalled();
    });

    it("should not trigger onRequestClose when the modal content is clicked", () => {
      const onRequestCloseSpy = jest.fn();
      const { getByText } = render(
        <ThemeProvider>
          <ModalProvider>
            <Modal onRequestClose={onRequestCloseSpy}>
              <div>Modal Content</div>
            </Modal>
          </ModalProvider>
        </ThemeProvider>
      );

      const modalContent = getByText("Modal Content");

      fireEvent.click(modalContent);

      expect(onRequestCloseSpy).not.toHaveBeenCalled();
    });
  });
});
