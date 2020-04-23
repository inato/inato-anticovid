import { Trial } from '../../domain';

export const serialize = (trial: Trial): Record<string, any> => {
  return {
    ...trial.rest,
    objectID: trial.trialId.toString(),
    public_title: trial.publicTitle,
    web_address: trial.webAddress,
    recruitment_status: trial.recruitmentStatus,
    therapeutic_classes: trial.therapeuticClasses,
    date_registration3: trial.registrationDate,
    registration_timestamp: trial.registrationDate.getTime(),
    exclusion_criteria: (trial.exclusionCriteria ?? '').slice(0, 500),
    inclusion_criteria: (trial.inclusionCriteria ?? '').slice(0, 500),
    intervention: (trial.intervention ?? '').slice(0, 500),
    primary_outcome: (trial.primaryOutcome ?? '').slice(0, 500),
    has_results_publications: trial.hasResultsPublications,
    acronym: trial.acronym,
    countries: trial.countries,
    total_recruitment_size: trial.totalRecruitmentSize,
    clinical_outcome_extracted_: trial.clinicalOutcomes,
    surrogate_outcome_extracted_: trial.surrogateOutcomes,
    results_publications: trial.resultsPublications,
    study_type: trial.studyType,
  };
};
