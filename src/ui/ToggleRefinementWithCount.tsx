import React from "react";
import { connectToggleRefinement } from "react-instantsearch-dom";

// improved version of https://www.algolia.com/doc/api-reference/widgets/toggle-refinement/react/#html-output with the same classes
// I copied the code base from https://github.com/algolia/react-instantsearch/blob/master/packages/react-instantsearch-dom/src/components/ToggleRefinement.js

interface Props {
  currentRefinement: boolean;
  count: {
    checked: boolean | null | undefined;
    unchecked: boolean | null | undefined;
  };
  refine: (refinement: boolean) => void;
  label: string;
}

const Component = ({ currentRefinement, count, refine, label }: Props) => (
  <div className="ais-ToggleRefinement">
    <label className="ais-ToggleRefinement-label">
      <input
        className="ais-ToggleRefinement-checkbox"
        type="checkbox"
        checked={currentRefinement}
        onChange={event => {
          refine(event.target.checked);
        }}
      />
      <span className="ais-ToggleRefinement-labelText">{label}</span>
      {count.unchecked !== null && count.unchecked !== undefined && (
        <span className="ais-ToggleRefinement-count">{count.unchecked}</span>
      )}
    </label>
  </div>
);

export const ToggleRefinementWithCount = connectToggleRefinement(Component);
