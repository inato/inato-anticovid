import * as functions from "firebase-functions";

import { setupPostgresClient, PostgresTrialRepository } from "./infrastructure";
import { AlgoliaIndexingService } from "./infrastructure/algolia/AlgoliaIndexingService";
import { refreshTrialIndex } from "./refreshTrialIndex";
import { setupAlgoliaIndex } from "./infrastructure/algolia/setupAlgoliaIndex";

export const uploadToAlgolia = functions
  .runWith({
    timeoutSeconds: 500,
    memory: "1GB"
  })
  .https.onRequest(async (request, response) => {
    const client = await setupPostgresClient();
    const tableName = functions.config().pg.tablename;
    const trialRepository = new PostgresTrialRepository(client, tableName);

    const algoliaIndex = setupAlgoliaIndex({
      apiKey: functions.config().algolia.apikey,
      indexName: functions.config().algolia.index
    });
    const indexingService = new AlgoliaIndexingService(algoliaIndex);

    const trialsCount = await refreshTrialIndex({
      indexingService,
      trialRepository
    });
    console.log("Replaced all objects");
    await client.end();
    response.send(`Indexed ${trialsCount} trials`);
  });

