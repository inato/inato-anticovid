import * as functions from "firebase-functions";

import {
  setAlgoliaSettingsHandler,
  uploadToAlgoliaHandler
} from "./presentation";
import {
  AlgoliaIndexingService,
  setupAlgoliaIndex,
  PostgresTrialRepository,
  setupPostgresClient
} from "./infrastructure";
import { IndexingService } from "./application";
import { TrialRepository } from "./domain";

interface Services {
  indexingService: IndexingService;
  trialRepository: TrialRepository;
}

const feedServices = (callback: (services: Services) => any) => async (
  ...args: any
) => {
  const algoliaIndex = setupAlgoliaIndex({
    apiKey: functions.config().algolia.apikey,
    indexName: functions.config().algolia.index
  });

  const indexingService = new AlgoliaIndexingService(algoliaIndex);

  const client = await setupPostgresClient();
  const tableName = functions.config().pg.tablename;
  const trialRepository = new PostgresTrialRepository(client, tableName);

  return callback({ indexingService, trialRepository })(args);
};

export const uploadToAlgolia = functions
  .runWith({
    timeoutSeconds: 500,
    memory: "1GB"
  })
  .https.onRequest(feedServices(uploadToAlgoliaHandler));

export const setAlgoliaSettings = functions.https.onRequest(
  feedServices(setAlgoliaSettingsHandler)
);
