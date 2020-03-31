/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from "react";
import { connectRange } from "react-instantsearch-dom";
import styled from "styled-components";
import Rheostat, { PublicState } from "rheostat";

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

const RangeContainer = styled.div`
  margin-top: 35px;

  .rc-slider-tooltip {
    background-color: none;
  }
`;

export const RangeSlider = connectRange(
  ({ currentRefinement, min, max, refine }: Props) => {
    const [rheostatState, setRheostatState] = useState<PublicState>();

    useEffect(() => {
      setRheostatState({
        min: min ?? currentRefinement.min,
        max: max ?? currentRefinement.max,
        values: [currentRefinement.min, currentRefinement.max]
      });
    }, [setRheostatState, currentRefinement, min, max]);

    const onChange = useCallback(
      ({ values: [min, max] }: PublicState) => {
        if (min && max) {
          refine({ min, max });
        }
      },
      [refine]
    );

    const onValuesUpdated = useCallback(
      (state: PublicState) => setRheostatState(state),
      []
    );

    return (
      <RangeContainer>
        <Rheostat
          min={rheostatState?.min}
          max={rheostatState?.max}
          values={rheostatState?.values}
          onChange={onChange}
          onValuesUpdated={onValuesUpdated}
        />
      </RangeContainer>
    );
  }
);
