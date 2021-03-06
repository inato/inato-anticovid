import React, { useEffect, useCallback } from 'react';

import { styled, css } from '../styled';
import { colors } from '../colors';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  z-index: ${props => props.theme.zIndexes.modal};
  overflow-y: scroll;

  background-color: ${colors.ModalOverlay};
`;

const scrollableMixin = css`
  height: 100vh;
  width: 100vw;
`;

const ModalOuterWrapper = styled.div<{ scrollable?: boolean }>`
  position: relative;
  ${props => props.scrollable && scrollableMixin}
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const ModalInnerWrapper = styled.div<{ scrollable?: boolean }>`
  position: relative;
  ${props => props.scrollable && scrollableMixin}
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: ${props => props.theme.spacings.xxxxl}px;
`;

interface ModalProps {
  onEscKeyDown?: () => void;
  children?: React.ReactNode;
  className?: string;
  scrollable?: boolean;
}

const EscKeyCode = 27;

export const Backdrop = ({
  onEscKeyDown,
  children,
  className,
  scrollable,
}: ModalProps) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (onEscKeyDown && event.keyCode === EscKeyCode) {
        onEscKeyDown();
      }
    },
    [onEscKeyDown],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [handleKeyDown, onEscKeyDown]);

  return (
    <Container role="dialog" aria-modal className={className}>
      <ModalOuterWrapper scrollable={scrollable}>
        <ModalInnerWrapper scrollable={scrollable}>
          {children}
        </ModalInnerWrapper>
      </ModalOuterWrapper>
    </Container>
  );
};
