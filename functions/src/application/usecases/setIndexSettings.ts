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
      "searchable(therapeutic_classes)"
    ]
  });
