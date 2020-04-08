import React, { useCallback, useRef } from "react";

import { Button, TextButton } from "../Button";
import { Theme } from "../theme";
import { styled } from "../styled";
import { getVariation } from "../theme/helpers";
import { H1, H3 } from "../typography";
import { CloseIcon } from "../icons";
import { useOnOutsideClick } from "../../hooks";

export type ModalSize = "large" | "medium" | "small" | "default";

const widthOfModalSize = (props: { theme: Theme; size?: ModalSize }) => {
  if (props.size === "large") {
    return props.theme.widths.modalLarge;
  }
  if (props.size === "medium") {
    return props.theme.widths.modalMedium;
  }
  if (props.size === "small") {
    return props.theme.widths.modalSmall;
  }
  return props.theme.widths.modal;
};

const mobileFooterWithTwoButtonsHeight = 140;

const ModalBody = styled.div<{ scrollable?: boolean }>`
  @media (${props => props.theme.breakpoints.tabletAndLarger}) {
    overflow-y: ${props => (props.scrollable ? "auto" : "visible")};
    padding: ${props => props.theme.spacings.m}px;
  }
  @media (${props => props.theme.breakpoints.mobileAndSmaller}) {
    overflow-y: scroll;
    padding: 0 ${props => props.theme.spacings.l}px;
    padding-bottom: ${mobileFooterWithTwoButtonsHeight}px;
  }
`;

const ModalHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (${props => props.theme.breakpoints.tabletAndLarger}) {
    border-top-left-radius: ${props => props.theme.borderRadiuses.regular};
    border-top-right-radius: ${props => props.theme.borderRadiuses.regular};
    background-color: ${props => getVariation(props.theme.colors.grey, 10)};
    padding: ${props => props.theme.spacings.m}px;
  }

  @media (${props => props.theme.breakpoints.mobileAndSmaller}) {
    padding: ${props => props.theme.spacings.l}px;
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`;

const ModalActionButton = styled(
  ({
    secondary = false,
    ...props
  }: {
    secondary?: boolean;
    children?: React.ReactNode;
    onClick?: any;
    disabled?: boolean;
  }) => (secondary ? <TextButton {...props} /> : <Button {...props} />)
)`
  @media (${props => props.theme.breakpoints.tabletAndLarger}) {
    & + & {
      margin-left: ${props => props.theme.spacings.m}px;
    }
  }
  @media (${props => props.theme.breakpoints.mobileAndSmaller}) {
    margin-top: ${props => props.theme.spacings.sm}px;
  }
`;

const ModalFooter = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  @media (${props => props.theme.breakpoints.tabletAndLarger}) {
    border-bottom-left-radius: ${props => props.theme.borderRadiuses.regular};
    border-bottom-right-radius: ${props => props.theme.borderRadiuses.regular};

    padding: ${props => props.theme.spacings.m}px;
    background-color: ${props => getVariation(props.theme.colors.grey, 10)};
  }

  @media (${props => props.theme.breakpoints.mobileAndSmaller}) {
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: ${props => props.theme.spacings.m}px;
    background-color: ${props => props.theme.colors.white};
  }

  ${ModalActionButton}:last-child {
    margin-left: auto;
  }
`;

const Container = styled.div<{ size?: ModalSize }>`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.white};

  @media (${props => props.theme.breakpoints.tabletAndLarger}) {
    max-height: 100%;
    max-width: 100%;
    flex-basis: ${({ theme, size = "default" }) =>
      widthOfModalSize({ size, theme })}px;
    border-radius: ${props => props.theme.borderRadiuses.regular};
    overflow: visible;
    box-shadow: ${props => props.theme.shadows.modal};
  }

  @media (${props => props.theme.breakpoints.mobileAndSmaller}) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const ResponsiveTitle = styled(
  ({
    children,
    className
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={className}>
      <H1>{children}</H1>
      <H3>{children}</H3>
    </div>
  )
)`
  ${H1} {
    display: inline-block;
  }
  ${H3} {
    display: none;
  }

  @media (${props => props.theme.breakpoints.tabletAndLarger}) {
    ${H1} {
      display: none;
    }
    ${H3} {
      display: inline-block;
    }
  }
`;

export interface ModalAction {
  label: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

interface ModalProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  onCloseIconClick?: () => void;
  className?: string;
  size?: ModalSize;
  onOutsideClick?: () => void;
  scrollable?: boolean;
}

export const ModalBox = ({
  title,
  primaryAction,
  secondaryAction,
  onCloseIconClick,
  children,
  className,
  size,
  onOutsideClick = () => ({}),
  scrollable
}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnOutsideClick(ref, onOutsideClick);

  const handlePrimaryActionClick = useCallback(() => {
    if (primaryAction && !primaryAction.loading && primaryAction.onClick) {
      return primaryAction.onClick();
    }
  }, [primaryAction]);

  return (
    <Container
      data-testid="modal-box"
      size={size}
      ref={ref}
      className={className}
    >
      <ModalHeader data-testid="header">
        <ResponsiveTitle>{title}</ResponsiveTitle>
        {onCloseIconClick && (
          <StyledCloseIcon
            data-testid="close-icon"
            onClick={onCloseIconClick}
          />
        )}
      </ModalHeader>
      <ModalBody data-testid="body" scrollable={scrollable}>
        {children}
      </ModalBody>
      <ModalFooter data-testid="footer">
        {secondaryAction && (
          <ModalActionButton
            secondary
            data-testid="secondary-button"
            onClick={secondaryAction.onClick}
            disabled={secondaryAction.disabled}
          >
            {secondaryAction.label}
          </ModalActionButton>
        )}
        {primaryAction && (
          <ModalActionButton
            data-testid="primary-button"
            onClick={handlePrimaryActionClick}
            disabled={primaryAction.disabled}
          >
            {primaryAction.label}
          </ModalActionButton>
        )}
      </ModalFooter>
    </Container>
  );
};
