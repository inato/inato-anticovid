import * as functions from "firebase-functions";

import {
  setupPostgresClient,
  PostgresTrialRepository,
  AlgoliaIndexingService,
  setupAlgoliaIndex
} from "./infrastructure";
import { refreshTrialIndex, setIndexSettings } from "./application";

export const uploadToAlgolia = functions
  .runWith({
    timeoutSeconds: 500,
    memory: "1GB"
  })
  .https.onRequest(async (_request, response) => {
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
    await client.end();
    response.send(`Indexed ${trialsCount} trials`);
  });

export const setAlgoliaSettings = functions.https.onRequest(
  async (_request, response) => {
    const algoliaIndex = setupAlgoliaIndex({
      apiKey: functions.config().algolia.apikey,
      indexName: functions.config().algolia.index
    });
    const indexingService = new AlgoliaIndexingService(algoliaIndex);

    await setIndexSettings({ indexingService });

    response.send(`Algolia settings have been set`);
  }
);
