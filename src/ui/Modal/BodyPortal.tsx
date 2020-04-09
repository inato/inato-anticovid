import React from 'react';
import { createPortal } from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import { useModal } from '../../hooks';

interface BodyPortalProps {
  children: React.ReactNode;
}

const BodyOverflowLocker = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

export const BodyPortal = ({ children }: BodyPortalProps): JSX.Element => {
  const rootElement = useModal();
  return createPortal(
    <>
      <BodyOverflowLocker />
      {children}
    </>,
    rootElement,
  );
};
