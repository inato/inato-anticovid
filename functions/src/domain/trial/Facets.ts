export enum Facets {
  recruitmentStatus = "recruitment_status",
  therapeuticClasses = "therapeutic_classes",
  clinicalOutcomeExtracted = "clinical_outcome_extracted_",
  surrogateOutcomeExtracted = "surrogate_outcome_extracted_",
  studyType = "study_type",
  countries = "countries",
  registrationTimestamp = "registration_timestamp",
  hasResultsPublications = "has_results_publications"
}

export interface FacetFilters {
  recruitmentStatus: Array<string> | undefined;
  therapeuticClasses: Array<string> | undefined;
  clinicalOutcomesExtracted: Array<string> | undefined;
  surrogateOutcomesExtracted: Array<string> | undefined;
  studyTypes: Array<string> | undefined;
  countries: Array<string> | undefined;
  hasResultsPublications: boolean | undefined;
}

export const facetFiltersFactory = ({
  recruitmentStatus = [],
  therapeuticClasses = [],
  clinicalOutcomesExtracted = [],
  surrogateOutcomesExtracted = [],
  studyTypes = [],
  countries = [],
  hasResultsPublications = undefined
}: Partial<FacetFilters> = {}) => ({
  recruitmentStatus,
  therapeuticClasses,
  clinicalOutcomesExtracted,
  surrogateOutcomesExtracted,
  studyTypes,
  countries,
  hasResultsPublications
});
