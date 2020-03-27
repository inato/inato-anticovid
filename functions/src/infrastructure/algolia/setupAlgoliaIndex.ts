import algoliasearch from "algoliasearch";

const ALGOLIA_CLIENT_ID = "QC98I887KP";

export const setupAlgoliaIndex = async ({
  indexName,
  apiKey
}: {
  indexName: string;
  apiKey: string;
}) => {
  console.log("setup Algolia index", indexName, ALGOLIA_CLIENT_ID, apiKey);
  const client = algoliasearch(ALGOLIA_CLIENT_ID, apiKey);
  const index = client.initIndex(indexName);

  await index.setSettings({
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
      "study_type",
      "surrogate_outcome_extracted_",
      "searchable(therapeutic_classes)"
    ]
  });

  return index;
};
