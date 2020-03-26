import { Trial } from "../../domain";

export const serialize = (trial: Trial): Object => {
  return {
    ...trial.rest,
    objectID: trial.trialId,
    public_title: trial.publicTitle,
    web_address: trial.webAddress,
    recruitment_status: trial.recruitmentStatus,
    therapeutic_classes: trial.therapeuticClasses,
    date_registration3: trial.registrationDate,
    exclusion_criteria: (trial.rest.exclusion_criteria ?? "").slice(0, 500),
    inclusion_criteria: (trial.rest.inclusion_criteria ?? "").slice(0, 500)
  };
};
