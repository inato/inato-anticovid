import algoliasearch from "algoliasearch";
import { ALGOLIA_CLIENT_ID } from "./AlgoliaIndexingService";

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
