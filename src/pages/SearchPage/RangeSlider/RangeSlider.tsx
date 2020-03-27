import React, { useCallback, useState, useEffect } from "react";
import { connectRange } from "react-instantsearch-dom";
import { Range } from "rc-slider";

import { colors } from "../../../ui";

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

const computeValue = (currentRefinement: Refinement) =>
  currentRefinement.min && currentRefinement.max
    ? [currentRefinement.min, currentRefinement.max]
    : undefined;

export const RangeSlider = connectRange(
  ({ currentRefinement, min, max, refine }: Props) => {
    const [value, setValue] = useState(computeValue(currentRefinement));

    useEffect(() => {
      setValue(computeValue(currentRefinement));
    }, [setValue, currentRefinement]);

    const handlAfterChange = useCallback(
      ([min, max]: Array<number>) => {
        refine({ min, max });
      },
      [refine]
    );

    const handlChange = useCallback(
      ([min, max]: Array<number>) => {
        setValue([min, max]);
      },
      [setValue]
    );

    return (
      <Range
        min={min}
        max={max}
        value={value}
        onAfterChange={handlAfterChange}
        onChange={handlChange}
        trackStyle={[{ backgroundColor: colors.Primary }]}
        handleStyle={[
          { borderColor: colors.Primary, boxShadow: "none" },
          { borderColor: colors.Primary, boxShadow: "none" }
        ]}
      />
    );
  }
);
