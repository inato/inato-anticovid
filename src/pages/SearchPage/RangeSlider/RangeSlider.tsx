/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from 'react';
import { connectRange } from 'react-instantsearch-dom';
import styled from 'styled-components';
import Rheostat, { PublicState } from 'rheostat';
import { format } from 'date-fns';

import { colors } from '../../../ui';

interface Refinement {
  min: number;
  max: number;
}

interface Props {
  currentRefinement: Refinement;
  min?: number;
  max?: number;
  refine: (refinement: Refinement) => void;
  canRefine: boolean;
}

export const RangeSlider = connectRange(
  ({ currentRefinement, min, max, refine }: Props) => {
    const [rheostatState, setRheostatState] = useState<PublicState>();

    useEffect(() => {
      setRheostatState({
        min: min ?? currentRefinement.min,
        max: max ?? currentRefinement.max,
        values: [currentRefinement.min, currentRefinement.max],
      });
    }, [setRheostatState, currentRefinement, min, max]);

    const onChange = useCallback(
      ({ values: [min, max] }: PublicState) => {
        if (min && max) {
          refine({ min, max });
        }
      },
      [refine],
    );

    const onValuesUpdated = useCallback(
      (state: PublicState) => setRheostatState(state),
      [],
    );

    return (
      <StyledRheostat
        min={rheostatState?.min}
        max={rheostatState?.max}
        values={rheostatState?.values}
        onChange={onChange}
        onValuesUpdated={onValuesUpdated}
      >
        <div className="rheostat-values">
          <div>{formatDate(rheostatState?.values[0])}</div>
          <div>{formatDate(rheostatState?.values[1])}</div>
        </div>
      </StyledRheostat>
    );
  },
);

const StyledRheostat = styled(Rheostat)`
  margin: 0 4px;
  height: 24px;
  position: relative;
  overflow: visible;

  .rheostat-background {
    background: ${colors.Separator};
    border-radius: 2px;
    height: 4px;
    position: relative;
    top: 10px;
    width: 100%;
  }

  .rheostat-values {
    display: flex;
    margin-top: 14px;
    font-size: 12px;
    justify-content: space-between;
    color: ${colors.SecondaryText};
  }

  .rheostat-progress {
    background-color: ${colors.Primary};
    height: 4px;
    position: absolute;
    top: 10px;
  }

  .rheostat-handle {
    border: 1px solid ${colors.Primary};
    background: ${colors.SecondaryBackground};
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    box-shadow: 0 2px 4px ${colors.BoxShadow};
    height: 16px;
    margin-left: -8px;
    position: absolute;
    z-index: 2;
    width: 16px;
    font-size: 0;
  }

  .rheostat-handle::before {
    content: '';
    display: block;
    position: absolute;
    top: -10px;
    left: -10px;
    width: 32px;
    height: 32px;
    cursor: grab;
  }

  .rheostat-handle:active::before {
    cursor: grabbing;
  }

  .rheostat-handle:hover {
    box-shadow: 0px 0px 4px ${colors.PurpleBoxShadow};
  }

  .rheostat-handle:active {
    box-shadow: none;
  }
`;

const formatDate = (timestamp?: number) =>
  timestamp ? format(new Date(timestamp), 'MMM d, uu') : '';
