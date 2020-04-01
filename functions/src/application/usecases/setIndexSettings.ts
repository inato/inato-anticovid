import { IndexingService } from "../services";

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
      "clinical_outcome_extracted_",
      "countries",
      "recruitment_status",
      "registration_timestamp",
      "study_type",
      "surrogate_outcome_extracted_",
      "has_results_publications",
      "searchable(therapeutic_classes)"
    ],
    customRanking: ["desc(registration_timestamp)"]
  });
