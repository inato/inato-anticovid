import * as functions from "firebase-functions";
import algoliasearch from "algoliasearch";

import { setupPostgresClient, PostgresTrialRepository } from "./infrastructure";
import { AlgoliaIndexingService } from "./infrastructure/algolia/AlgoliaIndexingService";
import { IndexingService } from "./application";
import { TrialRepository } from "./domain";
import { refreshTrialIndex } from "./refreshTrialIndex";

const ALGOLIA_CLIENT_ID = "QC98I887KP";
const ALGOLIA_API_KEY = functions.config().algolia.apikey;
const ALGOLIA_INDEX_NAME = functions.config().algolia.index;

const setupAlgoliaIndex = () => {
  console.log(
    "setup Algolia index",
    ALGOLIA_INDEX_NAME,
    ALGOLIA_CLIENT_ID,
    ALGOLIA_API_KEY
  );
  const client = algoliasearch(ALGOLIA_CLIENT_ID, ALGOLIA_API_KEY);
  const index = client.initIndex(ALGOLIA_INDEX_NAME);

  return index;
};

export const uploadToAlgolia = functions
  .runWith({
    timeoutSeconds: 500,
    memory: "1GB"
  })
  .https.onRequest(async (request, response) => {
    const client = await setupPostgresClient();
    const tableName = functions.config().pg.tablename;
    const trialRepository = new PostgresTrialRepository(client, tableName);

    const algoliaIndex = setupAlgoliaIndex();
    const indexingService = new AlgoliaIndexingService(algoliaIndex);

    const trialsCount = await refreshTrialIndex({
      indexingService,
      trialRepository
    });
    console.log("Replaced all objects");
    await client.end();
    response.send(`Indexed ${trialsCount} trials`);
  });
