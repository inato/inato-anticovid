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
  hasResultsPublications: boolean | null;
}

export const facetFiltersFactory = ({
  recruitmentStatus = [],
  therapeuticClasses = [],
  clinicalOutcomesExtracted = [],
  surrogateOutcomesExtracted = [],
  studyTypes = [],
  countries = [],
  hasResultsPublications = null
}: Partial<FacetFilters> = {}) => ({
  recruitmentStatus,
  therapeuticClasses,
  clinicalOutcomesExtracted,
  surrogateOutcomesExtracted,
  studyTypes,
  countries,
  hasResultsPublications
});

export const orderedFacets: ReadonlyArray<{
  name: Facets;
  searchable?: boolean;
}> = [
    { name: Facets.clinicalOutcomeExtracted },
    { name: Facets.countries, searchable: true },
    { name: Facets.recruitmentStatus },
    { name: Facets.registrationTimestamp },
    { name: Facets.studyType },
    { name: Facets.surrogateOutcomeExtracted },
    { name: Facets.hasResultsPublications },
    { name: Facets.therapeuticClasses, searchable: true }
  ];

export const orderedSearchableAttributes: ReadonlyArray<{
  name: string;
  unordered?: boolean;
}> = [
    { name: "scientific_title" },
    { name: "public_title" },
    { name: "acronym" },
    { name: "therapeutic_classes", unordered: true },
    { name: "intervention" },
    { name: "trialid" }
  ];

export const orderedCustomRanking: ReadonlyArray<{
  name: string;
  orderBy: "asc" | "desc";
}> = [
    { name: "registration_timestamp", orderBy: "desc" },
    { name: "results_publications_count", orderBy: "desc" }
  ];
