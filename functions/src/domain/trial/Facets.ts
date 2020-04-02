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
  recruitmentStatus: Array<string>;
  therapeuticClasses: Array<string>;
  clinicalOutcomesExtracted: Array<string>;
  surrogateOutcomesExtracted: Array<string>;
  studyTypes: Array<string>;
  countries: Array<string>;
  hasResultsPublications: boolean;
}

export const facetFiltersFactory = ({
  recruitmentStatus = [],
  therapeuticClasses = [],
  clinicalOutcomesExtracted = [],
  surrogateOutcomesExtracted = [],
  studyTypes = [],
  countries = [],
  hasResultsPublications = false
}: Partial<FacetFilters> = {}) => ({
  recruitmentStatus,
  therapeuticClasses,
  clinicalOutcomesExtracted,
  surrogateOutcomesExtracted,
  studyTypes,
  countries,
  hasResultsPublications
});
