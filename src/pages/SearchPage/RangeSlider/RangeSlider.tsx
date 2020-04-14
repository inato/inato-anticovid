/* eslint-disable no-console */
import React, { useCallback, useMemo } from 'react';
import { connectRange } from 'react-instantsearch-dom';
import styled from 'styled-components';
import Rheostat, { PublicState } from 'rheostat';

import { colors } from '../../../ui';

interface Refinement {
  min: number;
  max: number;
}

interface Props {
  currentRefinement: Refinement;
  min?: number;
  max?: number;
  maxAllowedValue?: number;
  refine: (refinement: Refinement) => void;
  formatValueForDisplay: (value?: number, maxValue?: number) => string;
  canRefine: boolean;
}

const formatNumberValueForDisplay = (value?: number, maxValue?: number) => {
  if (value && maxValue && value >= maxValue) {
    return `+${maxValue.toString()}`;
  }
  return value?.toString() ?? '';
};

export const RangeSlider = connectRange(
  ({
    currentRefinement,
    min = 0,
    max = 0,
    refine,
    formatValueForDisplay = formatNumberValueForDisplay,
    maxAllowedValue,
  }: Props) => {
    const realMax = useMemo(
      () =>
        maxAllowedValue && max && max > maxAllowedValue ? maxAllowedValue : max,
      [max, maxAllowedValue],
    );

    const onValuesUpdated = useCallback(
      ({ values: [valueMin, valueMax] }: PublicState) => {
        const computedMax = valueMax === maxAllowedValue ? max : valueMax;

        if (areMinAndMaxOkForRefinement({ min, max: computedMax })) {
          refine({ min: valueMin, max: computedMax });
        }
      },
      [max, maxAllowedValue, min, refine],
    );

    const values = useMemo(
      () => [currentRefinement.min, currentRefinement.max],
      [currentRefinement.max, currentRefinement.min],
    );

    return (
      <StyledRheostat
        min={min}
        max={realMax}
        values={values}
        onValuesUpdated={onValuesUpdated}
      >
        <div className="rheostat-values">
          <div>{formatValueForDisplay(values[0])}</div>
          <div>{formatValueForDisplay(values[1], maxAllowedValue)}</div>
        </div>
      </StyledRheostat>
    );
  },
);

const areMinAndMaxOkForRefinement = ({
  min,
  max,
}: {
  min?: number;
  max?: number;
}) =>
  min !== undefined &&
  !window.isNaN(min) &&
  max !== undefined &&
  !window.isNaN(max);

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
