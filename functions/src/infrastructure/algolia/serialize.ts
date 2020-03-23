import { Trial } from "../../domain";

export const serialize = (trial: Trial): Object => {
  return {
    objectID: trial.trialid,
    ...trial.rest,
    exclusion_criteria: (trial.rest.exclusion_criteria ?? "").slice(0, 500),
    inclusion_criteria: (trial.rest.inclusion_criteria ?? "").slice(0, 500)
  };
};
