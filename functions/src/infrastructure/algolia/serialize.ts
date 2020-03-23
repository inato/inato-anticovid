import { Trial } from "../../domain";

export const serialize = (trial: Trial): Object => {
  return {
    ...trial.rest,
    objectID: trial.trialid,
    public_title: trial.public_title,
    intervention: trial.intervention,
    web_address: trial.web_address,
    recruitment_status: trial.recruitment_status,
    therapeutic_classes: trial.therapeutic_classes,
    date_registration3: trial.date_registration3,
    exclusion_criteria: (trial.rest.exclusion_criteria ?? "").slice(0, 500),
    inclusion_criteria: (trial.rest.inclusion_criteria ?? "").slice(0, 500)
  };
};
