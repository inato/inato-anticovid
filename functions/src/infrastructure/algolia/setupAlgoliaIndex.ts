import algoliasearch from "algoliasearch";

const ALGOLIA_CLIENT_ID = "QC98I887KP";

export const setupAlgoliaIndex = ({
  indexName,
  apiKey
}: {
  indexName: string;
  apiKey: string;
}) => {
  console.log("setup Algolia index", indexName, ALGOLIA_CLIENT_ID, apiKey);
  const client = algoliasearch(ALGOLIA_CLIENT_ID, apiKey);
  const index = client.initIndex(indexName);

  return index;
};
