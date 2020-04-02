import { IndexingService } from "../services";
import { Facets } from "../../domain/trial";

export const setIndexSettings = ({
  indexingService
}: {
  indexingService: IndexingService;
}) =>
  indexingService.setSettings({
    searchableAttributes: [
      "scientific_title",
      "public_title",
      "acronym",
      "unordered(therapeutic_classes)",
      "intervention",
      "trialid"
    ],
    attributesForFaceting: [
      Facets.clinicalOutcomeExtracted,
      Facets.countries,
      Facets.recruitmentStatus,
      Facets.registrationTimestamp,
      Facets.studyType,
      Facets.surrogateOutcomeExtracted,
      Facets.hasResultsPublications,
      `searchable(${Facets.therapeuticClasses})`
    ],
    customRanking: ["desc(registration_timestamp)", "desc(results_publications_count)"]
  });
