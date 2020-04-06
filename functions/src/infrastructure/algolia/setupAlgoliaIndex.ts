import algoliasearch from "algoliasearch";

export const setupAlgoliaIndex = ({
  indexName,
  apiKey,
  clientId
}: {
  indexName: string;
  apiKey: string;
  clientId: string;
}) => {
  console.log("setup Algolia index", indexName, clientId, apiKey);
  const client = algoliasearch(clientId, apiKey);
  const index = client.initIndex(indexName);

  return index;
};
