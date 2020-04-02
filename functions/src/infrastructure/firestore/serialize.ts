import * as Option from "fp-ts/lib/Option";
import { Subscription, FacetFilters } from "../../domain";

const serializeSearch = ({
  searchQuery,
  facetFilters
}: {
  searchQuery: Option.Option<string>;
  facetFilters: FacetFilters;
}) => ({
  search_query: Option.getOrElse<string>(() => "")(searchQuery),
  recruitment_status: facetFilters.recruitmentStatus,
  therapeutic_classes: facetFilters.therapeuticClasses,
  clinical_outcomes_extracted: facetFilters.clinicalOutcomesExtracted,
  surrogate_outcomes_extracted: facetFilters.surrogateOutcomesExtracted,
  study_types: facetFilters.studyTypes,
  countries: facetFilters.countries,
  has_results_publications: facetFilters.hasResultsPublications
});

export const serialize = (subscription: Subscription) => ({
  email: subscription.email.toString(),
  last_email_sent_date: subscription.lastEmailSentDate,
  search_results: subscription.searchResults.map(trialId => trialId.toString()),
  search: serializeSearch(subscription.search)
});
