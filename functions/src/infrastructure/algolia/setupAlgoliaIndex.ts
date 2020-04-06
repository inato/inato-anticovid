import algoliasearch from "algoliasearch";
import { LoggingService } from "../../application";

export const setupAlgoliaIndex = ({
  indexName,
  apiKey,
  clientId,
  loggingService
}: {
  indexName: string;
  apiKey: string;
  clientId: string;
  loggingService: LoggingService;
}) => {
  loggingService.log("setup Algolia index", indexName, clientId, apiKey);
  const client = algoliasearch(clientId, apiKey);
  const index = client.initIndex(indexName);

  return index;
};
