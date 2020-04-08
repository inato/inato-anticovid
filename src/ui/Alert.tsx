import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { useBoolean } from '../hooks';

import { colors } from './colors';
import { TextButton } from './Button';
import { fontSize, lineHeight } from './texts';
import { CheckmarkIcon } from './icons';
import { styled } from './styled';

const getCheckmarkIcon = () => {
  return `"data:image/svg+xml,${encodeURIComponent(
    renderToStaticMarkup(<CheckmarkIcon />),
  )}"`;
};

const Container = styled.div`
  background-color: white;
  border: 1px solid ${colors.Border};
  border-left: 2px solid ${colors.GreenAlert};
  color: ${colors.GreenAlert};
  font-size: ${fontSize.Default};
  line-height: ${lineHeight.Default};
  padding: 8px;
  padding-left: 42px;
  background-image: url(${getCheckmarkIcon()});
  background-position: 15px center;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  border-radius: 4px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  children: React.ReactNode;
  closable: boolean;
  className?: string;
}

export const SuccessAlert = ({ children, closable, className }: Props) => {
  const { isTrue: isClosed, setToTrue: setClosed } = useBoolean(false);

  if (isClosed) {
    return null;
  }
  return (
    <Container className={className}>
      <div>{children}</div>
      {closable && <TextButton onClick={setClosed}>Close</TextButton>}
    </Container>
  );
};
