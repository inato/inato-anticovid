import React from 'react';
import styled from 'styled-components';
import { Highlight } from 'react-instantsearch-dom';

import { colors } from '../../ui';

import { StyledNavigationOutIcon } from './ClinicalTrialHit';

export const Acronym = styled.span`
  color: ${colors.GreySecondaryText};
  white-space: nowrap;
`;

export const ClinicalTrialPublicTitle = ({ hit }: { hit: any }) => (
  <>
    <Highlight attribute="public_title" hit={hit} />{' '}
    <Acronym>
      {hit.acronym && <Highlight attribute="acronym" hit={hit} />}
      <StyledNavigationOutIcon />
    </Acronym>
  </>
);
