import { Trial } from "../../domain";

export const serialize = (trial: Trial): Object => {
  return {
    objectID: trial.trialid,
    ...trial.rest,
    countries: (trial.rest.countries ?? "").split(";"),
    therapeutic_classes: (trial.rest.therapeutic_classes ?? "").split(";"),
    surrogate_outcome_extracted_: (
      trial.rest.surrogate_outcome_extracted_ ?? ""
    ).split(";"),
    clinical_outcome_extracted_: (
      trial.rest.clinical_outcome_extracted_ ?? ""
    ).split(";"),
    exclusion_criteria: (trial.rest.exclusion_criteria ?? "").slice(0, 500),
    inclusion_criteria: (trial.rest.inclusion_criteria ?? "").slice(0, 500)
  };
};
